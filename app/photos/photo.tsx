'use client'

import jordApi, { PhotosByDayList } from "@/api/JordApi"
import Button from "@/atoms/Button"
import Image from 'next/image'
import { useCallback, useState } from "react"

type PhotoProps = {
  photos: PhotosByDayList[]
}

const getImageUrl = (date: string, name: string) =>
  `${jordApi.api.url}/photos/api/image/${date}/${name}`

function Photo({ photos }: PhotoProps) {
  const [show, setShow] = useState(false)

  const webp = photos.find(({ ext }) => ext.toLocaleLowerCase() === 'webp')
  const jpg = photos.find(({ ext }) => ext.toLocaleLowerCase() === 'jpg')
  const jpeg = photos.find(({ ext }) => ext.toLocaleLowerCase() === 'jpeg')
  const png = photos.find(({ ext }) => ext.toLocaleLowerCase() === 'png')

  const image = webp || jpg || jpeg || png
  const name = image ? `${image.name}.${image.ext}` : ''

  const onPhotoClick = useCallback(() => setShow((show) => !show), [])
  const onPhotoClose = useCallback(() => setShow(false), [])

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

  return (
    <div className="aspect-square overflow-hidden">
      {image && (
        <Image
          src={getImageUrl(image.date, name)}
          alt={name}
          height="256"
          width="256"
          quality={90}
          className="h-auto w-auto cursor-pointer translate-y-[-50%] my-[50%]"
          onClick={onPhotoClick}
        />
      )}

      {show && (
        <div className="fixed top-0 left-0 w-full h-full bg-black z-10">
          <div className="flex justify-between px-4 py-2">
            <div>{name}</div>
            <Button onClick={onPhotoClose}>close</Button>
          </div>

          <div className="flex h-full gap-4 px-4 flex-col sm:flex-row overflow-auto pb-24 sm:pb-0">
            <div className="flex items-center justify-center min-w-[50%]">
              {image && (
                <Image
                  src={getImageUrl(image.date, name)}
                  alt={name}
                  height="2048"
                  quality={85}
                  width="2048"
                  className="h-auto w-full"
                />
              )}
            </div>
            <div>
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
