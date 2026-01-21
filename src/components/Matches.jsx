import React from 'react'
import useFetch from '../api/useFetch';
import { formatDate } from '../api/formatDate';

export default function Matches() {
  const today = new Date().toISOString().split("T")[0];

  const { data, loading, error } = useFetch(
    `matches?dateFrom=${today}&dateTo=${today}`
  );

  if(loading || data === null) return <p>Cargando partidos...</p>;
  if(error) return <p>Error cargando partidos</p>;
  if(!data?.matches || data.matches.length === 0) {
    return <p>No hay partidos hoy</p>;
  }

  return (
    <section className="matches-container">
      <section className="matchday-table">

          {data.matches.map(match => (

            <section key={match.id} className="matches">
              
              <img
                src={match.homeTeam.crest}
                alt={match.homeTeam.shortName}
              />
  
              <span className="matchday-teams">
                {match.homeTeam.name}{" "}
                {match.score.fullTime.home}
                {" - "}
                {match.score.fullTime.away}{" "}
                {match.awayTeam.name}
              </span>
  
              <img
                src={match.awayTeam.crest}
                alt={match.awayTeam.shortName}
              />
  
              <span className="matchday-date">
                {formatDate(match.utcDate)}
              </span>
            </section>
  
          ))}
      
      </section>
    </section>
  );
}

