import jordApi, { PhotosByDayList } from "@/api/JordApi"
import Image from 'next/image'

type PhotoProps = {
  photos: PhotosByDayList[]
}

const getImageUrl = (date: string, name: string) =>
  `${jordApi.api.url}/photos/api/image/${date}/${name}`

function Photo({ photos }: PhotoProps) {
  const jpg = photos.find(({ ext }) => ext.toLocaleLowerCase() === 'jpg')
  const jpeg = photos.find(({ ext }) => ext.toLocaleLowerCase() === 'jpeg')
  const png = photos.find(({ ext }) => ext.toLocaleLowerCase() === 'png')

  const image = jpg || jpeg || png
  const name = image ? `${image.name}.${image.ext}` : ''

  return (
    <div>
      {image && (
        <Image
          src={getImageUrl(image.date, name)}
          alt={name}
          height="256"
          width="256"
          className="h-64 w-auto"
        />
      )}
    </div>
  )
}

export default Photo
