const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const stackLength = 9;
  let stacks = [];
  for (i=0;i<stackLength;i++){
    stacks.push([]);
  }
  let inputRead = true
  let instructionStart = false
  data.split(/\r?\n/).forEach(element => {
    let i=1;
    if (element[1] === '1') {
        inputRead = false
        stacks.forEach(e => e.reverse())
    }

    if (element === '') {
        instructionStart = true;
        return;
    }

    if (inputRead) {
        while (i<stackLength*4){
            if (element[i] !== " ") {
                stacks[i==1 ? 0 : (i-1) /4].push(element[i])
            }
            i+=4;
        }
    }

    if (instructionStart) {
        // get command
        let command = []; // number to move, from, destination
        let move = []
        command.push(parseInt(element.split('move ')[1].split(' from ')[0]))
        command.push(parseInt(element.split(' from ')[1].split(' to ')[0]))
        command.push(parseInt(element.split(' to ')[1]))

        // run command
        if(stacks[command[1]-1].length > command[0]) { //if too much then don't slice
            move = stacks[command[1]-1].splice(stacks[command[1]-1].length - command[0],stacks[command[1]-1].length)
            // console.log('cut');
            // console.log(move);
        } else {
            move = stacks[command[1]-1];
            // console.log('all');
            // console.log(move);
            stacks[command[1]-1] = []
        }

        stacks[command[2]-1] = stacks[command[2]-1].concat(move)
        // console.log(stacks)

    }
  });
  console.log(stacks)
  let solution =''
  stacks.forEach(e => solution = solution + ((e[e.length-1])))
  console.log(solution)
});
