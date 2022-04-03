const axios = require('axios');

exports.getAllServices = async function() {
   try {
      const res = await axios.get('http://localhost:4002/api/v1/service')
      const services = res.data.services

      return services
   } catch (error) {
      console.log(error)     
   }
}

exports.getServicesById = async function(id) {
   try {
      const res = await axios.get(`http://localhost:4002/api/v1/service/${id}`)
      const service = res.data.service

      return service
   } catch (error) {
      console.log(error)     
   }
}