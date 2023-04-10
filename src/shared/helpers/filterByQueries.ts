export function filterByQueries<T extends object, Q extends object>(arr: T[], query: Q) {
  return arr.filter((item) => {
    const itemKeys = Object.keys(item) as (keyof T)[]
    const queryKeys = Object.entries(query)
      .filter(([, value]) => value !== undefined && value !== 'all')
      .map(([key]) => key as keyof T)

    const itemKeysFiltered = itemKeys.filter((itemKey) => queryKeys.includes(itemKey))
    const validatedQuery = Object.assign(
      {},
      ...Object.entries(query)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => ({ [key]: value })),
    )

    return itemKeysFiltered.every((itemKey) => item[itemKey] === validatedQuery[itemKey])
  })
}
