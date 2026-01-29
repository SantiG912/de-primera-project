import React from 'react'
import useFetch from '../api/useFetch'
import { Link } from 'react-router-dom';
import Matches from './Matches/Matches';
import DePrimeraIcon from './icons/DePrimeraIcon';
import ErrorIcon from './icons/ErrorIcon';

const FEATURED_COMPETITIONS = [2152, 2021, 2001, 2013, 2014, 2019];

export default function Index() {
  const {data, loading, error} = useFetch("competitions");

  if(loading || data === null) return (
    <section className="index-container">
      <section className="loading-container">
        <DePrimeraIcon />
        <p>Cargando...</p>
      </section>
    </section>
  );

  if(error) return (
    <section className="index-container">
      <section className="error-container">
        <DePrimeraIcon />
        <ErrorIcon />
        <p>Ha ocurrido un error. Intenta recargar la página.</p>
      </section>
    </section>
  );
  
  if(!data?.competitions) return null

  const featuredCompetitions = data.competitions.filter(comp =>
    FEATURED_COMPETITIONS.includes(comp.id)
  );

  return (
    <section className="index-container">
      <section className="competition-container">
        <section className="competition-grid">
          {featuredCompetitions.map(comp => (
            <Link
              key={comp.id}
              to={`/competitions/${comp.id}`}
              className="competition-card"
            >
            <section className="competition-emblem">
                <img 
                src={comp.emblem} 
                alt={comp.name}
                />
            </section>
            <span className="competition-name">
                <h3>{comp.name}</h3>
            </span>
            </Link>
          ))}
        </section>
      </section>

      <section className="featured-matches">
        <span className="today-matches">
          <h3>Hoy:</h3>
        </span>
        <Matches/>
      </section>
    </section>
  )
}
