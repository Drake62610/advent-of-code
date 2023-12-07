const fs = require('fs')

class Game {
  constructor() {
    this.monkeyNumber = 8
    this.monkeys = []
  }

  main() {
    let fileContent = fs.readFileSync('input.txt', 'utf8').split(/\r?\n/)
    for (let i = 0; i < this.monkeyNumber; i++) {
      let items = fileContent[1 + 7 * i]
        .split('  Starting items: ')[1]
        .split(', ')
      let operation = fileContent[2 + 7 * i].split('  Operation: new = old ')[1]
      let test = fileContent[3 + 7 * i].split('  Test: divisible by ')[1]
      let monkeyTrue = fileContent[4 + 7 * i].split(
        '    If true: throw to monkey ',
      )[1]
      let monkeyFalse = fileContent[5 + 7 * i].split(
        '    If false: throw to monkey ',
      )[1]

      // console.log(items)
      // console.log(operation)
      // console.log(test)
      // console.log(monkeyTrue)
      // console.log(monkeyFalse)
      this.monkeys.push(
        new Monkey(items, operation, test, monkeyTrue, monkeyFalse),
      )
      // console.log(this.monkeys[this.monkeys.length - 1])
    }

    // Round 1
    const rounds = 10000;

    for (let i = 0; i < rounds; i++) {
      // console.log('*-*-*-*-*-*')
      // console.log('   ROUND ' + i)
      // console.log('*-*-*-*-*-*')
      let count = 0
      this.monkeys.forEach((e) => {
        // console.log('   MONKEY ' + count)

        e.test(this.monkeys)
        // console.log('   ')

        count++
      })

      this.printItems()
      console.log()
    }

    this.printInspect()

    this.monkeys.sort((a, b) => b.inspectNumber - a.inspectNumber);
    console.log(this.monkeys[0].inspectNumber * this.monkeys[1].inspectNumber);
  }



  printItems() {
    let count = 0
    this.monkeys.forEach((e) => {
      console.log('MONKEY ' + count + ' : ' + e.items.join(', '))
      count++
    })
  }

  printInspect() {
    let count = 0

    this.monkeys.forEach((e) => {
      console.log('MONKEY ' + count + ' : ' + e.inspectNumber)
      count++
    })
  }
}

class Monkey {
  constructor(
    items,
    operation,
    testNumber,
    monkeyTrueNumber,
    monkeyFalseNumber,
  ) {
    this.items = items
    this.operation = operation
    this.testNumber = testNumber
    this.monkeyTrueNumber = monkeyTrueNumber
    this.monkeyFalseNumber = monkeyFalseNumber
    this.inspectNumber = 0
  }

  test(monkeys) {


    let modulo = monkeys.reduce((a, b) => a * b.testNumber, 1);

    this.items.forEach((e) => {
      this.inspectNumber++
      // console.log('Inspecting ' + e)
      // Increase Worry
      let item = this.increaseWorry(e)

      // Decrease Worry
      item = Math.floor(item % modulo)
      // console.log('Decreasing worry to ' + item)

      if (item % this.testNumber === 0) {
        // console.log(
        //   item +
        //     ' is divisible by ' +
        //     this.testNumber +
        //     ' throw to ' +
        //     this.monkeyTrueNumber,
        // )
        monkeys[this.monkeyTrueNumber].getItem(item)
      } else {
        // console.log(
        //   item +
        //     ' is not divisible by ' +
        //     this.testNumber +
        //     ' throw to ' +
        //     this.monkeyFalseNumber,
        // )
        monkeys[this.monkeyFalseNumber].getItem(item)
      }
    })

    this.items = []
  }

  getItem(item) {
    this.items.push(item)
  }

  increaseWorry(worry) {
    if (this.operation == '* old') {
      // console.log(
      //   'Worry level is submited to ' +
      //     this.operation +
      //     ' resulting in ' +
      //     eval(worry * worry),
      // )
      return worry * worry
    }

    // console.log(
    //   'Worry level is submited to ' +
    //     this.operation +
    //     ' resulting in ' +
    //     eval(worry + this.operation),
    // )
    return eval(worry + this.operation)
  }
}

var main = new Game()
main.main()
