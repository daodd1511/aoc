package fileUtils

import (
	"bufio"
	"os"
	"strings"
)

func ReadFileAsLines(filePath string) ([]string, error) {
	file, err := os.Open(filePath)

	if err != nil {
		return nil, err
	}

	defer file.Close()

	var lines []string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}

	if err := scanner.Err(); err != nil {
		return nil, err
	}

	return lines, nil
}

func ExportFile(filePath string, lines [][]string) error {
	file, err := os.Create(filePath)

	if err != nil {
		return err
	}

	defer file.Close()

	for _, line := range lines {
		_, err := file.WriteString(strings.Join(line, "") + "\n")
		if err != nil {
			return err
		}
	}

	return nil
}
