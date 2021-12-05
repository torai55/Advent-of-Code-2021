const fs = require('fs')
const readline = require('readline')

const inputStream = fs.createReadStream('./inputs/D1.txt')
const lineReader = readline.createInterface({ input: inputStream })
let input = []

lineReader.on('line', (line) => {
  input.push(Number.parseInt(line, 10))
})

lineReader.on('close', () => {
  let increases = 0
  for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1]) increases++
  }
  console.log(`part1 ans: ${increases}`)

  increases = 0
  for (let i = 1; i < input.length - 2; i++) {
    if (input[i + 2] > input[i - 1]) increases++
  }
  console.log(`part2 ans: ${increases}`)
})
