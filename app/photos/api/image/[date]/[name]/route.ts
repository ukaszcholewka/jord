import { NextResponse } from 'next/server'

export async function GET(
  _: Request,
  { params }: { params: { date: string, name: string } }
) {

  const image = Bun.file(`./storage/photos/${params.date}/${params.name}`)
  const arrayBuffer = await image.arrayBuffer()

  const blob = new Blob([arrayBuffer], {
    type: image.type,
  })

  const file = new File([blob], image.name!)

  try {
    // const file = await readFile(`./storage/photos/${params.date}/${params.name}`)


    // return new Response(file)
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
