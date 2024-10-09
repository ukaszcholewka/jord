import getPhotoApiList from "@/api/get/GetPhotoApiListResponse"
import PhotosDay from "./day"

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store';


async function Photos() {
  const list = await getPhotoApiList() || []

  return (
    <div>
      {list.map((day) => (
        <PhotosDay key={day} day={day} />
      ))}
    </div>
  )
}

export default Photos
