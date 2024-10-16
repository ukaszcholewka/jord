import getPhotoApiList from "@/api/get/GetPhotoApiListResponse"
import PhotoData from "./photoData"

export const dynamic = 'force-dynamic'

async function Photos() {
  const list = await getPhotoApiList() || []

  return (
    <div>
      {list.map((day) => (
        <PhotoData key={day} day={day} />
      ))}
    </div>
  )
}

export default Photos
