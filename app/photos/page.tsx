import jordApi from "@/api/JordApi"
import PhotosDay from "./day"

async function Photos() {
  const list = await jordApi.getPhotoList() || []

  return (
    <div>
      {list.map((day) => (
        <PhotosDay key={day} day={day} />
      ))}
    </div>
  )
}

export default Photos
