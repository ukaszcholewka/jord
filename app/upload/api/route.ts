import { NextRequest } from "next/server";
import fs from 'fs'

export async function POST(request: NextRequest) {
  const test = await request.formData()
  console.log({ test })

  const time = new Date()
  const dirName = `${time.getFullYear()}_${time.getMonth()}_${time.getDay()}`


  fs.mkdirSync(`./storage/${dirName}`)

  return Response.json({ status: 'ok' })
}
