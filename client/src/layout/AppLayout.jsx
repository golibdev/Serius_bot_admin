import React, {useEffect, useState} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { isAuthenticated } from '../handlers/auth'

export const AppLayout = () => {
   const navigate = useNavigate()
   const [toggle, setToggle] = useState(false)
   const [loading, setLoading] = useState(true)
   useEffect(() => {
      const redirectAdminPanel = () => {
         const token = localStorage.getItem('token');
         const isAuth = isAuthenticated(token)
         if (!isAuth) return navigate('/')
         setTimeout(() => {
            setLoading(true)
         }, 1500)
      }
      redirectAdminPanel()
   }, [])

   const clickToggle = () => {
      setToggle(!toggle)
   }
   
   return (
      <>
         <Header clickToggle={clickToggle} />
         <Sidebar clickToggle={clickToggle} toggle={toggle} />
         <main id='main' className={'main'} style={{ marginLeft: toggle && '0' }}>
            <Outlet />
            <ToastContainer/>
         </main>
      </>
   )
}