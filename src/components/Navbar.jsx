import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <section className="navbar-container">
        <section className="navbar-content">
            <section className="navbar-icon">
                <Link to="/" className="navbar-links">
                    <img 
                    src={null} 
                    alt="Futbolismo icon" 
                    />
                    <h3>Futbolismo</h3>
                </Link>
            </section>
            <section className="navbar-menu">
                <Link to="/" className="navbar-links">Inicio</Link>
                <Link to="/Competitions" className="navbar-links">Competiciones</Link>
            </section>
        </section>
    </section>
  )
}
