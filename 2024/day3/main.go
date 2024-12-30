package main

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
)

func main() {
	input, err := os.ReadFile("./input.txt")
	if err != nil {
		fmt.Println("Error reading file:", err)
		return
	}

	part1(string(input))
	part2(string(input))
}

func part1(input string) {
	total := 0
	r := regexp.MustCompile(`mul\(\d+,\d+\)`)
	matches := r.FindAllString(input, -1)

	for _, match := range matches {
		nums := regexp.MustCompile(`\d+`).FindAllString(match, -1)
		num1, _ := strconv.Atoi(nums[0])
		num2, _ := strconv.Atoi(nums[1])
		total += num1 * num2
	}

	fmt.Println("Part 1: ", total)
}

func part2(input string) {
	total := 0
	r := regexp.MustCompile(`mul\(\d+,\d+\)|do(?:n't)?\(\)`)

	matches := r.FindAllString(input, -1)

	shouldDoCommands := true
	for _, match := range matches {
		fmt.Println(match)
		if match == "do()" {
			shouldDoCommands = true
			continue
		} else if match == "don't()" {
			shouldDoCommands = false
			continue
		}

		if shouldDoCommands {
			nums := regexp.MustCompile(`\d+`).FindAllString(match, -1)
			num1, _ := strconv.Atoi(nums[0])
			num2, _ := strconv.Atoi(nums[1])
			total += num1 * num2
		}
	}

	fmt.Println("Part 2: ", total)
}
