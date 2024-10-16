import { SIZE_256, SIZE_2K, THUMBNAIL } from '@/constants'
import { NextResponse } from 'next/server'

type Size = '2048' | '256' | undefined

const thumbnails = {
  '2048': `/${THUMBNAIL}/${SIZE_2K}`,
  '256': `/${THUMBNAIL}/${SIZE_256}`,
}

export async function GET(
  request: Request,
  { params }: { params: { date: string, name: string } }
) {

  const { searchParams } = new URL(request.url)
  const size = searchParams.get('size') as Size
  const sizePath = size ? thumbnails[size] : ''

  const image = Bun.file(`./storage/photos/${params.date}${sizePath}/${params.name}`)
  const arrayBuffer = await image.arrayBuffer()

  const blob = new Blob([arrayBuffer], {
    type: image.type,
  })

  const file = new File([blob], image.name!)

  try {
    return new NextResponse(file, {
      status: 200,
      statusText: 'OK',
      headers: {
        "Content-Type": image.type
      }
    })
  } catch {
    return new Response(null, {
      status: 404
    })
  }
}
