import { GetPhotoApiListResponse } from "@/api/JordApi"
import Photo from "./photo"
import getPhotosBayDay from "@/api/get/GetPhotosByDay"

type PhotosDayProps = {
  day: GetPhotoApiListResponse[number]
}


async function PhotosDay({ day: date }: PhotosDayProps) {
  const [year, month, day] = date.split('_').map((item) => item.padStart(2, '0'))
  const photos = await getPhotosBayDay(date)

  return (
    <div>
      <h2 className="text-4xl ml-2">
        {year}, {month}, {day}
      </h2>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 justify-center align-middle">
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
