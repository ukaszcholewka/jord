import getPhotosBayDay from "@/api/get/GetPhotosByDay"
import { GetPhotoApiListResponse } from "@/api/JordApi"
import PhotosDay from "./day"

type PhotosDayProps = {
  day: GetPhotoApiListResponse[number]
}

async function PhotoData({ day: date }: PhotosDayProps) {
  const [year, month, day] = date.split('_').map((item) => item.padStart(2, '0'))
  const photos = await getPhotosBayDay(date)

  const title = `${year}, ${month}, ${day}`

  return (
    <PhotosDay photos={photos} title={title} />
  )
}

export default PhotoData
