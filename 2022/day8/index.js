const fs = require('fs')

const firstLine= "012210012213303320303222443113334342210313303454311331225110130030424212142031302213330002110012202"

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  let width = firstLine.length
  // let width = 5
  let array = []
  let scenic = []
  for (z = 0; z < width; z++) {
    array.push([])
    scenic.push([])
  }
  let i = 0
  data.split(/\r?\n/).forEach((element) => {
    let j = 0
    ;[...element].forEach((e) => {
      array[i][j] = e
      j++
    })
    i++
  })

 
  for (i=0;i<array.length;i++) {
    for (j=0;j<array.length;j++) {
      let up = 1
      let down = 1
      let left = 1
      let right = 1
      // up
      let y = -1
      let x = 0
      while (array[i+y] && array[i][j]> array[i+y][j+x]) {
        y--
        up++
      }
      if (!array[i+y]) {
        up--
      }
      // down
      y = 1
      x = 0
      while (array[i+y] && array[i][j]> array[i+y][j+x]) {
        y++
        down++
      }
      if (!array[i+y]) {
        down--
      }
      // right
      y = 0
      x = 1
      while (array[i+y][j+x] && array[i][j]> array[i+y][j+x]) {
        x++
        right++
      }
      if (!array[i+y][j+x]) {
        right--
      }
      // left
      y = 0
      x = -1
      // if (i===1 && j===2) {
      //   console.log(array[i+y][j+x])
      //   }
      
      while (array[i+y][j+x] && array[i][j]> array[i+y][j+x]) {
        if (i===1 && j===2) {
          // console.log("hey")
          // console.log(array[i+y][j+x])
          }
        x--
        left++
      }
      if (!array[i+y][j+x]) {
        left--
      }
      // if (up === 0) {
      //   scenic[i][j] = 0
      //   return
      // }
      if (i===1 && j===2) {
        // console.log(array[i][j])
        // console.log(up)
        // console.log(left)
        // console.log(right)
        // console.log(down)
      }
      scenic[i][j] = up * down * right * left
    }
  }
  let max = 0
  scenic.forEach(e=> {
    e.forEach(r=> {
      if (max < r) {
        max = r++
      }
    })
  })
  console.log(max)

  // PART ONE
  // array = convert(array)
  // array = iterateLists(array)
  // array = iterateLists(array.map(e=>e.reverse()))
  // array = iterateFromTop(array)
  // let sum=0
  // array.forEach(e=> {
  //   e.forEach(r=> {
  //     if (r.visible) {
  //       sum++
  //     }
  //   })
  // })
  // console.log(sum)
})


function iterateLists(array) {
  array.forEach((e) => {
    max = e[0].value
    let i = 0;
    e.forEach((number) => {
      if (number.value > max || i==0) {
        max = number.value
        number.visible = true
      }
      // return { value: number, visible: false }
      i++;
    })
  })
  return array
}

function iterateFromTop(array) {
  for (i=0;i<array.length;i++) {
    let max = array[0].value
    for (j=0;j<array.length;j++) {
      if (array[j][i].value > max || j==0) {
        max = array[j][i].value
        array[j][i].visible = true
      }
    }
  }

  for (i=0;i<array.length;i++) {
    let max = array[0].value
    for (j=0;j<array.length;j++) {
      // console.log(array[array.length-j-1][i].value)
      if (array[array.length-j-1][i].value > max || j==0) {
        max = array[array.length-j-1][i].value
        array[array.length-j-1][i].visible = true
      }
    }
  }
  
  return array
}

function convert(array) {
  return array.map((e) => {
    return e.map((number) => {
      return { value: number, visible: false }
    })
  })
}
