package main

import (
	"fileUtils"
	"fmt"
)

type Part string

const (
	Part1 = "one"
	Part2 = "two"
)

func main() {
	input, err := fileUtils.ReadFileAsLines("./input.txt")
	// input, err := fileUtils.ReadFileAsLines("./example.txt")
	if err != nil {
		fmt.Println("Error reading file:", err)
		return
	}

	solve(input, Part1)
	solve(input, Part2)
}

func solve(input []string, part Part) {
	signals := [][]int{}
	grid := convertToGrid(input)
	antenna := map[string][][]int{}

	rows, cols := len(grid), len(grid[0])

	for i := 0; i < len(grid); i++ {
		for j := 0; j < len(grid[i]); j++ {
			if grid[i][j] == "." {
				continue
			}
			if _, ok := antenna[grid[i][j]]; !ok {
				antenna[grid[i][j]] = [][]int{{i, j}}
			} else {
				antenna[grid[i][j]] = append(antenna[grid[i][j]], []int{i, j})
			}
		}
	}

	for _, value := range antenna {
		for i := 0; i < len(value)-1; i++ {
			for j := i + 1; j < len(value); j++ {
				firstCoord, secondCoord := value[i], value[j]
				if part == Part2 {
					processSignal(&signals, firstCoord, []int{0, 0}, rows, cols, false)
					processSignal(&signals, secondCoord, []int{0, 0}, rows, cols, false)
				}

				distance := []int{firstCoord[0] - secondCoord[0], firstCoord[1] - secondCoord[1]}

				firstSignal := []int{firstCoord[0] + distance[0], firstCoord[1] + distance[1]}
				secondSignal := []int{secondCoord[0] - distance[0], secondCoord[1] - distance[1]}

				if part == Part1 {
					processSignal(&signals, firstSignal, distance, rows, cols, false)
					processSignal(&signals, secondSignal, distance, rows, cols, false)
				} else {
					processSignal(&signals, firstSignal, distance, rows, cols, true)
					processSignal(&signals, secondSignal, []int{-distance[0], -distance[1]}, rows, cols, true)
				}
			}
		}
	}

	fmt.Println("Part "+string(part)+": ", len(signals))
}

// processSignal appends signals while checking boundaries and uniqueness.
func processSignal(signals *[][]int, coord []int, distance []int, rows, cols int, repeat bool) {
	for isValidCoordinate(coord[0], coord[1], rows, cols) {
		if !containsPair(*signals, coord) {
			*signals = append(*signals, append([]int{}, coord...)) // Deep copy
		}
		if !repeat {
			break
		}
		coord = []int{coord[0] + distance[0], coord[1] + distance[1]}
	}
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

func containsPair(matrix [][]int, target []int) bool {
	if len(target) != 2 {
		return false // Ensure the target pair is valid
	}
	for _, pair := range matrix {
		if len(pair) == 2 && pair[0] == target[0] && pair[1] == target[1] {
			return true
		}
	}
	return false
}

// isValidCoordinate checks if the coordinates are within grid bounds.
func isValidCoordinate(x, y, maxX, maxY int) bool {
	return x >= 0 && x < maxX && y >= 0 && y < maxY
}
