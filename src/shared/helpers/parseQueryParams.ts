// export function parseQueryParams<T = {}>(params: any): T {
//   const parsedParams = {}

//   Object.keys(params).forEach((key) => {
//     if (params[key]) {
//       parsedParams[key] = params[key]
//     }
//   })

//   return parsedParams as T
// }

export function parseQueryParams<T extends Record<string, any>>(params: Record<string, any>): T {
  return Object.assign({}, ...Object.keys(params).map((key) => ({ [params[key]]: params[key] })))
}
