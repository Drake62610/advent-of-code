const fs = require('fs')

class Rope {
  constructor() {
    this.x = 1
    this.cycle = [1]
    this.width = 40
  }

  main() {
    fs.readFile('./input.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        return
      }

      data.split(/\r?\n/).forEach((element) => {
        let cmd = element.split(' ')

        if (cmd[0] === 'addx') {
          this.addx(parseInt(cmd[1]))
        }

        if (cmd[0] === 'noop') {
          this.noop()
        }
      })

      // PART 1
      let sum = []
      sum.push(this.cycle[20 - 1] * 20)
      sum.push(this.cycle[60 - 1] * 60)
      sum.push(this.cycle[100 - 1] * 100)
      sum.push(this.cycle[140 - 1] * 140)
      sum.push(this.cycle[180 - 1] * 180)
      sum.push(this.cycle[220 - 1] * 220)
      // console.log(this.cycle.slice(218))
      // console.log(sum)
      // console.log(sum.reduce((accumulator, currentValue) => accumulator + currentValue, 0))

      // PART 2
      let CRT = this.computeCRT()
      this.printCRT(CRT)
    })
  }

  noop() {
    this.cycle.push(this.x)
  }

  addx(v) {
    this.cycle.push(this.x)
    this.x = this.x + v
    this.cycle.push(this.x)
  }

  computeCRT() {
    let CRT = []

    for (let i=0;i<this.cycle.length;i++) {
      let x = this.cycle[i]
      let CRTStep = i % this.width

      // if (i === 0) {
      //   console.log(x)
      // }

      if (CRTStep === x || CRTStep === x-1 || CRTStep === x+1) {
        CRT.push('#')
      }
      else {
        CRT.push('.')
      }
    }

    return CRT
  }

  printCRT(CRT) {
    let tmp = ''
    let count = 0
    CRT.forEach(e=> {
      if(count % 40 === 0) {
        console.log(tmp)
        tmp = ''
      }
      tmp += e
      count++
    })

  }
}

var main = new Rope()
main.main()
