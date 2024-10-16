function agonize<T>(callback: () => T) {
  try {
    const result = callback() as T
    return [null, result]
  } catch (error) {
    return [error]
  }
}

export default agonize
