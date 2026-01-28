import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFutbol} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <section className="navbar-container">
        <section className="navbar-content">
            <section className="navbar-icon">
                <Link to="/" className="navbar-links">
                    <FontAwesomeIcon icon={faFutbol}/>
                    <h3>De Primera</h3>
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
