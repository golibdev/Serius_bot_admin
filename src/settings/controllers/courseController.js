const axios = require('axios');

exports.getAllCourses = async function() {
   try {
      const res = await axios.get('http://localhost:4002/api/v1/course')
      const courses = res.data.courses

      return courses
   } catch (error) {
      console.log(error)     
   }
}

exports.getCourseById = async function(id) {
   try {
      const res = await axios.get(`http://localhost:4002/api/v1/course/${id}`)
      const course = res.data.course

      return course
   } catch (error) {
      console.log(error)     
   }
}