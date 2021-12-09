const readFile = require('./utils').readFile

class Lanternfish {
  constructor(reproductionDay) {
    this.day = reproductionDay
  }

  grow() {
    this.day--
    return this
  }

  fertilize() {
    this.day = 6
    return this
  }
}

function part1Solve(fishes, timeSpan) {
  for (let elapseTime = 0; elapseTime < timeSpan; elapseTime++) {
    const newFish = []
    for (let i = 0; i < fishes.length; i++) {
      if (fishes[i].grow().day < 0) {
        fishes[i].fertilize()
        newFish.push(new Lanternfish(8))
      }
    }

    newFish.forEach((fish) => {
      fishes.push(fish)
    })
  }
  return fishes.length
}

function part2Solve(fishes, timeSpan) {
  // period[0] 代表第 N % 7 === 0 天有多少老魚生產
  // reproductionDay[9] 代表有多少新出生的小魚會在第九天生產（生產過一次後變成老魚）
  const reproductionPeriod = new Array(7).fill(0)
  const reproductionDay = {}

  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < fishes.length; j++) {
      if (fishes[j].grow().day < 0) {
        fishes[j].fertilize()
        reproductionPeriod[i]++
      }
    }
  }

  for (let elapseTime = 0; elapseTime < timeSpan; elapseTime++) {
    const period = elapseTime % 7
    if (reproductionDay[elapseTime]) {
      reproductionPeriod[period] += reproductionDay[elapseTime]
      delete reproductionDay[elapseTime]
    }
    reproductionDay[elapseTime + 9] = reproductionPeriod[period]
  }

  const newFishes = Object.values(reproductionDay)
  const total = reproductionPeriod.concat(newFishes).reduce((accu, curr) => accu + curr, 0)
  return total
}

const input = readFile('./inputs/D6.txt').then((content) => content.split(',').map((ele) => new Lanternfish(Number.parseInt(ele, 10))))

input.then((fishes) => {
  console.log(`part1 ans: ${part1Solve(fishes, 80)}`)
})

input.then((fishes) => {
  console.log(`part2 ans: ${part2Solve(fishes, 256)}`)
})
