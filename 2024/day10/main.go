package main

import (
	"fileUtils"
	"fmt"
	"strconv"
)

func main() {
	input, err := fileUtils.ReadFileAsLines("./input.txt")
	// input, err := fileUtils.ReadFileAsLines("./example.txt")
	if err != nil {
		fmt.Println("Error reading file:", err)
		return
	}

	solve(input)
}

func solve(input []string) {
	grid := convertToGrid(input)
	result := 0
	startPoints := make([][]int, 0)
	for i := 0; i < len(grid); i++ {
		for j := 0; j < len(grid[i]); j++ {
			if grid[i][j] == "0" {
				startPoints = append(startPoints, []int{i, j})
			}
		}
	}

	for i := 0; i < len(startPoints); i++ {
		results := make([][]int, 0)
		curr, _ := strconv.Atoi(grid[startPoints[i][0]][startPoints[i][1]])
		nextCoord1 := []int{startPoints[i][0] + 1, startPoints[i][1]}
		nextCoord2 := []int{startPoints[i][0] - 1, startPoints[i][1]}
		nextCoord3 := []int{startPoints[i][0], startPoints[i][1] + 1}
		nextCoord4 := []int{startPoints[i][0], startPoints[i][1] - 1}
		result += traverse(grid, curr, nextCoord1, &results) + traverse(grid, curr, nextCoord2, &results) + traverse(grid, curr, nextCoord3, &results) + traverse(grid, curr, nextCoord4, &results)
	}
	print(result)
}

func traverse(input [][]string, prev int, nextCoord []int, results *[][]int) int {
	row, col := nextCoord[0], nextCoord[1]
	if row < 0 || row >= len(input) || col < 0 || col >= len(input[0]) {
		return 0
	}

	curVal, _ := strconv.Atoi(input[row][col])
	if curVal == prev+1 {
		if curVal == 9 {
			if !containsPair(*results, []int{row, col}) {
				*results = append(*results, []int{row, col})
				return 1
			}
		}

		return traverse(input, curVal, []int{row + 1, col}, results) + traverse(input, curVal, []int{row - 1, col}, results) + traverse(input, curVal, []int{row, col + 1}, results) + traverse(input, curVal, []int{row, col - 1}, results)
	} else {
		return 0
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
