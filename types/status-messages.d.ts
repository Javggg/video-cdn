interface StatusMessage {
  message: string
  code: 200 | 400 | 404 | 500
}

export { StatusMessage }
