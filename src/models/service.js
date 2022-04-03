const mongoose = require('mongoose')
const { schemaOptions } = require('./schemaOptions')

const serviceSchema = new mongoose.Schema({
   title: { type: String, required: true },
   image: { type: String, required: true },
   description: { type: String, required: true }
}, schemaOptions)

module.exports = mongoose.model("Service", serviceSchema)