type Result<T> = {
  success: true,
  data: T
} | {
  success: false,
  error: string
}

export default Result
