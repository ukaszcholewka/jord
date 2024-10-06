import jordApi, { GetPhotoApiListResponse } from "@/api/JordApi"
import Photo from "./photo"

type PhotosDayProps = {
  day: GetPhotoApiListResponse[number]
}

async function PhotosDay({ day: date }: PhotosDayProps) {
  const [year, month, day] = date.split('_').map((item) => item.padStart(2, '0'))
  const photos = await jordApi.getPhotosByDay(date)

  return (
    <div>
      <h2 className="text-4xl ml-2">
        {year}, {month}, {day}
      </h2>
      <div className="flex flex-wrap justify-center">
        {photos.map((images) => {
          const image = images[0]
          const key = `${image.name}.${image.ext}`

          return (
            <Photo photos={images} key={key} />
          )
        })}
      </div>
    </div>
  )
}

export default PhotosDay
