const { Service } = require('../models')
const path = require('path')
const fs = require('fs')

exports.getAll = async (req, res) => {
   try {
      const services = await Service.find()

      if(!services) {
         return res.status(404).json({
            message: 'No services found'
         })
      }

      return res.status(200).json({ services })
   } catch (err) {
      res.status(500).json({ err: err.message })
   }
}

exports.getOne = async (req, res) => {
   try {
      const id = req.params.id

      const service = await Service.findById(id)

      if(!service) {
         return res.status(404).json({
            message: 'Service not found'
         })
      }

      return res.status(200).json({ service })
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

      const newServices = new Service({
         title,
         description,
         image: `/uploads/${image.name}`
      })

      await newServices.save();

      res.status(201).json({ service: newServices, message: 'Service created' })
   } catch (err) {
      res.status(500).json({ err: err.message })
   }
}

exports.update = async (req, res) => {
   try {
      const id = req.params.id
      const service = await Service.findById(id)

      if(!service) {
         return res.status(404).json({
            message: 'No service found'
         })
      }

      if(!req.files) {
         await Service.findByIdAndUpdate(id, req.body)
         return res.status(200).json({
            message: 'Service updated'
         })
      }

      await fs.unlinkSync(`public${service.image}`)
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

      await Service.findByIdAndUpdate(id, {
         ...req.body,
         image: `/uploads/${image.name}`
      })

      res.status(200).json({
         message: 'Service updated'
      })
   } catch (err) {
      res.status(500).json({ err: err.message })
   }
}

exports.delete = async (req, res) => {
   try {
      const id = req.params.id
      const service = await Service.findById(id)

      if(!service) {
         return res.status(404).json({
            message: 'No service found'
         })
      }

      await fs.unlinkSync(`public${service.image}`)
      await Service.findByIdAndDelete(id)

      res.status(200).json({
         message: 'Service deleted'
      })
   } catch (err) {
      res.status(500).json({ err: err.message })
   }
}