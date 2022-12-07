const fs = require("fs");
fs.readFile("./input.txt", "utf8", (err, data) => {
    const input = data.split('')
    let ans = 0; 
    const numberOfCharacter = 14;
    const haveDuplicate = (arr) => {
        return arr.some((item, index) => arr.indexOf(item) !== index);
    }
    for (let i = numberOfCharacter; i < input.length; i++) {
        const arr = input.slice(i - numberOfCharacter, i)
        if (!haveDuplicate(arr)) {
            ans = i;
            break
        }
    }
    console.log(ans)
});
