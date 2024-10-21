import { PHOTOS, STORAGE } from '@/constants'
import { revalidatePath } from 'next/cache'
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
    console.info(`Removed file: ${file}`)
    await unlink(file)
  }

  revalidatePath('/photos', 'page')
  return new Response(null, {
    status: 200
  })
}
