export type GetPhotoApiListResponse = `${number}${number}${number}${number}_${number}${number}_${number}${number}`[]

export type PhotosByDayList = {
  name: string,
  ext: string,
  date: string
}

export type GetPhotosByDayResponse = PhotosByDayList[][]

import Api from './Api'

class JordApi {
  public api = new Api('http://localhost:3000')

  public async getPhotoList() {
    const response = await this.api.get<GetPhotoApiListResponse>('/photos/api/list')
    return await response.json()
  }

  public async getPhotosByDay(date: string) {
    const response = await this.api.get<GetPhotosByDayResponse>(`/photos/api/list/${date}`)
    return await response.json()
  }

  public async getLocalImage(date: string, name: string) {
    const response = await this.api.get<string>(`/photos/api/image/${date}/${name}`)
    return await response.text()
  }
}

const jordApi = new JordApi()
export default jordApi
