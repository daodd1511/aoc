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
	part2(grid)
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

func part2(grid [][]string) {
	count := 0
	mAndSPos1 := [][]int{{-1, -1}, {1, 1}}
	mAndSPos2 := [][]int{{-1, 1}, {1, -1}}
	for i := 0; i < len(grid); i++ {
		for j := 0; j < len(grid[i]); j++ {
			if grid[i][j] == "A" {
				isPos1Valid := false
				isPos2Valid := false

				pos1Value1Row := i + mAndSPos1[0][0]
				pos1Value1Col := j + mAndSPos1[0][1]
				pos1Value2Row := i + mAndSPos1[1][0]
				pos1Value2Col := j + mAndSPos1[1][1]
				pos2Value1Row := i + mAndSPos2[0][0]
				pos2Value1Col := j + mAndSPos2[0][1]
				pos2Value2Row := i + mAndSPos2[1][0]
				pos2Value2Col := j + mAndSPos2[1][1]

				if validPosition(grid, pos1Value1Row, pos1Value1Col) && validPosition(grid, pos1Value2Row, pos1Value2Col) {
					pos1Value1 := grid[pos1Value1Row][pos1Value1Col]
					pos1Value2 := grid[pos1Value2Row][pos1Value2Col]
					if pos1Value1 == "M" && pos1Value2 == "S" || pos1Value1 == "S" && pos1Value2 == "M" {
						isPos1Valid = true
					}
				}

				if validPosition(grid, pos2Value1Row, pos2Value1Col) && validPosition(grid, pos2Value2Row, pos2Value2Col) {
					pos2Value1 := grid[pos2Value1Row][pos2Value1Col]
					pos2Value2 := grid[pos2Value2Row][pos2Value2Col]
					if pos2Value1 == "M" && pos2Value2 == "S" || pos2Value1 == "S" && pos2Value2 == "M" {
						isPos2Valid = true
					}
				}

				if isPos1Valid && isPos2Valid {
					count++
				}
			}
		}
	}

	fmt.Println("Part 2: ", count)
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
