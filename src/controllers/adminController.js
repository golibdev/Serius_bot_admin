const CryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')
const { Admin } = require('../models')

exports.login = async (req, res) => {
   try {
      const {
         username,
         password
      } = req.body

      const admin = await Admin.findOne({ username: username })

      if(!admin) return res.status(401).json({ message: "Ma'lumot mos kelmadi" })

      const decryptPass = CryptoJs.AES.decrypt(
         admin.password,
         process.env.PASSWORD_SECRET_KEY
      ).toString(CryptoJs.enc.Utf8)

      if(password !== decryptPass) return res.status(401).json({ message: "Ma'lumot mos kelmadi" })

      const token = jwt.sign({
         id: admin._id
      }, process.env.TOKEN_SECRET_KEY)
      admin.password = undefined

      res.status(200).json({
         token,
         admin
      })
   } catch (err) {
      console.log(err)
      res.status(500).json({
         err: err.message
      })
   }
}