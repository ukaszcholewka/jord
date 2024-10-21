import getPhotosBayDay from "@/api/get/GetPhotosByDay"
import { GetPhotoApiListResponse } from "@/api/JordApi"
import PhotosDay from "./day"

type PhotosDayProps = {
  day: GetPhotoApiListResponse[number]
}

async function PhotoData({ day: date }: PhotosDayProps) {
  const [year, month, day] = date.split('_')
  const photos = await getPhotosBayDay(date)

  return (
    <PhotosDay
      date={{
        year,
        month,
        day
      }}
      photos={photos}
    />
  )
}

export default PhotoData
