'use client'

import jordApi, { PhotosByDayList } from "@/api/JordApi"
import Button from "@/atoms/Button"
import { useCallback, useState } from "react"
import { twMerge } from "tailwind-merge"

type PhotoProps = {
  photos: PhotosByDayList[]
  onSelect?: (name: string) => void
  selectable?: boolean
  isSelected?: boolean
}

const getImageUrl = (date: string, name: string, size?: '2048' | '256') =>
  `${jordApi.api.url}/photos/api/image/${date}/${name}${size ? `?size=${size}` : ''}`

function Photo({
  photos,
  onSelect = () => { },
  selectable = false,
  isSelected = false
}: PhotoProps) {
  const [show, setShow] = useState(false)

  const webp = photos.find(({ ext }) => ext.toLocaleLowerCase() === 'webp')
  const jpg = photos.find(({ ext }) => ext.toLocaleLowerCase() === 'jpg')
  const jpeg = photos.find(({ ext }) => ext.toLocaleLowerCase() === 'jpeg')
  const png = photos.find(({ ext }) => ext.toLocaleLowerCase() === 'png')

  const image = webp || jpg || jpeg || png
  const name = image ? `${image.name}` : ''

  const onPhotoClick = useCallback(() => setShow((show) => !show), [])
  const onPhotoClose = useCallback(() => setShow(false), [])

  const onPhotoSelect = useCallback(() => {
    onSelect(name)
  }, [name])

  const onDownloadImage = useCallback(async (ext: string) => {
    const name = `${photos[0].name}.${ext}`
    const image = await fetch(getImageUrl(photos[0].date, name))
    const blob = await image.blob()
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `${name}`
    link.click()
  }, [photos])

  const onRemove = useCallback(async (date: string, name: string) => {
    await fetch(`/photos/api/remove/${date}/${name}`)
    setShow(false)
  }, [])

  return (
    <div className="aspect-square overflow-hidden flex justify-center items-center relative">
      {image && (
        <>
          <img
            src={getImageUrl(image.date, `${name}.webp`, '256')}
            alt={name}
            height="256"
            width="256"
            className={twMerge(
              `cursor-pointer transition-transform ease-in-out duration-100`,
              isSelected && 'transform scale-50'
            )}
            onClick={!selectable ? onPhotoClick : onPhotoSelect}
          />
          <div
            className="absolute top-0 left-0 w-full h-full -z-10 blur-xl"
            style={{ backgroundImage: `url(${getImageUrl(image.date, `${name}.webp`, '256')})` }}
          />
        </>
      )}

      {show && (
        <div className="fixed top-0 left-0 w-full h-full bg-black z-10">
          <div className="flex justify-between px-4 py-2">
            <div className="flex gap-4 items-center">
              <div>{name}</div>
              {image && <Button onClick={() => onRemove(image.date, image.name)}>remove</Button>}
            </div>
            <Button onClick={onPhotoClose}>close</Button>
          </div>

          <div className="flex h-full gap-4 px-4 flex-col sm:flex-row overflow-auto pb-24 sm:pb-0">
            <div className="flex items-center justify-center min-w-[50%]">
              {image && (
                <img
                  src={getImageUrl(image.date, `${name}.webp`, '2048')}
                  alt={name}
                  className="max-h-full max-w-full"
                />
              )}
            </div>
            <div className="w-[30%] min-w-[200px]">
              <h2 className="text-4xl mb-2">Download</h2>
              <div>
                {photos.map(({ ext }) => (
                  <Button key={ext} onClick={() => onDownloadImage(ext)}>{ext}</Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Photo
