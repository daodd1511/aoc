package main

import (
	"fileUtils"
	"fmt"
	"strconv"
)

type DiskMap struct {
	amount      int
	id          int
	freeSpace   int
	movedBlocks []int
}

func main() {
	input, err := fileUtils.ReadFileAsLines("./input.txt")
	// input, err := fileUtils.ReadFileAsLines("./example.txt")
	if err != nil {
		fmt.Println("Error reading file:", err)
		return
	}

	solve(input)
}

func solve(input []string) {
	diskMap := []DiskMap{}
	idCount := 0
	emptySpaces := 0
	for pos, char := range input[0] {
		if pos%2 == 0 {
			current, _ := strconv.Atoi(string(char))
			diskMap = append(diskMap, DiskMap{
				amount:    current,
				id:        idCount,
				freeSpace: 0,
			})

			idCount++
		} else {
			current, _ := strconv.Atoi(string(char))
			diskMap[len(diskMap)-1].freeSpace += current
			emptySpaces += current
		}
	}
	// pendingMoveBlock := []int{len(diskMap) - 1, 0}
	// tempAmount := 0
	// for i := 0; i < len(diskMap); i++ {
	// 	for j := 0; j < diskMap[i].freeSpace; j++ {
	// 		if pendingMoveBlock[1] >= diskMap[pendingMoveBlock[0]].amount {
	// 			diskMap = removeValue(diskMap, diskMap[pendingMoveBlock[0]])
	// 			pendingMoveBlock[0]--
	// 			pendingMoveBlock[1] = 1
	// 			tempAmount = diskMap[pendingMoveBlock[0]].amount
	// 		} else {
	// 			pendingMoveBlock[1]++
	// 			tempAmount--
	// 		}
	// 		if i >= len(diskMap)-1 {
	// 			break
	// 		}
	// 		moveBlock := diskMap[pendingMoveBlock[0]]
	// 		if moveBlock.id != diskMap[i].id {
	// 			diskMap[i].movedBlocks = append(diskMap[i].movedBlocks, moveBlock.id)
	// 		}
	// 	}
	// }
	// diskMap[len(diskMap)-1].amount = tempAmount
	for i := len(diskMap) - 1; i >= 0; i-- {
		for j := 0; j < i; j++ {
			if diskMap[j].freeSpace >= diskMap[i].amount {
				value := []int{}
				for j := 0; j < diskMap[i].amount; j++ {
					value = append(value, diskMap[i].id)
				}

				diskMap[j].movedBlocks = append(diskMap[j].movedBlocks, value...)
				diskMap[j].freeSpace -= diskMap[i].amount

				diskMap[i-1].freeSpace += diskMap[i].amount
				if len(diskMap[i].movedBlocks) > 0 {
					diskMap[i].amount = len(diskMap[i].movedBlocks)
					diskMap[i].id = diskMap[i].movedBlocks[0]
					diskMap[i].movedBlocks = []int{}
				} else {
					diskMap[i-1].freeSpace += diskMap[i].freeSpace
					diskMap = removeValue(diskMap, diskMap[i])
					break
				}
			}
		}
	}

	result := 0
	index := 0
	for i := 0; i < len(diskMap); i++ {
		for j := 0; j < diskMap[i].amount; j++ {
			result += index * diskMap[i].id
			index++
		}

		for k := 0; k < len(diskMap[i].movedBlocks); k++ {
			result += (index) * diskMap[i].movedBlocks[k]
			index++
		}
		index += diskMap[i].freeSpace
	}
	print(result)
}

func print(input ...any) {
	fmt.Println(input...)
}

func removeValue(slice []DiskMap, value DiskMap) []DiskMap {
	for i, v := range slice {
		if v.id == value.id {
			return append(slice[:i], slice[i+1:]...) // Remove element
		}
	}
	return slice // Return unchanged if value is not found
}
