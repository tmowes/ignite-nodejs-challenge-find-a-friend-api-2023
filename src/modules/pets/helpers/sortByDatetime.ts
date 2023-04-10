export function sortByDatetime<T extends { datetime: string }>(arr: T[]): T[] {
  return arr.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
}
