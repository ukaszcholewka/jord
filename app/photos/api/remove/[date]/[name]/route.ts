import { PHOTOS, STORAGE } from '@/constants'
import { unlink } from 'node:fs/promises'

const PHOTO_DIR = `./${STORAGE}/${PHOTOS}`

export async function GET(
  _: Request,
  { params }: { params: { date: string, name: string } }
) {

  const dir = new Bun.Glob(`${PHOTO_DIR}/${params.date}/**/${params.name}.*`)

  for await (const file of dir.scan({
    dot: true
  })) {
    await unlink(file)
  }

  return Response.json({ status: 'ok' })
}
