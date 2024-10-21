'use client'

import { PhotosByDayList } from "@/api/JordApi"
import Photo from "./photo"
import Button from "@/atoms/Button"
import { useCallback, useState } from "react"
import usePhotoList from "./photoList.store"

type PhotosDayProps = {
  photos: PhotosByDayList[][]
  title: string
}


function PhotosDay({ photos, title }: PhotosDayProps) {
  const [show, setShow] = useState(false)
  const [select, setSelect] = useState(false)
  const { list, toggle } = usePhotoList()

  const toggleList = useCallback(() => {
    setShow((show) => !show)
  }, [])

  const toggleSelect = useCallback(() => {
    setSelect((select) => !select)
  }, [])

  return (
    <div>
      <h2 className="text-4xl ml-2">
        <Button
          onClick={toggleList}
          isActive={show}
          className={'mb-2'}
        >
          {title}
        </Button>
        {show && <Button isActive={select} onClick={toggleSelect}>select</Button>}
      </h2>
      {show && (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 justify-center align-middle">
          {photos.map((images) => {
            const image = images[0]
            const key = `${image.name}.${image.ext}`

            return (
              <Photo
                selectable={show && select}
                photos={images}
                key={key}
                onSelect={toggle}
                isSelected={list.includes(image.name)}
              />
            )
          })}
        </div>
      )}
    </div >
  )
}

export default PhotosDay
