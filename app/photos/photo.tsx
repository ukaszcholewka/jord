'use client'

import jordApi, { PhotosByDayList } from "@/api/JordApi"
import Link from "next/link"
import { useCallback } from "react"
import { twMerge } from "tailwind-merge"

type PhotoProps = {
  photos: PhotosByDayList[]
  onSelect?: (name: string) => void
  selectable?: boolean
  isSelected?: boolean
  date: string
}

function Photo({
  photos,
  onSelect = () => { },
  selectable = false,
  isSelected = false,
  date
}: PhotoProps) {
  const webp = photos.find(({ ext }) => ext.toLocaleLowerCase() === 'webp')
  const jpg = photos.find(({ ext }) => ext.toLocaleLowerCase() === 'jpg')
  const jpeg = photos.find(({ ext }) => ext.toLocaleLowerCase() === 'jpeg')
  const png = photos.find(({ ext }) => ext.toLocaleLowerCase() === 'png')

  const image = webp || jpg || jpeg || png
  const name = image ? `${image.name}` : ''

  const onPhotoSelect = useCallback(() => {
    onSelect(name)
  }, [name, onSelect])

  return (
    <>
      {!selectable && (
        <Link href={`/photos/${date}/${name}`} className="aspect-square overflow-hidden flex justify-center items-center relative">
          {image && (
            <>
              <img
                src={jordApi.getImageUrl(image.date, `${name}.webp`, '256')}
                alt={name}
                height="256"
                width="256"
                className={twMerge(
                  `cursor-pointer transition-transform ease-in-out duration-100`,
                  isSelected && 'transform scale-50'
                )}
              />
              <div
                className="absolute top-0 left-0 w-full h-full -z-10 blur-xl"
                style={{ backgroundImage: `url(${jordApi.getImageUrl(image.date, `${name}.webp`, '256')})` }}
              />
            </>
          )}
        </Link>
      )}
      {selectable && (
        <div className="aspect-square overflow-hidden flex justify-center items-center relative">
          {image && (
            <>
              <img
                src={jordApi.getImageUrl(image.date, `${name}.webp`, '256')}
                alt={name}
                height="256"
                width="256"
                className={twMerge(
                  `cursor-pointer transition-transform ease-in-out duration-100`,
                  isSelected && 'transform scale-50'
                )}
                onClick={onPhotoSelect}
              />
              <div
                className="absolute top-0 left-0 w-full h-full -z-10 blur-xl"
                style={{ backgroundImage: `url(${jordApi.getImageUrl(image.date, `${name}.webp`, '256')})` }}
              />
            </>
          )}
        </div>
      )}
    </>
  )
}

export default Photo
