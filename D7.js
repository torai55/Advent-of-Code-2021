const { readFile } = require('./utils')

function solvePart1(crabs) {
  const maxPosition = Math.max(...crabs)
  const costFuelInPosition = Array(maxPosition).fill(0)

  for (let position = 0; position <= maxPosition; position++) {
    for (let i = 0; i < crabs.length; i++) {
      costFuelInPosition[position] += (Math.abs(crabs[i] - position))
    }
  }

  return costFuelInPosition.reduce((leastFuel, fuel) => fuel < leastFuel ? fuel : leastFuel, Infinity)
}

function solvePart2(crabs) {
  const maxPosition = Math.max(...crabs)
  const costFuelInPosition = Array(maxPosition).fill(0)
  const stepConverter = convertStepsToFuelUsingCache()

  for (let position = 0; position <= maxPosition; position++) {
    for (let i = 0; i < crabs.length; i++) {
      const steps = Math.abs(crabs[i] - position)
      costFuelInPosition[position] += stepConverter(steps)
    }
  }
  return costFuelInPosition.reduce((leastFuel, fuel) => fuel < leastFuel ? fuel : leastFuel, Infinity)
}

function convertStepsToFuelUsingCache() {
  // cache[5] 代表走五步需要多少燃料
  const cache = [0, 1]
  return function converter(step) {
    if (cache[step]) return cache[step]

    const closestStepInCache = cache.reduce((closest, _, index) => {
      return (index > closest) && (index < step) ? index : closest
    }, 1)
    for (let i = closestStepInCache + 1; i <= step; i++) {
      cache[i] = cache[i - 1] + i
    }
    return cache[step]
  }
}

const input = readFile('./inputs/D7.txt').then((content) => content.split(',').map((crab) => Number.parseInt(crab, 10)))
input.then((crabs) => {
  console.log(`part1 ans: ${solvePart1(crabs)}`)
  console.log(`part2 ans: ${solvePart2(crabs)}`)
})
