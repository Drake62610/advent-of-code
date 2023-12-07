const fs = require('fs')

class Arborescence {
  constructor() {
    this.root = new Directory('/', null)
    this.currentLocation = this.root
    this.dirs = [this.currentLocation]
  }

  main() {
    fs.readFile('./input.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        return
      }

      data.split(/\r?\n/).forEach((element) => {
        // console.log(element + " " + this.currentLocation.name)
        if (element[0] === '$') {
          // console.log('command')
          this.handleCommand(element.slice(2, element.length).split(' '))
          return;
        }
        this.handleFile(element)
      })
      let sum = 0
      // console.log(this.dirs.map(e=>e.getSize()))
      this.dirs.map(e=>e.getSize()).filter(e=>e<=100000).forEach(e=>sum+=e)

      let capacity = 70000000;
      console.log(this.dirs[0].getSize())
      let unused = capacity - this.dirs[0].getSize()
      // unused = 30000000
      console.log(unused)
      // let min = this.dirs[0].parent
      console.log(this.dirs.map(e=>e.getSize()))
      console.log(this.dirs.map(e=>e.getSize()).filter(e=>e>= 30000000 -unused))
      // this.dirs.filter(e=> e.getSize()>unused.forEach(e=>{
      //   if (e.getSize() < min.getSize()) {
      //     min = e
      //   }
      // }))
      // console.log(min.name)
      // console.log(min.getSize())
    })
  }

  handleCommand(command) {
    if (command[0] === 'cd' && command[1] !== '/') {
      if (command[1] == '..') {
        console.log("moving back from "+ this.currentLocation.name + " to " + this.currentLocation.parent.name )
        this.currentLocation = this.currentLocation.parent
        
        return
      }
      this.currentLocation = this.currentLocation.subDir.filter(e => e.name === command[1])[0]
      console.log("moving forward in " + this.currentLocation.name)
      
    }
  }

  handleFile(command) {
    let line = command.split(' ');
    if (line[0] === 'dir') {
      let tmp = new Directory(line[1], this.currentLocation)
      this.currentLocation.subDir.push(tmp)
      this.dirs.push(tmp)
      console.log("found dir in "+ this.currentLocation.name+ " named "+tmp.name)
      return;
    }
    console.log("found file in "+ this.currentLocation.name+ " named " + line[0] + this.currentLocation.name)
    this.currentLocation.files.push(line[0])
  }
}

class Directory {
  constructor(name, parent) {
    this.name = name
    this.parent = parent
    this.files = []
    this.subDir = []
  }

  getSize() {
    let sum = 0;
    this.subDir.forEach(dir => {
      sum +=  dir.getSize()
    }) 
    this.files.forEach(file => {
      sum +=  parseInt(file)
    }) 
    return sum
  }
}

var main = new Arborescence()
main.main()
