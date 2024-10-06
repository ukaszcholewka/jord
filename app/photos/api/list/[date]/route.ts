import { existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'

const PHOTOS = './storage/photos'

export async function GET(
  _: Request,
  { params }: { params: { date: string } }
) {
  const date = params.date
  const dir = `${PHOTOS}/${date}`

  if (!existsSync(dir))
    return new Response(`dir ${date} missing`, {
      status: 500
    })

  const files = await readdir(dir)

  const parsed = files.map((file) => ({
    ext: /(?=[^.]*$).*/.exec(file)?.[0],
    name: /^.*(?=\.)/.exec(file)?.[0],
    src: `${PHOTOS}/${date}/${file}`,
    date: date
  }))

  return Response.json(parsed)
}
