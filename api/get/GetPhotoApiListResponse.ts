import { readdir } from 'node:fs/promises'
import { existsSync, mkdirSync } from 'node:fs'

export type GetPhotoApiListResponse = `${number}${number}${number}${number}_${number}${number}_${number}${number}`[]


const getPhotoApiList = async () => {

  if (!existsSync('./storage'))
    mkdirSync('./storage')

  if (!existsSync('./storage/photos'))
    mkdirSync('./storage/photos')

  const files = await readdir('./storage/photos')

  const sorted = files.sort((a, b) => {
    const [yearA, monthA, dayA] = a.split('_').map((item) => parseInt(item, 10))
    const [yearB, monthB, dayB] = b.split('_').map((item) => parseInt(item, 10))

    if (yearB > yearA) return -1
    if (monthB > monthA) return -1
    if (dayB > dayA) return -1
    return 1
  })
  return sorted as GetPhotoApiListResponse
}

export default getPhotoApiList
