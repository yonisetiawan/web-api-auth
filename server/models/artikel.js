const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var artikelSchema = new Schema({
  title: String,
  isi:String,
  author: String
},{
  timestamps: true
})

let Artikel = mongoose.model('Artikel',artikelSchema)
module.exports = Artikel
