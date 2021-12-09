const fsPromises = require('fs/promises')
const path = require('path')

async function readFile(filePath) {
  let fileHandle
  try {
    fileHandle = await fsPromises.open(path.resolve(filePath), 'r')
    const input = await fileHandle.readFile('utf-8')
    return input
  } catch (e) {
    console.log(e)
  } finally {
    await fileHandle?.close()
  }
}

module.exports = {
  readFile
}
