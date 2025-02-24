package main

import (
	"fileUtils"
	"fmt"
	"strconv"
	"strings"
	"sync"
)

type Part string

const (
	Part1 = "one"
	Part2 = "two"
)

type Stone struct {
	value      int
	isZero     bool
	isEvenChar bool
}

var (
	cache   = make(map[string]int) // Cache results using a unique key
	cacheMu sync.Mutex             // Mutex for concurrent access
)

// Generate a unique key for caching based on Stone and iteration
func cacheKey(stone Stone, iter int) string {
	return strconv.Itoa(stone.value) + "-" + strconv.Itoa(iter)
}

// Cached version of improvedEngraveStone
func cachedImprovedEngraveStone(stone Stone, iter int, maxIter int, result *int) int {
	key := cacheKey(stone, iter)

	// Check cache first
	cacheMu.Lock()
	if cachedResult, found := cache[key]; found {
		cacheMu.Unlock()
		fmt.Println("Cache hit:", key, "=>", cachedResult)
		return cachedResult
	}
	cacheMu.Unlock()

	// Compute if not in cache
	computedValue := improvedEngraveStone(stone, iter, maxIter, result)

	// Store in cache
	cacheMu.Lock()
	cache[key] = computedValue
	cacheMu.Unlock()

	return computedValue
}

func main() {
	input, err := fileUtils.ReadFileAsLines("./input.txt")
	// input, err := fileUtils.ReadFileAsLines("./example.txt")
	if err != nil {
		print("Error reading file:", err)
		return
	}

	solve(input, Part1)
}

func solve(input []string, part Part) {

	var wg sync.WaitGroup
	semaphore := make(chan struct{}, 4) // Limit to 4 concurrent workers
	num_of_iterations := 25
	stones := strings.Split(input[0], " ")
	result := len(stones)
	// for i := 0; i < num_of_iterations; i++ {
	// 	new_stones := []string{}
	// 	for _, s := range stones {
	// 		stone, _ := strconv.Atoi(s)
	// 		new_stones = append(new_stones, engraveStone(stone)...)
	// 	}
	// 	stones = new_stones
	// }

	for _, s := range stones {
		stone, _ := strconv.Atoi(s)
		print("Engraving stone:", stone)
		wg.Add(1)
		semaphore <- struct{}{}

		go func(stone int) {
			defer wg.Done()
			defer func() { <-semaphore }() // Release slot

			cachedImprovedEngraveStone(Stone{
				value:      stone,
				isZero:     stone == 0,
				isEvenChar: len(strconv.Itoa(stone))%2 == 0,
			}, 0, num_of_iterations, &result)
		}(stone)
	}
	if part == Part1 {
		wg.Wait()
		print("Part", part, ":", result)
	}
}

func engraveStone(value int) []string {
	/*
		Rules:
			-If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
			-If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. The left half of the digits are engraved on the new left stone, and 	the right half of the digits are engraved on the new right stone. (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
			-If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.
	*/
	if value == 0 {
		return []string{"1"}
	}

	strVal := strconv.Itoa(value)
	if len(strVal)%2 == 0 {
		left, _ := strconv.Atoi(strVal[:len(strVal)/2])
		right, _ := strconv.Atoi(strVal[len(strVal)/2:])
		return []string{strconv.Itoa(left), strconv.Itoa(right)}
	}

	return []string{strconv.Itoa(value * 2024)}
}

func improvedEngraveStone(stone Stone, iter int, maxIter int, result *int) int {
	fmt.Println("Processing:", stone.value, " Iter:", iter, "Result:", *result)

	if iter >= maxIter {
		return 0
	}
	if stone.isZero {
		newStone := Stone{value: 1, isZero: false, isEvenChar: false}
		return cachedImprovedEngraveStone(newStone, iter+1, maxIter, result)
	}
	if stone.isEvenChar {
		strVal := strconv.Itoa(stone.value)
		left, _ := strconv.Atoi(strVal[:len(strVal)/2])
		right, _ := strconv.Atoi(strVal[len(strVal)/2:])

		leftStone := Stone{value: left, isZero: left == 0, isEvenChar: len(strconv.Itoa(left))%2 == 0}
		rightStone := Stone{value: right, isZero: right == 0, isEvenChar: len(strconv.Itoa(right))%2 == 0}

		*result++
		return cachedImprovedEngraveStone(leftStone, iter+1, maxIter, result) +
			cachedImprovedEngraveStone(rightStone, iter+1, maxIter, result)
	}

	mul := stone.value * 2024
	newStone := Stone{value: mul, isZero: mul == 0, isEvenChar: len(strconv.Itoa(mul))%2 == 0}

	return cachedImprovedEngraveStone(newStone, iter+1, maxIter, result)
}

func print(input ...any) {
	fmt.Println(input...)
}
