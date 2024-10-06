import { readdir } from 'node:fs/promises'
import { existsSync, mkdirSync } from 'node:fs'

export async function GET() {

  if (!existsSync('./storage/photos'))
    mkdirSync('./storage/photos')

  const files = await readdir('./storage/photos')
  return Response.json(files)
}
