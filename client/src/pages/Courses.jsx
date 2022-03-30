import React, { useState, useEffect } from 'react'
import { PageTitle } from '../components/PageTitle/PageTitle'
import { courseApi } from '../api/courseApi'
import { toast } from 'react-toastify'
import { Loader } from '../components/Loader/Loader'

export const Courses = () => {
   const [courses, setCourses] = useState([])
   const [loading, setLoading] = useState(false)

   const getAll = async () => {
      try {
         const res = await courseApi.getAll()
         setCourses(res.data.courses.reverse())
         setLoading(true)
      } catch (err) {}
   }

   useEffect(() => {
      getAll()
   }, [])
   return (
      <div>
         {loading ? (
            <>
               <div className='d-flex align-items-center justify-content-between'>
                  <PageTitle  title={'Kurslar'} />
                  <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#createCourse">
                     <i className='fas fa-plus-circle'></i>
                  </button>
                  <CreateCourse />
               </div>
               <div className='row'>
                  {courses.length > 0 ? (
                     courses.map(course => <RenderCourse key={course._id} course={course} />)
                  ): (
                     <div className='text-center'>
                        <h3>Kurslar mavjud emas</h3>
                     </div>
                  )}
               </div>
            </>
         ): (
            <Loader/>
         )}
      </div>
   )
}

const CreateCourse = () => {
   const [title, setTitle] = useState('')
   const [image, setImage] = useState('')
   const [description, setDescription] = useState('')

   const handleSubmit = (e) => {
      e.preventDefault()

      const check = {
         title: title.trim().length === 0,
         description: description.trim().length === 0
      }

      if (check.title || check.description) {
         toast.error('Please fill all fields')
      }

      const data = new FormData()
      data.append('title', title)
      data.append('image', image)
      data.append('description', description)

      try {
         courseApi.create(data)
         toast.success('Course created')

         setTimeout(() => {
            window.location.reload()
         }, 1000);
      } catch (err) {
         console.log(err);
      }
   }
   return (
      <div className="modal fade" id="createCourse" tabIndex="-1" aria-labelledby="exampleModalLabel">
         <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
               <div className="modal-header">
                  <h5 className="modal-title text-primary fw-bold text-uppercase" id="exampleModalLabel">Create Course</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
               <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                     <div className='mb-1'>
                        <label htmlFor="title" className='card-title mb-0 mt-0 d-block text-start'>Course Title</label>
                        <input type="text" id='title' placeholder='Course title' className='form-control' value={title} onChange={e => setTitle(e.target.value)} />
                     </div>
                     <div className='mb-1'>
                        <label htmlFor="image" className='card-title mb-0 mt-0 d-block text-start'>Course Image</label>
                        <input type="file" id='image' className='form-control' onChange={e => setImage(e.target.files[0])} />
                     </div>
                     <div className='mb-3'>
                        <label htmlFor="description" className='card-title mb-0 mt-0 d-block text-start'>Course Description</label>
                        <textarea className='form-control' rows="10" id='description' onChange={e => setDescription(e.target.value)}></textarea>
                     </div>
                     <button className='btn btn-primary'>
                        <i className='fas fa-plus-circle me-2'></i>
                        <span>Create Course</span>
                     </button>
                  </form>
               </div>
               <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
               </div>
            </div>
         </div>
      </div>
   )
}

const RenderCourse = ({ course }) => {
   const [updateTitle, setUpdateTitle] = useState(course.title)
   const [updateDescription, setUpdateDescription] = useState(course.description)
   const [updateImage, setUpdateImage] = useState(course.image)
   const deleteHandler = async (e, id) => {
      try {
         const res = await courseApi.delete(id)
         toast.success(res.data.message)

         setTimeout(() => {
            window.location.reload()
         }, 1000);
      } catch (err) {}
   }

   const updateHandler = async (e, id) => {
      e.preventDefault()

      const check = {
         title: updateTitle.trim().length === 0,
         description: updateDescription.trim().length === 0
      }

      if (check.title || check.description) {
         toast.error('Please fill all fields')
      }

      const data = new FormData()
      data.append('title', updateTitle)
      data.append('image', updateImage)
      data.append('description', updateDescription)

      try {
         courseApi.update(id, data)
         toast.success('Updated')

         setTimeout(() => {
            window.location.reload()
         }, 1000);
      } catch (err) {
         console.log(err);
      }
   }
   return (
      <div className="col-lg-3 col-md-4 col-sm-6 col-12">
         <div className="card">
            <div className='card-header'>
               <p className='card-title mb-0 mt-0'>{course.title}</p>
            </div>
            <div className="card-body">
               <img src={`http://localhost:4002${course.image}`} className="w-100 img-fluid" alt="image" />
            </div>
            <div className='card-footer'>
               <button className='btn btn-danger me-3' data-bs-toggle="modal" data-bs-target={`#delete${course._id}`}>
                  <i className='fas fa-trash-alt'></i>
               </button>
               <div className="modal fade" id={`delete${course._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                     <div className="modal-content">
                        <div className="modal-header">
                           <h5 className="modal-title" id="exampleModalLabel">
                              {/* question delete course */}
                              Are you sure you want to delete this course?
                           </h5>
                           <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                           <button type="button" className="btn btn-success me-3" data-bs-dismiss="modal">No</button>
                           <button className='btn btn-danger' onClick={(e) => {
                              deleteHandler(e, course._id)
                           }}>Yes</button>
                        </div>
                     </div>
                  </div>
               </div>
               <button className='btn btn-warning text-white' data-bs-toggle="modal" data-bs-target={`#update${course._id}`}>
                  <i className='fas fa-pen-alt'></i>
               </button>
               <div className="modal fade" id={`update${course._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-lg">
                     <div className="modal-content">
                        <div className="modal-header">
                           <h5 className="modal-title" id="exampleModalLabel">
                              Update Course
                           </h5>
                           <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                           <form onSubmit={e => {
                              updateHandler(e, course._id)
                           }}>
                              <div className='mb-1'>
                                 <label htmlFor="title" className='card-title mb-0 mt-0 d-block text-start'>Course Title</label>
                                 <input type="text" id='title' placeholder='Course title' className='form-control' value={updateTitle} onChange={e => setUpdateTitle(e.target.value)} />
                              </div>
                              <div className='mb-1'>
                                 <label htmlFor="image" className='card-title mb-0 mt-0 d-block text-start'>Course Image</label>
                                 <input type="file" id='image' className='form-control' onChange={e => setUpdateImage(e.target.files[0])} />
                              </div>
                              <div className='mb-3'>
                                 <label htmlFor="description" className='card-title mb-0 mt-0 d-block text-start'>Course Description</label>
                                 <textarea className='form-control' rows="10" id='description' onChange={e => setUpdateDescription(e.target.value)} defaultValue={updateDescription}></textarea>
                              </div>
                              <button className='btn btn-success'>
                                 <i className='fas fa-plus-circle me-2'></i>
                                 <span>Save update</span>
                              </button>
                           </form>
                        </div>
                        <div className="modal-footer">
                           <button type="button" className="btn btn-danger me-3" data-bs-dismiss="modal">Close</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}