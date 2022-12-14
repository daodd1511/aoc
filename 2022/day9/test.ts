export enum Direction {
    Right = 'R',
    Up = 'U',
    Left = 'L',
    Down = 'D',
  }
  
  export interface Move {
    direction: Direction
    steps: number
  }
  
  export interface Coordinate {
    x: number
    y: number
  }

  import { readFileSync } from "fs"

const parseMoves = (input: string): Move[] => {
  return input.split('\n').map((row: string) => {
    const [direction, steps]: string[] = row.split(' ')
    return {
      direction: <Direction>direction,
      steps: +steps,
    }
  })
}

const moveHead = ({ direction }: Move, { x, y }: Coordinate): Coordinate => {
  switch (direction) {
    case Direction.Up:
      return { x, y: y + 1 }
    case Direction.Down:
      return { x, y: y - 1 }
    case Direction.Left:
      return { x: x - 1, y }
    case Direction.Right:
      return { x: x + 1, y }
  }
}

const moveTail = (
  { x: headX, y: headY }: Coordinate,
  { x: tailX, y: tailY }: Coordinate
): Coordinate => {
  const xDiff: number = headX - tailX
  const yDiff: number = headY - tailY
  const xDist: number = Math.max(Math.abs(xDiff), 1)
  const yDist: number = Math.max(Math.abs(yDiff), 1)
  if (xDist >= 2 || yDist >= 2) {
    return {
      x: tailX + xDiff / xDist,
      y: tailY + yDiff / yDist,
    }
  }
  return { x: tailX, y: tailY }
}

const moveTails = (
  headPos: Coordinate,
  tailsPos: Coordinate[]
): Coordinate[] => {
  let targetPos: Coordinate = moveTail(headPos, tailsPos[0])
  const result: Coordinate[] = [targetPos]
  for (let i = 1; i < tailsPos.length; i++) {
    targetPos = moveTail(targetPos, tailsPos[i])
    result.push(targetPos)
  }
  return result
}

const handleStep = (
  move: Move,
  headPos: Coordinate,
  tailsPos: Coordinate[]
): { headMoves: Coordinate[]; tailsMoves: Coordinate[][] } => {
  const headMoves: Coordinate[] = []
  const tailsMoves: Coordinate[][] = []
  let headMove: Coordinate = moveHead(move, headPos)
  let tailsMove: Coordinate[] = moveTails(headPos, tailsPos)
  headMoves.push(headMove)
  tailsMoves.push(tailsMove)
  for (let i = 1; i < move.steps; i++) {
    headMove = moveHead(move, headMove)
    tailsMove = moveTails(headMove, tailsMove)
    headMoves.push(headMove)
    tailsMoves.push(tailsMove)
  }
  return { headMoves, tailsMoves }
}

const countUniqueCoordinates = (coordinates: Coordinate[]): number => {
  return coordinates.reduce((acc: Coordinate[], curr: Coordinate) => {
    if (!acc.find(({ x, y }: Coordinate) => x === curr.x && y === curr.y)) {
      return [...acc, curr]
    }
    return acc
  }, []).length
}

const getTail = (tails: Coordinate[][], index: number): Coordinate[] => {
  return tails.map((positions: Coordinate[]) => positions[index])
}

export const run = () => {
  const rawInput: string = readFileSync('./exampleInput.txt', 'utf-8')
  const moves: Move[] = parseMoves(rawInput)
  const head: Coordinate[] = [{ x: 0, y: 0 }]
  const tails: Coordinate[][] = [
    Array.from(Array(9).keys()).map(() => ({ x: 0, y: 0 })),
  ]
  moves.forEach((move: Move) => {
    const { headMoves, tailsMoves } = handleStep(
      move,
      head[head.length - 1],
      tails[tails.length - 1]
    )
    head.push(...headMoves)
    tails.push(...tailsMoves)
  })
  const partOne: number = countUniqueCoordinates(getTail(tails, 0))
  const partTwo: number = countUniqueCoordinates(getTail(tails, 8))

  console.log('Part One:', partOne)
    console.log('Part Two:', partTwo)
}
run()