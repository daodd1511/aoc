package main

import (
	"fileUtils"
	"fmt"
	"strconv"
)

func main() {
	input, err := fileUtils.ReadFileAsLines("./input.txt")

	if err != nil {
		fmt.Println("Error reading file:", err)
		return
	}

	part1(input)
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

	fmt.Println("Part 1: ", len(visited))
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
