import { NextRequest } from "next/server";
import fs from 'fs'

export async function POST(request: NextRequest) {
  const data = await request.formData() as FormData

  const time = new Date()
  const dirName = `./storage/photos/${time.getFullYear()}_${time.getMonth()}_${time.getDay()}`

  if (!fs.existsSync('./storage/photos/'))
    fs.mkdirSync('./storage/photos/')

  if (!fs.existsSync(dirName))
    fs.mkdirSync(dirName)

  const file = data.get('files') as File

  if (!file) return Response.json({ status: 'missing image' })

  const buffer = await file.arrayBuffer()
  const view = new DataView(buffer)

  try {
    fs.writeFileSync(`${dirName}/${file.name}`, view)
  } catch (error) {
    return new Response(error as string, {
      status: 500
    })
  }

  return new Response(null, {
    status: 200
  })
}
