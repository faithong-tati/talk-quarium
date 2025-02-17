export const formatIssuedDate = (input: Date | string): string => {
  const date = input instanceof Date ? input : new Date(input)
  const diff = Date.now() - date.getTime()
  const seconds = Math.floor(diff / 1000)

  if (seconds < 60) return `${seconds}s ago`

  const minutes = Math.floor(diff / 60000)

  if (minutes < 60) return `${minutes}m ago`

  const hours = Math.floor(diff / 3600000)

  if (hours < 24) return `${hours}h ago`

  const days = Math.floor(diff / 86400000)

  if (days < 30) return `${days}d ago`

  const months = Math.floor(days / 30)

  if (months < 12) return `${months}mo ago`

  const years = Math.floor(days / 365)

  return `${years}y ago`
}
