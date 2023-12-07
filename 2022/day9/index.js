const fs = require('fs')

class Rope {
  constructor() {
    this.plateau = []
    this.width = 25
    this.height = 25
    this.head = [
      Math.floor((this.height - 1) / 2),
      Math.floor((this.width - 1) / 2),
    ]
    this.tail = [
      Math.floor((this.height - 1) / 2),
      Math.floor((this.width - 1) / 2),
    ]
    this.rope = []
    this.node = 10
  }

  main() {
    for (let z = 0; z < this.node; z++) {
      this.rope.push([Math.floor((this.height-1)/2), Math.floor((this.width-1)/2)])
      // this.rope.push([this.height - 1, 0])
    }

    for (let i = 0; i < this.height; i++) {
      let tmp = []
      for (let j = 0; j < this.width; j++) {
        tmp.push({ sign: '.', rope: false })
      }
      this.plateau.push(tmp)
    }
    // Initialize first position of tail
    this.plateau[this.rope[this.node - 1][0]][
      this.rope[this.node - 1][1]
    ].rope = true

    fs.readFile('./input.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        return
      }

      data.split(/\r?\n/).forEach((element) => {
        // console.log('*************')
        // console.log(element)
        // console.log('*************')

        let cmd = element.split(' ')
        let step = parseInt(cmd[1])
        if (cmd[0] === 'U') {
          for (let i = 0; i < step; i++) {
            this.up()
          }
        }
        if (cmd[0] === 'D') {
          for (let i = 0; i < step; i++) {
            this.down()
          }
        }
        if (cmd[0] === 'R') {
          for (let i = 0; i < step; i++) {
            this.right()
          }
        }
        if (cmd[0] === 'L') {
          for (let i = 0; i < step; i++) {
            this.left()
          }
        }

        this.plateau[this.rope[this.node - 1][0]][
          this.rope[this.node - 1][1]
        ].rope = true

        this.printStep()
      })
      // this.printRope()
    })
  }

  printStep() {
    for (let z = 0; z < this.node; z++) {
      this.plateau[this.rope[z][0]][this.rope[z][1]].sign =
        z === 0 ? 'H' : z.toString()
      // this.rope.push([Math.floor((this.height-1)/2), Math.floor((this.width-1)/2)])
    }

    // this.plateau[this.tail[0]][this.tail[1]].sign = 'T'
    // this.plateau[this.head[0]][this.head[1]].sign = 'H'
    // PRINT
    for (let i = 0; i < this.height; i++) {
      console.log(this.plateau[i].map((e) => e.sign).join(''))
    }

    for (let z = 0; z < this.node; z++) {
      this.plateau[this.rope[z][0]][this.rope[z][1]].sign = '.'
    }
    console.log('********')
  }

  printRope() {
    let tmp = 0
    for (let i = 0; i < this.height; i++) {
      console.log(this.plateau[i].map((e) => (e.rope ? '$' : '.')).join(''))
      for (let j = 0; j < this.width; j++) {
        if (this.plateau[i][j].rope) {
          tmp++
        }
      }
    }
    console.log(tmp)
  }

  up() {
    this.rope[0] = [this.rope[0][0] - 1, this.rope[0][1]]
    this.extendRope()
  }
  right() {
    this.rope[0] = [this.rope[0][0], this.rope[0][1] + 1]
    this.extendRope()
  }
  left() {
    this.rope[0] = [this.rope[0][0], this.rope[0][1] - 1]
    this.extendRope()
  }
  down() {
    this.rope[0] = [this.rope[0][0] + 1, this.rope[0][1]]
    this.extendRope()
  }

  extendRope() {
    const clone = this.rope.slice()
    for (let z = 1; z < this.node; z++) {
      // console.log(z)
      // console.log(this.rope[z-1])
      // console.log(this.rope[z])
      if (z === 1) {
        this.rope[z] = this.checkTail(this.rope[z - 1], this.rope[z])

        continue
        // console.log(this.isAdj(this.rope[z-1], this.rope[z]))
        // console.log(this.checkTail(this.rope[z-1], this.rope[z]))
      }
      this.rope[z] = clone[z - 1]
    }
  }

  checkTail(head, tail) {
    if (!this.isAdj(head, tail, true)) {
      const possiblePosition = []
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (
            (i === 0 && j === 0) ||
            tail[0] + i < 0 ||
            tail[1] + j < 0 ||
            tail[0] + i > this.height - 1 ||
            tail[1] + j > this.width - 1
          ) {
            continue
          }
          possiblePosition.push([tail[0] + i, tail[1] + j])
        }
      }

      for (let tmp of possiblePosition) {
        // console.log(tmp)
        // console.log(this.head)
        // console.log(this.isAdj(this.head, tmp, false))
        // console.log('--')

        if (this.isAdj(head, tmp, false)) {
          // change that /!\
          this.plateau[tmp[0]][tmp[1]].rope = true
          return tmp
        }
      }
      return tail
    }
    return tail
  }

  isAdj(a, b, diag) {
    const x1 = a[0]
    const y1 = a[1]
    const x2 = b[0]
    const y2 = b[1]

    if (x1 == x2 && Math.abs(y1 - y2) === 1) {
      return true
    }

    if (y1 == y2 && Math.abs(x1 - x2) === 1) {
      return true
    }

    if (Math.abs(x1 - x2) === Math.abs(y1 - y2) && diag) {
      return true
    }
    return false
  }
}

var main = new Rope()
main.main()
