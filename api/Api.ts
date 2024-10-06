export default class Api {
  public constructor(
    public url: string
  ) { }

  public async get<T>(path: string) {
    const response = await fetch(`${this.url}${path}`, {
      method: 'GET'
    })

    return {
      json: async () => await response.json() as T,
      text: async () => await response.text() as T,
    }
  }

  public async post<T>(path: string, body: BodyInit) {
    const response = await fetch(`${this.url}${path}`, {
      method: 'POST',
      body: body
    })

    return await response.json() as T
  }
}
