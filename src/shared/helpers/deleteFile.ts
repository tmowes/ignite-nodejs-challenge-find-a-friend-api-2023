import { stat, unlink } from 'node:fs/promises'

export async function deleteFile(filename: string) {
  try {
    await stat(filename)
  } catch {
    return
  }
  await unlink(filename)
}
