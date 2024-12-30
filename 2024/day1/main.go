package main

import (
	"fileUtils"
	"fmt"
	"math"
	"sort"
	"strconv"
	"strings"
)

func main() {
	part1()
	part2()
}

func getLeftAndRight() (left, right []string) {
	input, err := fileUtils.ReadFileAsLines("./input.txt")
	var leftList []string
	var rightList []string
	if err != nil {
		fmt.Println("Error reading file:", err)
		return
	}

	for i := 0; i < len(input); i++ {
		splitted := strings.Split(input[i], "   ")
		leftList = append(leftList, splitted[0])
		rightList = append(rightList, splitted[1])
	}

	return leftList, rightList
}

func part1() {
	leftList, rightList := getLeftAndRight()
	sort.Strings(leftList)
	sort.Strings(rightList)
	var totalDistance float64
	for i := 0; i < len(leftList); i++ {
		left, _ := strconv.ParseFloat(leftList[i], 64)
		right, _ := strconv.ParseFloat(rightList[i], 64)

		totalDistance += math.Abs(left - right)
	}

	fmt.Println("Part 1: ", totalDistance)
}

func part2() {
	leftList, rightList := getLeftAndRight()
	var similarity float64
	for i := 0; i < len(leftList); i++ {
		matches := 0
		left, _ := strconv.ParseFloat(leftList[i], 64)
		for j := 0; j < len(rightList); j++ {
			if leftList[i] == rightList[j] {
				matches++
			}
		}

		if matches > 0 {
			similarity += left * float64(matches)
		}
	}
	fmt.Println("Part 2: ", similarity)
}
