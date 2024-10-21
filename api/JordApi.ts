export type GetPhotoApiListResponse = `${number}${number}${number}${number}_${number}${number}_${number}${number}`[]

export type PhotosByDayList = {
  name: string,
  ext: string,
  date: string
}

export type GetPhotosByDayResponse = PhotosByDayList[][]

import Api from './Api'

const HOST = process.env.NEXT_PUBLIC_HOST
const PORT = process.env.NEXT_PUBLIC_PORT
const PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL

export const APP_URL = `${PROTOCOL}://${HOST}:${PORT}`

class JordApi {
  public api = new Api(APP_URL)

  public async getPhotosByDay(date: string) {
    const response = await this.api.get<GetPhotosByDayResponse>(`/photos/api/list/${date}`, {
      next: {
        tags: [date]
      },
      cache: 'no-cache'
    })
    return await response.json()
  }

  public async getLocalImage(date: string, name: string) {
    const response = await this.api.get<string>(`/photos/api/image/${date}/${name}`)
    return await response.text()
  }
}

const jordApi = new JordApi()
export default jordApi
