const fsPromises = require('fs/promises')

async function readFile() {
  let fileHandle
  try {
    fileHandle = await fsPromises.open('./inputs/D5.txt', 'r')
    const input = await fileHandle.readFile('utf-8')
    return input
  } catch (e) {
    console.log(e)
  } finally {
    await fileHandle?.close()
  }
}

class Vent {
  constructor(fromX, fromY, toX, toY) {
    this.from = { x: fromX, y: fromY }
    this.to = { x: toX, y: toY }
  }
}

function partOne(vents) {
  const xMax = Math.max(...vents.map((vent) => [vent.from.x, vent.to.x]).flat())
  const yMax = Math.max(...vents.map((vent) => [vent.from.y, vent.to.y]).flat())
  const ventMap = new Array(xMax + 1).fill(0).map((_) => new Array(yMax + 1).fill(0))
  const horizontalAndVerticalVents = vents.filter((vent) => vent.from.x === vent.to.x || vent.from.y === vent.to.y)

  for (let vent of horizontalAndVerticalVents) {
    const xMax = Math.max(vent.from.x, vent.to.x)
    const xMin = Math.min(vent.from.x, vent.to.x)
    const yMax = Math.max(vent.from.y, vent.to.y)
    const yMin = Math.min(vent.from.y, vent.to.y)
    for (let x = xMin; x <= xMax; x++) {
      for (let y = yMin; y <= yMax; y++) {
        ventMap[y][x]++
      }
    }
  }

  const count = ventMap.flat().reduce((accu, position) => {
    if (position >= 2) return accu + 1
    return accu
  }, 0)
  return count
}

function partTwo(vents) {
  const xMax = Math.max(...vents.map((vent) => [vent.from.x, vent.to.x]).flat())
  const yMax = Math.max(...vents.map((vent) => [vent.from.y, vent.to.y]).flat())
  const ventMap = new Array(xMax + 1).fill(0).map((_) => new Array(yMax + 1).fill(0))

  const horizontalAndVerticalVents = vents.filter((vent) => vent.from.x === vent.to.x || vent.from.y === vent.to.y)
  const diagonalVents = vents.filter((vent) => Math.abs(vent.from.x - vent.to.x) === Math.abs(vent.from.y - vent.to.y))

  for (let vent of horizontalAndVerticalVents) {
    const xMax = Math.max(vent.from.x, vent.to.x)
    const xMin = Math.min(vent.from.x, vent.to.x)
    const yMax = Math.max(vent.from.y, vent.to.y)
    const yMin = Math.min(vent.from.y, vent.to.y)
    for (let x = xMin; x <= xMax; x++) {
      for (let y = yMin; y <= yMax; y++) {
        ventMap[y][x]++
      }
    }
  }

  for (let vent of diagonalVents) {
    const stepX = vent.from.x - vent.to.x < 0 ? 1 : -1
    const stepY = vent.from.y - vent.to.y < 0 ? 1 : -1
    let currX = vent.from.x
    let currY = vent.from.y
    while (1) {
      ventMap[currY][currX]++
      currX += stepX
      currY += stepY
      if (currX === vent.to.x) {
        ventMap[currY][currX]++
        break
      }
    }
  }

  const count = ventMap.flat().reduce((accu, position) => {
    if (position >= 2) return accu + 1
    return accu
  }, 0)
  return count
}

const input = readFile()
input
  .then((content) => {
    const regex = new RegExp('^(\\d+),(\\d+) -> (\\d+),(\\d+)$', 'gm')
    const ventArray = []
    let matches
    while ((matches = regex.exec(content))) {
      const positions = matches.slice(1, 5).map((pos) => Number.parseInt(pos, 10))
      const vent = new Vent(...positions)
      ventArray.push(vent)
    }
    return ventArray
  })
  .then((vents) => {
    const count = partOne(vents)
    const count2 = partTwo(vents)
    console.log(`part1 ans: ${count}`)
    console.log(`part2 ans: ${count2}`)
  })
  .catch((e) => console.log(e))
