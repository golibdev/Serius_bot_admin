const { Course } = require('../models')
const path = require('path')
const fs = require('fs')

exports.getAll = async (req, res) => {
   try {
      const courses = await Course.find()

      if(!courses) {
         return res.status(404).json({
            message: 'No courses found'
         })
      }

      res.status(200).json({ courses })
   } catch (err) {
      res.status(500).json({ err: err.message })
   }
}

exports.getOne = async (req, res) => {
   try {
      const course = await Course.findById(req.params.id)

      if(!course) {
         return res.status(404).json({
            message: 'No course found'
         })
      }

      res.status(200).json({ course })
   } catch (err) {
      res.status(500).json({ err: err.message })
   }
}

exports.create = async (req, res) => {
   try {
      if(!req.files) {
         return res.status(400).json({
            message: 'Rasm yuklanmadi'
         })
      }

      const image = req.files.image

      if(!image.mimetype.startsWith('image')) {
         return res.status(400).json({
            message: 'Faqat rasm fayllari qabul qilinadi'
         })
      }

      if(image.size > process.env.MAX_FILE_SIZE) {
         return res.status(400).json({
            message: 'Fayl hajmi juda katta'
         })
      }

      image.name = `photo_${new Date().getTime()}${path.parse(image.name).ext}`
      image.mv(`public/uploads/${image.name}`, async err => {
         if(err) {
            return res.status(500).json({
               message: 'Fayl yuklashda xatolik yuz berdi',
               error: err.message
            })
         }
      })

      const {
         title,
         description
      } = req.body

      const newCourse = new Course({
         title,
         description,
         image: `/uploads/${image.name}`
      })

      await newCourse.save();

      res.status(201).json({ course: newCourse, message: 'Course created' })
   } catch (err) {
      res.status(500).json({ err: err.message })
   }
}

exports.update = async (req, res) => {
   try {
      const id = req.params.id
      const course = await Course.findById(id)

      if(!course) {
         return res.status(404).json({
            message: 'No course found'
         })
      }

      if(!req.files) {
         await Course.findByIdAndUpdate(id, req.body)
         return res.status(200).json({
            message: 'Course updated'
         })
      }

      await fs.unlinkSync(`public${course.image}`)
      const image = req.files.image

      if(!image.mimetype.startsWith('image')) {
         return res.status(400).json({
            message: 'Faqat rasm fayllari qabul qilinadi'
         })
      }

      if(image.size > process.env.MAX_FILE_SIZE) {
         return res.status(400).json({
            message: 'Fayl hajmi juda katta'
         })
      }

      image.name = `photo_${new Date().getTime()}${path.parse(image.name).ext}`
      image.mv(`public/uploads/${image.name}`, async err => {
         if(err) {
            return res.status(500).json({
               message: 'Fayl yuklashda xatolik yuz berdi',
               error: err.message
            })
         }
      })

      await Course.findByIdAndUpdate(id, {
         ...req.body,
         image: `/uploads/${image.name}`
      })

      res.status(200).json({
         message: 'Course updated'
      })
   } catch (err) {
      res.status(500).json({ err: err.message })
   }
}

exports.delete = async (req, res) => {
   try {
      const id = req.params.id
      const course = await Course.findById(id)

      if(!course) {
         return res.status(404).json({
            message: 'No course found'
         })
      }

      await fs.unlinkSync(`public${course.image}`)
      await Course.findByIdAndDelete(id)

      res.status(200).json({
         message: 'Course deleted'
      })
   } catch (err) {
      res.status(500).json({ err: err.message })
   }
}