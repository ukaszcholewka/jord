import { NextRequest } from "next/server";
import fs from 'fs'
import { revalidatePath } from "next/cache";
import { PHOTOS, SIZE_256, SIZE_2K, STORAGE, THUMBNAIL } from "@/constants";
import { agonizeAsync } from "@/utils";
import sharp from "sharp";


export async function POST(request: NextRequest) {
  const data = await request.formData() as FormData

  const time = new Date()
  const date = `${time.getFullYear()}_${time.getMonth()}_${time.getDate()}`

  const photos = `./${STORAGE}/${PHOTOS}/`
  const dirName = `./${STORAGE}/${PHOTOS}/${date}`
  const thumnail = `./${STORAGE}/${PHOTOS}/${date}/${THUMBNAIL}`
  const thumnail_2048 = `./${STORAGE}/${PHOTOS}/${date}/${THUMBNAIL}/${SIZE_2K}`
  const thumnail_256 = `./${STORAGE}/${PHOTOS}/${date}/${THUMBNAIL}/${SIZE_256}`

  if (!fs.existsSync(photos))
    fs.mkdirSync(photos)

  if (!fs.existsSync(dirName))
    fs.mkdirSync(dirName)

  if (!fs.existsSync(thumnail))
    fs.mkdirSync(thumnail)

  if (!fs.existsSync(thumnail_2048))
    fs.mkdirSync(thumnail_2048)

  if (!fs.existsSync(thumnail_256))
    fs.mkdirSync(thumnail_256)

  const file = data.get('files') as File

  if (!file) return Response.json({ status: 'missing image' })

  console.log(file)

  const buffer = await file.arrayBuffer()
  // const view = new DataView(buffer)
  //

  const [writeFileError] = await agonizeAsync(async () => {
    sharp(buffer).resize(2048).toFormat('webp', { quality: 90 }).toBuffer().then((buffer) => {
      Bun.write(`${thumnail_2048}/${file.name}`, buffer)
    })

    sharp(buffer).resize(256).toFormat('webp', { quality: 90 }).toBuffer().then((buffer) => {
      Bun.write(`${thumnail_256}/${file.name}`, buffer)
    })

    Bun.write(`${dirName}/${file.name}`, buffer)
  })

  if (writeFileError)
    return new Response(JSON.stringify({ status: 'error' }), {
      status: 500
    })

  revalidatePath('/photos', 'page')

  return new Response(JSON.stringify({ status: 'done', date }), {
    status: 200
  })
}
