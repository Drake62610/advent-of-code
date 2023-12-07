const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let selfContained = 0;
  data.split(/\r?\n/).forEach(element => {
    let first = getInput(element.split(',')[0])
    let second = getInput(element.split(',')[1])
    
    if (checkOverlap(first,second)) {
        selfContained +=1
        return;
    } else {
        console.log(first);
        console.log(second);
        console.log("------")
    }
  });
  console.log(selfContained)
});


function getInput(element) {
    let result = element.split('-')
    result = result.map(e => parseInt(e))
    return result
}

function checkContained(first, second) {
    if (first[0] === second[0]) { // equality case on first number, exchange if the second is not the biggest
        return true
    }

    if (first[0]- second[0] > 0) { // we want to first group to have the min to start
        // console.log("invert")
        return checkContained(second,first)
    }
    
    return (first[1]>=second[1])
}

function checkOverlap(first, second) {
    if (first[0] === second[0] || first[1] === second[1] || first[1] === second[0] || first[0] === second[1]) { // equality case on first number, exchange if the second is not the biggest
        return true
    }

    if (first[0]- second[0] > 0) { // we want to first group to have the min to start
        console.log("invert")
        return checkOverlap(second,first)
    }
    return (first[1]>second[0])
}