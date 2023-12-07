const fs = require('fs');

function isNumber(char) {
    return !isNaN(parseInt(char));
  }

// Chemin du fichier à lire
const cheminFichier = 'input.txt';
const writenNum = ['oneight', 'twone', 'threeight', 'fiveight', 'sevenine','eightwo', 'eighthree', 'nineight', 'eight', 'two','one', 'three', 'four', 'five', 'six', 'seven', 'ineigh', 'nine'];
const convertor = {
    'one': '1',
    'eight': '8',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    "oneight": "18",
    "twone": "21",
    "threeight": "38",
    "fiveight": "58",
    "sevenine": "79",
    "eightwo": "82",
    "eighthree": "83",
    "nineight": "98",
  };
  

fs.readFile(cheminFichier, 'utf8', (err, data) => {
  if (err) {
    console.error("Erreur de lecture du fichier :", err);
    return;
  }

  const lignes = data.split('\n');
  const numbers = []
  lignes.forEach((ligne) => {
    let tmp = '';

    // Detect one, two
    writenNum.forEach((num) => {
        if (ligne.includes(num)) {
            ligne = ligne.replace(num, convertor[num]);
        }
    })

    Array.from(ligne).some((char) => {
        if (isNumber(char)) {
            tmp = char
            return true;
        }
    })
    Array.from(ligne).reverse().some((char) => {
        
        if (isNumber(char)) {
            tmp = tmp + char
            return true;
        }
    })
    numbers.push(tmp)

  });

  const sum = numbers.reduce((accumulator, currentValue) => {
    return accumulator + Number(currentValue);
  }, 0);
  console.log(sum)
});

