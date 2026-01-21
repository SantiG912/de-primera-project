import React from 'react'
import useFetch from '../api/useFetch'
import { Link } from 'react-router-dom';
import Matches from './Matches';

const FEATURED_COMPETITIONS = [2021, 2001, 2013, 2014, 2019];

export default function Index() {
  const {data, loading, error} = useFetch("competitions");

  if(loading || data === null) return <p>Cargando datos...</p>
  if(error) return <p>Error cargando los datos</p>
  if(!data?.competitions) return null

  const featuredCompetitions = data.competitions.filter(comp =>
    FEATURED_COMPETITIONS.includes(comp.id)
  );

  return (
    <section className="index-container">
      <section className="featured-competitions">
        <section className="competition-grid">
          {featuredCompetitions.map(comp => (
            <Link
              key={comp.id}
              to={`/competitions/${comp.id}`}
              className="competition-card"
            >
              <img
              src={comp.emblem}
              alt={comp.name}
              />
              <h3>{comp.name}</h3>
            </Link>
          ))}
        </section>
      </section>

      <section className="today-matches">
        <h3>Hoy:</h3>
        <Matches/>
      </section>
    </section>
  )
}
