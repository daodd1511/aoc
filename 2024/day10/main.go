package main

import (
	"fileUtils"
	"fmt"
	"strconv"
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
	grid := convertToGrid(input)
	var result int

	// Find all starting points (cells with "0")
	var startPoints [][]int
	for i, row := range grid {
		for j, cell := range row {
			if cell == "0" {
				startPoints = append(startPoints, []int{i, j})
			}
		}
	}

	// Process each starting point
	for _, start := range startPoints {
		var results [][]int
		curr, err := strconv.Atoi(grid[start[0]][start[1]])
		if err != nil {
			continue
		}

		for _, nextCoord := range getNeighbors(start[0], start[1], len(grid), len(grid[0])) {
			result += traverse(grid, curr, nextCoord, &results, part)
		}
	}

	fmt.Println("Part", part, ":", result)
}

// Returns valid neighbor coordinates
func getNeighbors(row, col, rowMax, colMax int) [][]int {
	neighbors := [][]int{
		{row + 1, col}, {row - 1, col}, {row, col + 1}, {row, col - 1},
	}

	validNeighbors := make([][]int, 0, 4)
	for _, n := range neighbors {
		if n[0] >= 0 && n[0] < rowMax && n[1] >= 0 && n[1] < colMax {
			validNeighbors = append(validNeighbors, n)
		}
	}
	return validNeighbors
}

func traverse(grid [][]string, prev int, nextCoord []int, results *[][]int, part Part) int {
	row, col := nextCoord[0], nextCoord[1]

	curVal, err := strconv.Atoi(grid[row][col])
	if err != nil || curVal != prev+1 {
		return 0
	}

	if curVal == 9 {
		if part == Part1 {
			if !containsPair(*results, []int{row, col}) {
				*results = append(*results, []int{row, col})
				return 1
			}
		} else {
			return 1
		}
	}

	total := 0
	for _, neighbor := range getNeighbors(row, col, len(grid), len(grid[0])) {
		total += traverse(grid, curVal, neighbor, results, part)
	}
	return total
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
func print(input ...any) {
	fmt.Println(input...)
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
