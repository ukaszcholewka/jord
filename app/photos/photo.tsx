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

  const onPhotoClick = useCallback(() => {
    setShow((show) => !show)
  }, [])

  const onPhotoClose = useCallback(() => {
    setShow(false)
  }, [])

  return (
    <div>
      {image && (
        <Image
          src={getImageUrl(image.date, name)}
          alt={name}
          height="256"
          width="256"
          className="h-64 w-auto cursor-pointer"
          onClick={onPhotoClick}
        />
      )}

      {show && (
        <div className="fixed top-0 left-0 w-full h-full bg-black">
          <div className="flex justify-between px-4 py-2">
            <div>{name}</div>
            <Button onClick={onPhotoClose}>close</Button>
          </div>

          <div className="flex h-full gap-4">
            <div className="flex items-center justify-center">
              {image && (
                <Image
                  src={getImageUrl(image.date, name)}
                  alt={name}
                  height="2048"
                  width="2048"
                  className="h-auto w-full"
                  onClick={onPhotoClick}
                />
              )}
            </div>
            <div>
              <h2 className="text-4xl mb-2">Download</h2>
              <div>
                {photos.map(({ ext }) => (
                  <Button key={ext}>{ext}</Button>
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
