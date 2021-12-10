const { readFile } = require('./utils')

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

// 在記憶體中模擬每隻魚的生產狀況，隨著魚的數量增加，所用的記憶體也越多
// space complexity: O(n)
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

// 每七天作為一個生產週期，記住週期中第幾天會有多少魚生產
// 因為新的小魚生產週期超過 7，所以另外以日期（在總天數中的第幾天會生）記
// 所以 10 天後會有 10 % 7 === 3，也就是週期中第 3 天的老魚們會生產，加上總天數中第 10 天會生產的小魚們
// 總生產數 = reproductionPeriod[3] + reproductionDay[10]
// 不用記憶體模擬魚的行為，所以空間複雜度不隨著數量線性增加
// space complexity: O(1)
function part2Solve(fishes, timeSpan) {
  if (timeSpan < 8) return part1Solve(fishes, timeSpan)
  // reproductionPeriod[0] 代表第 N % 7 === 0 天有多少老魚生產
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
// 或者用 Deep copy，兩種解法都會改變原陣列所以要分開
const input2 = readFile('./inputs/D6.txt').then((content) => content.split(',').map((ele) => new Lanternfish(Number.parseInt(ele, 10))))

input.then((fishes) => {
  console.log(`part1 ans: ${part1Solve(fishes, 80)}`)
})

input2.then((fishes) => {
  console.log(`part2 ans: ${part2Solve(fishes, 256)}`)
})
