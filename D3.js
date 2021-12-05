const fs = require('fs')
const readline = require('readline')

const inputStream = fs.createReadStream('./inputs/D3.txt')
const lineReader = readline.createInterface({ input: inputStream })
const input = []

lineReader.on('line', (line) => {
  input.push(line)
})

lineReader.on('close', () => {
  const counter = new Array(input[0].length).fill(0).map(() => new Array(2).fill(0))
  for (let i = 0; i < input.length; i++) {
    for (let digit = 0; digit < input[i].length; digit++) {
      const key = input[i][digit]
      counter[digit][key]++
    }
  }

  let epsilon = ''
  let gamma = ''

  for (let i = 0; i < counter.length; i++) {
    epsilon += counter[i][0] > counter[i][1] ? '0' : '1'
    gamma += counter[i][0] < counter[i][1] ? '0' : '1'
  }
  epsilon = Number.parseInt(epsilon, 2)
  gamma = Number.parseInt(gamma, 2)
  console.log(`part1 ans: epsilon(${epsilon}) * gamma(${gamma}) = ${epsilon * gamma}`)

  let oxygenRating = Array.from(input)
  let co2Rating = Array.from(input)

  for (let digit = 0; digit < oxygenRating[0].length; digit++) {
    const counter = [0, 0]
    for (let i = 0; i < oxygenRating.length; i++) {
      const value = oxygenRating[i][digit]
      counter[value]++
    }
    const mostCommonValue = counter[1] >= counter[0] ? '1' : '0'
    oxygenRating = oxygenRating.filter((ele) => ele[digit] === mostCommonValue)
    if (oxygenRating.length <= 1) break
  }

  for (let digit = 0; digit < co2Rating[0].length; digit++) {
    const counter = [0, 0]
    for (let i = 0; i < co2Rating.length; i++) {
      const value = co2Rating[i][digit]
      counter[value]++
    }
    const leastCommonValue = counter[0] <= counter[1] ? '0' : '1'
    co2Rating = co2Rating.filter((ele) => ele[digit] === leastCommonValue)
    if (co2Rating.length <= 1) break
  }
  oxygenRating = Number.parseInt(oxygenRating, 2)
  co2Rating = Number.parseInt(co2Rating, 2)
  console.log(`part2 ans: oxygenRating(${oxygenRating}) * co2Rating(${co2Rating}) = ${oxygenRating * co2Rating}`)
})
