import jordApi, { GetPhotoApiListResponse } from "@/api/JordApi"
import Image from 'next/image'

type PhotosDayProps = {
  day: GetPhotoApiListResponse[number]
}

const getImageUrl = (date: string, name: string) =>
  `${jordApi.api.url}/photos/api/image/${date}/${name}`

async function PhotosDay({ day: date }: PhotosDayProps) {
  const [year, month, day] = date.split('_').map((item) => item.padStart(2, '0'))
  const response = await jordApi.getPhotosByDay(date)

  return (
    <div>
      <h2 className="text-4xl">
        {year}, {month}, {day}
      </h2>
      {response.map((image) => {
        const name = `${image.name}.${image.ext}`
        return (
          <Image
            src={getImageUrl(image.date, name)}
            alt={name}
            height="256"
            width="256"
            key={`${image.date}.${name}`}
            className="h-64 w-auto"
          />
        )
      })}
    </div>
  )
}

export default PhotosDay
