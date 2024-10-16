'use client'

import { PhotosByDayList } from "@/api/JordApi"
import Photo from "./photo"
import Button from "@/atoms/Button"
import { useCallback, useState } from "react"
import { twMerge } from "tailwind-merge"

type PhotosDayProps = {
  photos: PhotosByDayList[][]
  title: string
}

function PhotosDay({ photos, title }: PhotosDayProps) {
  const [show, setShow] = useState(false)

  const toggle = useCallback(() => {
    setShow((show) => !show)
  }, [])

  return (
    <div>
      <h2 className="text-4xl ml-2">
        <Button
          onClick={toggle}
          className={twMerge(
            'mb-2',
            show ? `bg-white text-black hover:bg-black hover:text-white` : ''
          )}
        >
          {title}
        </Button>
      </h2>
      {
        show && (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 justify-center align-middle">
            {photos.map((images) => {
              const image = images[0]
              const key = `${image.name}.${image.ext}`

              return (
                <Photo photos={images} key={key} />
              )
            })}
          </div>
        )
      }
    </div >
  )
}

export default PhotosDay
