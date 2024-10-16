async function agonizeAsync<T>(promise: () => Promise<T>): Promise<[null, T] | [Error]> {
  try {
    const response = await promise()
    return [null, response] as [null, T]
  } catch (error) {
    return [error] as [Error]
  }
}

export default agonizeAsync
