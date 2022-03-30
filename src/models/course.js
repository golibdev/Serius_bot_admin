const mongoose = require('mongoose')
const { schemaOptions } = require('./schemaOptions')

const courseSchema = new mongoose.Schema({
   title: { type: String, required: true },
   image: { type: String, required: true },
   description: { type: String, required: true }
}, schemaOptions)

module.exports = mongoose.model("Course", courseSchema)