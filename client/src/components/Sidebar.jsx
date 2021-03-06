import React, {  } from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

export const Sidebar = ({ toggle, clickToggle }) => {
   const isMobile = useMediaQuery({ maxWidth: 1199 })
   const navLinkInfos = [
      {
         title: 'Dashboard',
         link: '/admin',
         icon: 'fas fa-home'
      },
      {
         title: 'Courses',
         link: '/admin/courses',
         icon: 'fas fa-book'
      },
      {
         title: 'Services',
         link: '/admin/services',
         icon: 'fas fa-cogs'
      }
   ]
   return (
      <div className={toggle ? 'toggle-sidebar' : ''}>
         <aside id="sidebar" className="sidebar">

            <ul className="sidebar-nav" id="sidebar-nav">

               {navLinkInfos.map(item => (
                  <li className="nav-item" key={item.link}>
                     <Link className="nav-link " to={item.link} onClick={isMobile && clickToggle}>
                        <i className={item.icon}></i>
                        <span>{item.title}</span>
                     </Link>
                  </li>
               ))}
            </ul>

         </aside>
      </div>
   )
}