import React from 'react'
import useAuth from '../custom-hook/useAuth'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {currentUser} = useAuth()
  return (
    currentUser ? children : <Navigate to="account/login" />
  )
}

export default ProtectedRoute