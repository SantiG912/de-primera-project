import React from 'react'
import useFetch from './api/useFetch'
import Competitions from './components/Competitions'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Index from './components/Index'
import DetailedCompetition from './components/DetailedCompetition'

export default function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="/Competitions" element={<Competitions/>}/>
        <Route path="/Competitions/:id" element={<DetailedCompetition/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}