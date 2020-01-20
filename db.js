const db = require('mongoose')
db.Promise = global.Promise
//'mongodb+srv://esteban:esteban@cluster0-se3yg.mongodb.net/telegram'
async function connect(url) {
   await db.connect(url, {
    useUnifiedTopology: true, useNewUrlParser: true
  })

  console.log('[DB] Conectada correctamente')
}

module.exports = connect