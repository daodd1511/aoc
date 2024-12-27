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

	sort.Strings(leftList)
	sort.Strings(rightList)

	var totalDistance float64
	for i := 0; i < len(leftList); i++ {
		left, _ := strconv.ParseFloat(leftList[i], 64)
		right, _ := strconv.ParseFloat(rightList[i], 64)

		totalDistance += math.Abs(left - right)
	}

	fmt.Println(totalDistance)
}
