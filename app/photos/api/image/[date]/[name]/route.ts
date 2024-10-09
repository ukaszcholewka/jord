import { NextResponse } from 'next/server'
import { readFile } from 'node:fs/promises'

export async function GET(
  _: Request,
  { params }: { params: { date: string, name: string } }
) {

  try {
    const file = await readFile(`./storage/photos/${params.date}/${params.name}`)
    return new NextResponse(file)
  } catch {
    return new Response(null, {
      status: 404
    })
  }
}
