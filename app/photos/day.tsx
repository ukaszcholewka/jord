import jordApi, { GetPhotoApiListResponse } from "@/api/JordApi"
import Image from 'next/image'

type PhotosDayProps = {
  day: GetPhotoApiListResponse[number]
}

async function PhotosDay({ day: date }: PhotosDayProps) {
  const [year, month, day] = date.split('_').map((item) => item.padStart(2, '0'))
  const response = await jordApi.getPhotosByDay(date)
  // console.log(response)

  const image = response[0]!

  const test = await jordApi.getLocalImage(image.date, `${image.name}.${image.ext}`)

  return (
    <div>
      <h2 className="text-4xl">
        {year}, {month}, {day}
      </h2>
      <Image src={`http://localhost:3000/photos/api/image/${image.date}/${image.name}.${image.ext}`} alt={''} width={500} height={500} />
    </div>
  )
}

export default PhotosDay
