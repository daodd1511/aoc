const fs = require("fs");
fs.readFile("./input.txt", "utf8", (err, data) => {
    const input = data.split("\n");
    const grouped = input.map(i => i.split(','));
    let overlapPairs = 0;
    grouped.forEach(group => {
        firstElf = group[0];
        secondElf = group[1];
        const isFirstElfContain = parseInt(firstElf.split('-')[0], 10) <= parseInt(secondElf.split('-')[0], 10) && parseInt(firstElf.split('-')[1], 10) >= parseInt(secondElf.split('-')[1], 10);
        const isSecondElfContain = parseInt(secondElf.split('-')[0], 10) <= parseInt(firstElf.split('-')[0], 10) && parseInt(secondElf.split('-')[1], 10) >= parseInt(firstElf.split('-')[1], 10);
        if (isFirstElfContain || isSecondElfContain) {
            overlapPairs++;
        }
    })
    console.log(overlapPairs);
})