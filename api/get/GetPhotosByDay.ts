import { existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'


export type PhotosByDayList = {
  name: string,
  ext: string,
  date: string
}

const PHOTOS = './storage/photos'

async function getPhotosBayDay(date: string) {

  const dir = `${PHOTOS}/${date}`

  if (!existsSync(dir))
    throw new Error('Missing dir')

  const files = await readdir(dir)
  const parsed = files.map((file) => ({
    ext: /(?=[^.]*$).*/.exec(file)?.[0],
    name: /^.*(?=\.)/.exec(file)?.[0],
    date: date
  })).filter(({ ext, name, date }) => !!name || !!ext || !!date).filter(({ name }) =>
    name !== ''
  ) as PhotosByDayList[]

  console.log(parsed)

  const sorted = Object.groupBy(parsed, ({ name }) => name)
  const singles = Array.from(new Set(parsed.map(({ name }) => name)))
  const images = singles.map((name) => sorted[name])

  return (images || []) as unknown as PhotosByDayList[][]
}

export default getPhotosBayDay
