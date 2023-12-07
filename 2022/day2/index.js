const fs = require('fs');

const rules = {
    'A': 1, // rock
    'B': 2, // paper
    'C': 3, // scisor
    'X': 1, // rock
    'Y': 2, // paper
    'Z': 3, // scisor
}

const win = {
    'A':'Y',
    'B':'Z',
    'C':'X'
  }

const lose = {
    'A':'Z',
    'B':'X',
    'C':'Y'
    }

const tie = {
    'A':'X',
    'B':'Y',
    'C':'Z'
    }



let score = 0

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  data.split(/\r?\n/).forEach(element => {
    element = element.split(' ')
    let adv = element[0];
    let me = element[1];
    console.log(adv)
    console.log(me)

    
    // reasign me
    if (me === 'X') { // egualité
        me = lose[adv]
    }
    else if (me === 'Y') {
        me = tie[adv]
    }
    else if(me === 'Z') {
        me = win[adv]
    }
    console.log(me)
    adv = rules[element[0]];
    me = rules[me]
    
    score += me;
    if (me === adv) { // egualité
        score += 3;
    }
    // win
    else if(me === 1) { 
        if (adv === 3) {
            score += 6;
        }
    }
    else if(me === 2) {
        if (adv === 1) {
            score += 6;
        }
    }
    else if(me === 3) {
        if (adv === 2) {
            score += 6;
        }
    }
    console.log("score")
    console.log(score)
  });
});