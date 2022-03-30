import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import './index.css'
import { AppLayout } from './layout/AppLayout'
import { Courses } from './pages/Courses'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login/>} />
        <Route path='/admin' element={<AppLayout/>}>
          <Route index element={<div>Dashboard</div>}/>
          <Route path='/admin/courses' element={<Courses/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
