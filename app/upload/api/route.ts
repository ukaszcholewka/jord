import { NextRequest } from "next/server";
import fs from 'fs'
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const data = await request.formData() as FormData

  const time = new Date()
  const date = `${time.getFullYear()}_${time.getMonth()}_${time.getDate()}`

  const dirName = `./storage/photos/${date}`

  if (!fs.existsSync('./storage/photos/'))
    fs.mkdirSync('./storage/photos/')

  if (!fs.existsSync(dirName))
    fs.mkdirSync(dirName)

  const file = data.get('files') as File

  if (!file) return Response.json({ status: 'missing image' })

  const buffer = await file.arrayBuffer()
  // const view = new DataView(buffer)

  try {
    // fs.writeFileSync(`${dirName}/${file.name}`, view)
    Bun.write(`${dirName}/${file.name}`, buffer)
  } catch {

    return new Response(JSON.stringify({ status: 'error' }), {
      status: 500
    })
  }

  revalidatePath('/photos', 'page')
  return new Response(JSON.stringify({ status: 'done', date }), {
    status: 200
  })
}
