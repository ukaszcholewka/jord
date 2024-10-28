
import getPhotosBayDay from "@/api/get/GetPhotosByDay"
import { GetPhotoApiListResponse } from "@/api/JordApi"
import Photo from "./Photo"

type PhotosRouteProps = {
  params: {
    date: GetPhotoApiListResponse[number],
    name: string
  },
}

async function PhotoRoute({ params }: PhotosRouteProps) {
  const photos = await getPhotosBayDay(params.date)
  const flat = photos.flat()
  const current = flat.filter(({ name }) => name === params.name)

  const names = photos.map((item) => item[0].name)
  const index = names.findIndex((name) => name === params.name)

  const next = photos[index + 1] ? photos[index + 1][0].name : null
  const prev = photos[index - 1] ? photos[index - 1][0].name : null

  return (
    <Photo
      photos={current}
      params={params}
      next={next}
      prev={prev}
    />
  )
}

export default PhotoRoute
