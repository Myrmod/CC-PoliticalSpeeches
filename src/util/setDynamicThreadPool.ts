import OS from 'os'

export default function setDynamicThreadPool(): void {
  try {
    process.env.UV_THREADPOOL_SIZE = String(OS.cpus().length)
  } catch (error) {
    console.error(error)
  }
}
