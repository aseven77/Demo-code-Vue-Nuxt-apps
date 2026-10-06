interface Payload {
  statusCode: number
  statusMessage: string
  fatal: boolean
}

export function notFoundUserBySlag({
  statusCode,
  statusMessage,
  fatal = false,
}: Payload): Error {
  throw createError({
    statusCode,
    statusMessage,
    fatal,
  })
}
