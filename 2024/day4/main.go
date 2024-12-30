package main

import (
	"fileUtils"
	"fmt"
)

type Position struct {
	row     int
	col     int
	formula []int
	value   string
}

func main() {
	input, err := fileUtils.ReadFileAsLines("./input.txt")
	if err != nil {
		fmt.Println("Error reading file:", err)
		return
	}

	grid := convertToGrid(input)
	part1(grid)
}

func part1(grid [][]string) {
	var count int
	for i := 0; i < len(grid); i++ {
		for j := 0; j < len(grid[i]); j++ {
			if grid[i][j] == "X" {
				xAdjacent := getAdjacent(grid, i, j)
				for _, adjacent := range xAdjacent {
					aRowIndex := adjacent.row + adjacent.formula[0]
					aColIndex := adjacent.col + adjacent.formula[1]
					if adjacent.value == "M" && validPosition(grid, aRowIndex, aColIndex) {
						nextValue := grid[aRowIndex][aColIndex]
						sRowIndex := aRowIndex + adjacent.formula[0]
						sColIndex := aColIndex + adjacent.formula[1]
						if nextValue == "A" && validPosition(grid, sRowIndex, sColIndex) {
							sValue := grid[sRowIndex][sColIndex]
							if sValue == "S" {
								count++
							}
						}
					}
				}
			}
		}
	}

	fmt.Println("Part 1: ", count)
}

func validPosition(grid [][]string, row, col int) bool {
	return row >= 0 && row < len(grid) && col >= 0 && col < len(grid[0])
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

func getAdjacent(grid [][]string, row, col int) []Position {
	adjacent := make([]Position, 0, 4)
	if row-1 >= 0 {
		adjacent = append(adjacent, Position{row - 1, col, []int{-1, 0}, grid[row-1][col]})
	}
	if col-1 >= 0 {
		adjacent = append(adjacent, Position{row, col - 1, []int{0, -1}, grid[row][col-1]})
	}
	if row+1 < len(grid) {
		adjacent = append(adjacent, Position{row + 1, col, []int{1, 0}, grid[row+1][col]})
	}
	if col+1 < len(grid[0]) {
		adjacent = append(adjacent, Position{row, col + 1, []int{0, 1}, grid[row][col+1]})
	}
	if row-1 >= 0 && col-1 >= 0 {
		adjacent = append(adjacent, Position{row - 1, col - 1, []int{-1, -1}, grid[row-1][col-1]})
	}
	if row-1 >= 0 && col+1 < len(grid[0]) {
		adjacent = append(adjacent, Position{row - 1, col + 1, []int{-1, 1}, grid[row-1][col+1]})
	}
	if row+1 < len(grid) && col-1 >= 0 {
		adjacent = append(adjacent, Position{row + 1, col - 1, []int{1, -1}, grid[row+1][col-1]})
	}
	if row+1 < len(grid) && col+1 < len(grid[0]) {
		adjacent = append(adjacent, Position{row + 1, col + 1, []int{1, 1}, grid[row+1][col+1]})
	}

	return adjacent
}
