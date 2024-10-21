import { APP_URL } from "@/api/JordApi"
import { PHOTOS, STORAGE } from "@/constants"
import { unlink } from "fs/promises"
import { revalidatePath } from "next/cache"

const PHOTO_DIR = `./${STORAGE}/${PHOTOS}`

export async function POST(
  request: Request,
  { params }: { params: { date: string } }
) {
  const images = await request.json() as string[] || []



  for await (const image of images) {
    await fetch(`${APP_URL}/photos/api/remove/${params.date}/${image}`)
  }

  // const imageList = `{${images.join(',')}}`

  // console.log(`${PHOTO_DIR}/${params.date}/**/${imageList}.*`)

  // const dir = new Bun.Glob(
  //   `${PHOTO_DIR}/${params.date}/**/${imageList}.*`
  // )

  // console.log('files:')

  // for await (const file of dir.scan({
  //   dot: true
  // })) {
  //   console.log(file)
  // }

  // for await (const file of dir.scan({
  //   dot: true
  // })) {
  //   await unlink(file)
  // }

  revalidatePath('/photos', 'page')
  return new Response(null, {
    status: 200
  })
}
