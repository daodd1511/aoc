package main

import (
	"fileUtils"
	"fmt"
	"strconv"
)

func main() {
	// input, err := fileUtils.ReadFileAsLines("./input.txt")
	example, err := fileUtils.ReadFileAsLines("./example.txt")
	if err != nil {
		fmt.Println("Error reading file:", err)
		return
	}

	// part1(input)
	// part1(example)
	part2(example)
}

type Direction string

const (
	Up    Direction = "up"
	Down  Direction = "down"
	Left  Direction = "left"
	Right Direction = "right"
)

type GuardLocation struct {
	row       int
	col       int
	direction Direction
}

type Location struct {
	row int
	col int
}

func part1(input []string) {
	mapArea := convertToGrid(input)
	var guardLocation GuardLocation

	for i := 0; i < len(mapArea); i++ {
		for j := 0; j < len(mapArea[i]); j++ {
			if mapArea[i][j] == "^" {
				guardLocation = GuardLocation{
					row:       i,
					col:       j,
					direction: Up,
				}
			}
		}
	}

	nextStep := guardLocation
	key := strconv.Itoa(nextStep.row) + "," + strconv.Itoa(nextStep.col)
	visited := map[string]bool{key: true}
	for nextStep.row < len(mapArea)-1 && nextStep.row > 0 && nextStep.col > 0 && nextStep.col < len(mapArea[0])-1 {
		nextStep = getNextStep(mapArea, nextStep)
		key := strconv.Itoa(nextStep.row) + "," + strconv.Itoa(nextStep.col)
		if !visited[key] {
			visited[key] = true
			mapArea[nextStep.row][nextStep.col] = "x"
		}
	}

	fmt.Println("Part 1: ", len(visited), visited)
	fileUtils.ExportFile("./output.txt", mapArea)
}

func part2(input []string) {
	mapArea := convertToGrid(input)
	var obstacles []Location
	var guardLocation GuardLocation

	for i := 0; i < len(mapArea); i++ {
		for j := 0; j < len(mapArea[i]); j++ {
			if mapArea[i][j] == "^" {
				guardLocation = GuardLocation{
					row:       i,
					col:       j,
					direction: Up,
				}
			}

			if mapArea[i][j] == "#" {
				obstacles = append(obstacles, Location{
					row: i,
					col: j,
				})
			}
		}
	}

	nextStep := guardLocation
	key := strconv.Itoa(nextStep.row) + "," + strconv.Itoa(nextStep.col)
	visited := map[string]bool{key: true}
	count := 0
	for nextStep.row < len(mapArea)-1 && nextStep.row > 0 && nextStep.col > 0 && nextStep.col < len(mapArea[0])-1 {
		count++
		if count > 100000 {
			break
		}
		nextStep = getNextStep(mapArea, nextStep)
		key := strconv.Itoa(nextStep.row) + "," + strconv.Itoa(nextStep.col)
		if !visited[key] {
			visited[key] = true
			mapArea[nextStep.row][nextStep.col] = "x"
		}
	}

	fmt.Println("Part 2: ", obstacles)

	// var missingObstacles []Location

	// // a[0] - b[0] = -1
	// // c[0] - d[0] = -1
	// // a[1] - c[1] = 1
	// // b[1] - d[1] = 1
	// // 0,4   1,9
	// // 6,3.   7,8

	// // 3,2   4,7
	// // 6,1   7,6.

	// // 6,1 	 7,7.
	// // 8,0 	 9,6

	// // 3,2   4,7
	// // 8,1.   9,6

	// // 0,4   1,9
	// // 8,3.   9,6

	// // 6,1   7,8
	// // 8,0   9,7.
	// for i := 0; i < len(obstacles)-2; i++ {
	// 	for j := i + 1; j < len(obstacles)-1; j++ {
	// 		if obstacles[i].row-obstacles[j].row == -1 {
	// 			for k := j + 1; k < len(obstacles); k++ {
	// 				var missing Location
	// 				// // Missing is a -> i is b, j is c, k is d
	// 				// if obstacles[i].col-obstacles[k].col == 1 {
	// 				// 	missing = Location{
	// 				// 		row: obstacles[i].row - 1,
	// 				// 		col: obstacles[j].col + 1,
	// 				// 	}
	// 				// 	missingObstacles = append(missingObstacles, missing)
	// 				// 	continue
	// 				// }

	// 				// // Missing is b -> i is a, j is c, k is d
	// 				// if obstacles[i].col-obstacles[j].col == 1 {
	// 				// 	missing = Location{
	// 				// 		row: obstacles[i].row + 1,
	// 				// 		col: obstacles[k].col + 1,
	// 				// 	}
	// 				// 	missingObstacles = append(missingObstacles, missing)
	// 				// 	continue
	// 				// }

	// 				// Missing is c -> i is a, j is b, k is d
	// 				if obstacles[j].col-obstacles[k].col == 1 {
	// 					fmt.Println("a", obstacles[i], "b", obstacles[j], "i", obstacles[k])
	// 					missing = Location{
	// 						row: obstacles[k].row - 1,
	// 						col: obstacles[k].col - 1,
	// 					}
	// 					missingObstacles = append(missingObstacles, missing)
	// 					continue
	// 				}

	// 				// Missing is d -> i is a, j is b, k is c
	// 				if obstacles[i].col-obstacles[k].col == 1 {
	// 					missing = Location{
	// 						row: obstacles[k].row + 1,
	// 						col: obstacles[j].col - 1,
	// 					}
	// 					missingObstacles = append(missingObstacles, missing)
	// 					continue
	// 				}
	// 			}
	// 		}
	// 	}
	// }
}

func getNextStep(mapArea [][]string, guardLocation GuardLocation) GuardLocation {
	var final GuardLocation
	var nextStep GuardLocation
	switch guardLocation.direction {
	case Up:
		nextStep = GuardLocation{
			row:       guardLocation.row - 1,
			col:       guardLocation.col,
			direction: Up,
		}

		if mapArea[nextStep.row][nextStep.col] == "#" {
			final = GuardLocation{
				row:       guardLocation.row,
				col:       guardLocation.col + 1,
				direction: Right,
			}
		} else {
			final = nextStep
		}

	case Down:
		nextStep = GuardLocation{
			row:       guardLocation.row + 1,
			col:       guardLocation.col,
			direction: Down,
		}

		if mapArea[nextStep.row][nextStep.col] == "#" {
			final = GuardLocation{
				row:       guardLocation.row,
				col:       guardLocation.col - 1,
				direction: Left,
			}
		} else {
			final = nextStep
		}

	case Left:
		nextStep = GuardLocation{
			row:       guardLocation.row,
			col:       guardLocation.col - 1,
			direction: Left,
		}

		if mapArea[nextStep.row][nextStep.col] == "#" {
			final = GuardLocation{
				row:       guardLocation.row - 1,
				col:       guardLocation.col,
				direction: Up,
			}
		} else {
			final = nextStep
		}

	case Right:
		nextStep = GuardLocation{
			row:       guardLocation.row,
			col:       guardLocation.col + 1,
			direction: Right,
		}

		if mapArea[nextStep.row][nextStep.col] == "#" {
			final = GuardLocation{
				row:       guardLocation.row + 1,
				col:       guardLocation.col,
				direction: Down,
			}
		} else {
			final = nextStep
		}
	}

	return final
}

func convertToGrid(input []string) [][]string {
	grid := make([][]string, len(input))
	for i, line := range input {
		// Convert each character to a string and store in slice
		grid[i] = make([]string, len(line))
		for j, char := range line {
			grid[i][j] = string(char)
		}
	}

	return grid
}
