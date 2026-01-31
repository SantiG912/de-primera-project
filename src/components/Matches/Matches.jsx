import React from 'react'
import useFetch from '../../api/useFetch';
import MatchCard from './MatchCard'
import DePrimeraIcon from '../icons/DePrimeraIcon';
import ErrorIcon from '../icons/ErrorIcon';
import HeartCrack from '../icons/HeartCrack';

export default function Matches() {
  const today = new Date().toISOString().split("T")[0];

  const { data, loading, error } = useFetch(
    `matches?dateFrom=${today}&dateTo=${today}`
  );
  console.log(data);

  const matchesByCompetition = data?.matches?.reduce((acc, match) => {
    const competitionId = match.competition.id;
    if(!acc[competitionId]){
      acc[competitionId] = {
        competition: match.competition,
        matches: [],
      };  
    }

    acc[competitionId].matches.push(match);
    return acc;
  }, {});

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
            <p>Ha ocurrido un error. Intenta recargar la página. <br /> {error}</p>
        </section>
    </section>
  );

  if(!data?.matches || data.matches.length === 0) return (
    <section className="index-container">
        <section className="error-container">
            <DePrimeraIcon />
            <HeartCrack />
            <p>No hay partidos hoy.</p>
        </section>
    </section>
  );

  return (
    <section className="matches-container">
    {Object.values(matchesByCompetition).map(group => (
      <section key={group.competition.id} className="competition-group">

        <span className="competition-crest">
          <img
            src={group.competition.emblem}
            alt={group.competition.name}
          />
        </span>

        <section className="matchday-table">
          {group.matches.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </section>

      </section>
    ))}
    </section>
  );
}

