'use client'

import { PhotosByDayList } from "@/api/JordApi"
import Photo from "./photo"
import Button from "@/atoms/Button"
import { useCallback, useMemo, useState } from "react"
import usePhotoList from "./photoList.store"

type PhotosDayProps = {
  photos: PhotosByDayList[][]
  date: {
    year: string
    month: string
    day: string
  }
}


function PhotosDay({ photos, date }: PhotosDayProps) {
  const [show, setShow] = useState(false)
  const [select, setSelect] = useState(false)
  const { list, toggle } = usePhotoList()

  const { year, month, day } = date
  const title = `${year}, ${month}, ${day}`
  const dir = `${year}_${month}_${day}`

  const toggleList = useCallback(() => {
    setShow((show) => !show)
  }, [])

  const toggleSelect = useCallback(() => {
    setSelect((select) => !select)
  }, [])

  const isSelected = useMemo(() => !!list.length, [list])

  const onRemove = useCallback(async () => {
    await fetch(`/photos/api/remove/${dir}/all`, {
      method: 'POST',
      body: JSON.stringify(list)
    })
  }, [list])

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
        {show && isSelected && (
          <Button onClick={onRemove}>remove</Button>
        )}
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
