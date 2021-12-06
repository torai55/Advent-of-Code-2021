const fs = require('fs')
const readline = require('readline')

const inputStream = fs.createReadStream('./inputs/D4.txt')
const lineReader = readline.createInterface({ input: inputStream })
const input = []

lineReader.on('line', (line) => {
  input.push(line)
})

lineReader.on('close', () => {
  const targetSequence = input[0].split(',').map((ele) => Number.parseInt(ele, 10))
  const boards = []

  for (let line = 2; line < input.length; line++) {
    if (input[line] === '') continue
    const boardCount = Math.floor((line - 2) / 6)
    const x = (line - 2) % 6

    const boardNumbers = input[line]
      .trim()
      .split(new RegExp(' +'))
      .map((ele) => Number.parseInt(ele, 10))
    if (x === 0) boards[boardCount] = []
    boards[boardCount][x] = []

    for (let y = 0; y < 5; y++) {
      boards[boardCount][x][y] = boardNumbers[y]
    }
  }

  const wonBoards = []
  const boardWonTargets = new Array(boards.length).fill(0)
  for (target of targetSequence) {
    for (let boardCount = 0; boardCount < boards.length; boardCount++) {
      if (wonBoards.includes(boardCount)) continue
      let bingo = false
      const position = searchingTargetInBoard(boards[boardCount], target)

      if (position) {
        boards[boardCount][position.x][position.y] = -1
        bingo = getBingo(boards[boardCount], position)
      }

      if (bingo) {
        wonBoards[wonBoards.length] = boardCount
        boardWonTargets[boardCount] = target
      }
    }
  }

  const firstWonBoard = wonBoards[0]
  const firstTarget = boardWonTargets[firstWonBoard]
  const lastWonBoard = wonBoards[wonBoards.length - 1]
  const lastTarget = boardWonTargets[lastWonBoard]
  console.log(`part1 ans: ${getScore(boards[firstWonBoard], firstTarget)}`)
  console.log(`part2 ans: ${getScore(boards[lastWonBoard], lastTarget)}`)
})

/**
 * 取得 target 的位置，若不存在則返回 false
 * @param {number[][]} board
 * @param {number} target
 * @returns {{x: number, y: number}} result
 */
function searchingTargetInBoard(board, target) {
  let result = false
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[0].length; y++) {
      if (board[x][y] === target) {
        result = { x, y }
        break
      }
    }
  }
  return result
}

/**
 * 看 board 裡面有沒有 -1 連成垂直或水平線
 * @param {number[][]} board
 * @param {Object} position
 * @param {number} position.x
 * @param {number} position.y
 * @returns {boolean} result
 */
function getBingo(board, position) {
  for (let x = 0; x < board.length; x++) {
    if (board[x][position.y] !== -1) break
    if (x === board.length - 1) return true
  }

  for (let y = 0; y < board[0].length; y++) {
    if (board[position.x][y] !== -1) break
    if (y === board[0].length - 1) return true
  }
  return false
}

/**
 *
 * @param {number[][]} board
 * @param {number} target
 * @returns {number} score
 */
function getScore(board, target) {
  let sum = 0
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[0].length; y++) {
      if (board[x][y] !== -1) sum += board[x][y]
    }
  }
  return sum * target
}
