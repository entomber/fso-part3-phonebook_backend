const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const password = process.argv[2]
  const name = process.argv[3]
  const number = process.argv[4]
  const url = `mongodb+srv://fullstack:${password}@cluster0-iatml.mongodb.net/phonebook?retryWrites=true&w=majority`

  mongoose.connect(url, { useNewUrlParser: true })

  const person = new Person({
    name,
    number
  })

  person
    .save()
    .then(() => {
      console.log(`added ${name} number ${number} to phonebook`)
      mongoose.connection.close()
    })

} else if (process.argv.length === 3) {
  const password = process.argv[2]
  const url = `mongodb+srv://fullstack:${password}@cluster0-iatml.mongodb.net/phonebook?retryWrites=true&w=majority`

  mongoose.connect(url, { useNewUrlParser: true })

  Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()
    })

} else {
  console.log('incorrect usage')
  process.exit(1)
}