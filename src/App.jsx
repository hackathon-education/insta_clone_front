import React from 'react'

import {Routes,Route, Navigate} from "react-router-dom"
import PageLayout from './Layouts/PageLayout'
import ProfilePage from './components/ProfilePage/ProfilePage'
import HomePage from './HomePage/HomePage'
import Login from './components/AuthForm/Login'
import AuthForm from './components/AuthForm/AuthForm'


export default function App() {
  return (
    <PageLayout>
    <Routes>
        <Route path='/login' element={<AuthForm/>}/>
        <Route path='/' element ={<HomePage/>}/>
        <Route path='/:username' element={<ProfilePage/>}/>
    </Routes>
    </PageLayout>
  )
}

