package main

import (
	"fileUtils"
	"fmt"
	"strconv"
	"strings"
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
	var result = 0
	for i := 0; i < len(input); i++ {
		splitted := strings.Split(input[i], ": ")
		var numbers = strings.Split(splitted[1], " ")
		calibration, _ := strconv.Atoi(splitted[0])

		if len(numbers) == 1 {
			firstNum, _ := strconv.Atoi(numbers[0])
			if firstNum == calibration {
				result += calibration
				continue
			}
		}

		if len(numbers) == 2 {
			concatenated := numbers[0] + numbers[1]
			firstNum, _ := strconv.Atoi(numbers[0])
			secondNum, _ := strconv.Atoi(numbers[1])
			if (firstNum+secondNum) == calibration ||
				firstNum*secondNum == calibration ||
				(part == Part2 && concatenated == splitted[0]) {
				result += calibration
				continue
			}
		}
		var operatingResults = []int{}
		for j := 0; j < len(numbers); j++ {
			current, _ := strconv.Atoi(numbers[j])

			if len(operatingResults) == 0 {
				operatingResults = append(operatingResults, current)
				continue
			}

			var calculatingResults = []int{}
			for k := 0; k < len(operatingResults); k++ {
				calculatingResults = append(calculatingResults, operatingResults[k]+current)
				calculatingResults = append(calculatingResults, operatingResults[k]*current)

				if part == Part2 {
					var currentValueInString = strconv.Itoa(operatingResults[k])
					var concatenated, _ = strconv.Atoi(currentValueInString + numbers[j])
					calculatingResults = append(calculatingResults, (concatenated))
				}
			}
			operatingResults = calculatingResults
		}

		if contains(operatingResults, calibration) {
			result += calibration
		}
	}

	fmt.Println("Part "+string(part)+": ", result)
}

func contains[T comparable](slice []T, value T) bool {
	for _, v := range slice {
		if v == value {
			return true
		}
	}
	return false
}
