package main

import (
	"fileUtils"
	"fmt"
	"math"
	"strconv"
	"strings"
)

func main() {
	input, err := fileUtils.ReadFileAsLines("./input.txt")
	if err != nil {
		fmt.Println("Error reading file:", err)
		return
	}

	part1(input)
}

func part1(input []string) {
	var numOfSafeReports int
	for i := 0; i < len(input); i++ {
		if isSafeReport(strings.Split(input[i], " ")) {
			numOfSafeReports++
		}
	}

	fmt.Println("Part 1: ", numOfSafeReports)
}

func isSafeReport(reports []string) bool {
	firstReport, _ := strconv.ParseFloat(reports[0], 64)
	lastReport, _ := strconv.ParseFloat(reports[len(reports)-1], 64)
	isIncreasingReports := lastReport > firstReport
	var minimumDifference float64 = 1
	var maximumDifference float64 = 3

	for i := 1; i < len(reports); i++ {
		num1, _ := strconv.ParseFloat(reports[i-1], 64)
		num2, _ := strconv.ParseFloat(reports[i], 64)
		if (isIncreasingReports && num2 < num1) || (!isIncreasingReports && num2 > num1) {
			return false
		}

		difference := math.Abs(num2 - num1)
		if difference < minimumDifference || difference > maximumDifference {
			return false
		}
	}

	return true
}
