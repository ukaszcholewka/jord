import { PHOTOS, STORAGE } from '@/constants'
import { revalidatePath } from 'next/cache'
import { readdir } from 'node:fs'
import { rmdir, unlink } from 'node:fs/promises'

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

  readdir(`${PHOTO_DIR}/${params.date}`, async (_, files) => {
    const filtered = files.filter((file) => !file.startsWith('.'))
    if (!filtered.length) {
      await rmdir(`${PHOTO_DIR}/${params.date}`, {
        recursive: true,
      })
      console.info(`Removed dir: ${params.date}`)
    }
  })

  revalidatePath('/photos', 'page')
  return new Response(null, {
    status: 200
  })
}
