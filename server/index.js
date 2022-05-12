const  db = require('./db/db')
const PORT = process.env.PORT || 3000
const app = require('./app')
// const seed = require('../script/seed');

const init = async () => {
  try {
    if(process.env.SEED === 'true'){
      await seed();
    }
    else {
      await db.sync()
    }
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
  } catch (ex) {
    console.log(ex)
  }
}

init()

// db.sync()  // sync our database
//   .then(function(){
//     app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`)) // then start listening with our express server once we have synced
//   })