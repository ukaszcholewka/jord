import { NextResponse } from 'next/server'
import { readFile } from 'node:fs/promises'

export async function GET(
  _: Request,
  { params }: { params: { date: string, name: string } }
) {

  try {
    const file = await readFile(`./storage/photos/${params.date}/${params.name}`)
    return new NextResponse(file, {
      status: 200,
      statusText: 'OK',
      headers: {
        "Content-Type": "image/*"
      }
    })
  } catch {
    return new Response(null, {
      status: 404
    })
  }
}
