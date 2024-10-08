import getPhotoApiList from "@/api/get/GetPhotoApiListResponse"
import PhotosDay from "./day"


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
