import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFutbol} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import DePrimeraIcon from './icons/DePrimeraIcon'

export default function Navbar() {
  return (
    <section className="navbar-container">
        <section className="navbar-content">
            <section className="navbar-icon">
                <Link to="/" className="navbar-links">
                    <DePrimeraIcon/>
                    <h3>De Primera</h3>
                </Link>
            </section>
            <section className="navbar-menu">
                <NavLink 
                to="/"
                end 
                className={({ isActive }) => 
                    isActive ? "navbar-links-active" : "navbar-links"
                }
                >
                    Inicio
                </NavLink>
                <NavLink 
                to="/Competitions"
                end
                className={({ isActive }) => 
                    isActive ? "navbar-links-active" : "navbar-links"
                }
                >
                    Competiciones
                </NavLink>
            </section>
        </section>
    </section>
  )
}
