const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  
  data.split(/\r?\n/).forEach(element => {
    let array = [...element]
    for (i=0;i<array.length;i++) {
      let group = []
      for (j=i;j<i+14;j++) {
        if (!array[j]) {
          break;
        }
        group.push(array[j])
      }
      // console.log(group.length)
      let alone = []
      group.forEach(e => {
        alone.push(isAlone(e, group))
      })

      if (!(alone.filter(e=>!e).length > 0)) {
        console.log(group)
        console.log(i+14)
        return;
      }
    }
  }
  );
});

function isAlone(element, array) {
  let occurences = array.map(e => e=== element).filter(e => e);
  return occurences.length === 1
}
