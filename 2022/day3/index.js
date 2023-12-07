const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let sum = 0;
  let input = []
  data.split(/\r?\n/).forEach(element => {
    input.push(element)
    
    // console.log(element)
    // let letter = getLetter(element)
    // console.log(letter);
    // sum += convertNumber(letter)
  });

  console.log(input)


  for (i=0; i<input.length/3; i++) {
    let letter = getBadge(input[3 * i], input[3 * i+1], input[3 * i+2])
    sum += convertNumber(letter)
    // console.log(letter)
    // console.log(input[3 * i])
    // console.log(input[3 * i+1])
    // console.log(input[3 * i+2])

  }
  console.log(sum)
});

function getLetter(str) {

    let first = str.substring(0,str.length/2)
    let second = str.substring(str.length/2)
    let max = {champion: first[0], number: 0}

    for (const e of first) {
        occurence = checkOccurrence(second, e);
        if (occurence > max.number) {
            max.champion = e;
            max.number = occurence
        }
    }
    return max.champion
}

function getBadge(first, second, third) {

    for (const letter of first) {
        if (second.includes(letter) && third.includes(letter)) {
            return letter
        }
    }
    throw Error("wtf")
}

function checkOccurrence (array, element) {
    let counter = 0;
    for (item of array) {
        if (item == element) {
            counter++;
        }
    };
    // console.log(element)
    // console.log(counter)
    return counter
};

function convertNumber(letter) {
    if (letter.charCodeAt(0) - 96 > 0) {
        return letter.charCodeAt(0) - 96
    }

    return letter.charCodeAt(0) - 38
}