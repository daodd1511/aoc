package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile("./input.txt")
	if err != nil {
		fmt.Println("Error reading file:", err)
		return
	}

	part1(string(input))
}

type Rule struct {
	ahead  []int
	behind []int
}

func part1(input string) {
	splitted := strings.Split(string(input), "\n\n")
	rules := splitted[0]
	updates := strings.Split(splitted[1], "\n")
	rulesMap := make(map[int]Rule)
	splittedRules := strings.Split(rules, "\n")

	for i := 0; i < len(splittedRules); i++ {
		// Rule has format like "35|20, 35 is ahead of 20 and 20 is behind 35"
		splittedRule := strings.Split(splittedRules[i], "|")
		ahead, _ := strconv.Atoi(splittedRule[0])
		behind, _ := strconv.Atoi(splittedRule[1])

		// Idea is to store ahead and behind in a map
		// Ahead key in map will append behind values
		// Behind key in map will append ahead values
		// So only need to loop once.

		// Push behind values to ahead key
		if rule, ok := rulesMap[ahead]; ok {
			rule.behind = append(rule.behind, behind)
			rulesMap[ahead] = rule
		} else {
			rulesMap[ahead] = Rule{ahead: []int{}, behind: []int{behind}}
		}

		// Push ahead values to behind key
		if rule, ok := rulesMap[behind]; ok {
			rule.ahead = append(rule.ahead, ahead)
			rulesMap[behind] = rule
		} else {
			rulesMap[behind] = Rule{ahead: []int{ahead}, behind: []int{}}
		}
	}

	var result int

	for i := 0; i < len(updates); i++ {
		updateRow := strings.Split(updates[i], ",")
		isBreakRule := false

		for j := 0; j < len(updateRow)-1; j++ {
			current, _ := strconv.Atoi(updateRow[j])
			for k := j + 1; k < len(updateRow); k++ {
				compareVal, _ := strconv.Atoi(updateRow[k])
				if rule, ok := rulesMap[current]; ok {
					for _, ahead := range rule.ahead {
						if ahead == compareVal {
							isBreakRule = true
							continue
						}
					}
				}
			}
		}
		if !isBreakRule {
			middleVal, _ := strconv.Atoi(updateRow[len(updateRow)/2])
			result += middleVal
		}
	}
	fmt.Println("Part 1: ", result)
}
