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
	part2(input)
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

func part2(input []string) {
	var numOfSafeReports int
	for i := 0; i < len(input); i++ {
		if isSafeReportWithOneBadReport(strings.Split(input[i], " ")) {
			numOfSafeReports++
		}
	}

	fmt.Println("Part 2: ", numOfSafeReports)
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

func isSafeReportWithOneBadReport(reports []string) bool {
	firstReport, _ := strconv.ParseFloat(reports[0], 64)
	lastReport, _ := strconv.ParseFloat(reports[len(reports)-1], 64)
	isIncreasingReports := lastReport > firstReport
	var minimumDifference float64 = 1
	var maximumDifference float64 = 3
	var hasBadReport bool

	for i := 0; i < len(reports)-1; i++ {
		num1, _ := strconv.ParseFloat(reports[i], 64)
		num2, _ := strconv.ParseFloat(reports[i+1], 64)
		difference := math.Abs(num2 - num1)
		if (isIncreasingReports && num2 < num1) || (!isIncreasingReports && num2 > num1) || difference < minimumDifference || difference > maximumDifference {
			hasBadReport = true
		}
	}

	if !hasBadReport {
		return true
	}

	var hasSafeReport bool
	for i := 0; i < len(reports); i++ {
		reportsCopy := make([]string, len(reports))
		copy(reportsCopy, reports)
		reportsCopy = append(reportsCopy[:i], reportsCopy[i+1:]...)

		if isSafeReport(reportsCopy) {
			hasSafeReport = true
		}
	}

	return hasSafeReport
}
