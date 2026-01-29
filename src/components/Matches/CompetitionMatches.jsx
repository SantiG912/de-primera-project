import React, { useMemo } from 'react'
import LeagueMatches from './LeagueMatches'
import CupMatches from './CupMatches'
import useFetch from '../../api/useFetch'
import { getPendingMatches, getMatchdayByDate } from '../../api/competitionTools'
import DePrimeraIcon from '../icons/DePrimeraIcon';
import ErrorIcon from '../icons/ErrorIcon';
import HeartCrack from '../icons/HeartCrack'

export default function CompetitionMatches({competitionId}) {
  const {data, loading, error} = useFetch(`competitions/${competitionId}/matches`);

  const currentMatchday = useMemo(() => {
    return getMatchdayByDate(data?.matches ?? []);
  }, [data?.matches]);

  const pendingMatches = useMemo(() => {
    return getPendingMatches(data?.matches ?? [], currentMatchday);
  }, [data?.matches, currentMatchday]);
  
  if(loading) return (
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

  if(!data?.matches?.length) return (
      <section className="index-container">
          <section className="error-container">
              <DePrimeraIcon />
              <HeartCrack />
              <p>No hay partidos.</p>
          </section>
      </section>
  );
  
  const competitionType = data.competition.type;

  if(competitionType === "LEAGUE"){
    return <LeagueMatches matches={data.matches} pendingMatches={pendingMatches}/>;
  }

  if(competitionType === "CUP"){
    return <CupMatches matches={data.matches} pendingMatches={pendingMatches}/>
  }

  return null;

}
