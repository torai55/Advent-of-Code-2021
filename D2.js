const fs = require('fs')
const readline = require('readline')

const inputStream = fs.createReadStream('./inputs/D2.txt')
const lineReader = readline.createInterface({ input: inputStream })
const input = []

lineReader.on('line', (line) => {
  input.push(line.split(' '))
})

lineReader.on('close', () => {
  let depth = 0
  let position = 0

  for (let i = 0; i < input.length; i++) {
    const action = input[i][0]
    switch(action) {
      case 'up':
        depth-= Number.parseInt(input[i][1], 10)
        break;
      case 'down':
        depth += Number.parseInt(input[i][1], 10)
        break;
      case 'forward':
        position += Number.parseInt(input[i][1], 10)
        break;
    }
    if (depth < 0) depth = 0
  }
  console.log(`part1 ans: position(${position}) * depth(${depth}) = ${position * depth}`)

  let aim = 0
  depth = 0
  position = 0

  for (let i = 0; i < input.length; i++) {
    const action = input[i][0]
    const value = Number.parseInt(input[i][1], 10)
    switch(action) {
      case 'up':
        aim -= value
        break;
      case 'down':
        aim += value
        break;
      case 'forward':
        position += value
        depth += (aim * value)
        break;
    }
  }
  console.log(`part2 ans: position(${position}) * depth(${depth}) = ${position * depth}`)
})
