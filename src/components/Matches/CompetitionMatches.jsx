import React, { useMemo } from 'react'
import LeagueMatches from './LeagueMatches'
import CupMatches from './CupMatches'
import useFetch from '../../api/useFetch'
import { getPendingMatches, getMatchdayByDate } from '../../api/competitionTools'

export default function CompetitionMatches({competitionId}) {
  const {data, loading, error} = useFetch(`competitions/${competitionId}/matches`);

  const currentMatchday = useMemo(() => {
    return getMatchdayByDate(data?.matches ?? []);
  }, [data?.matches]);

  const pendingMatches = useMemo(() => {
    return getPendingMatches(data?.matches ?? [], currentMatchday);
  }, [data?.matches, currentMatchday]);
  
  if(loading) return <p>Cargando datos...</p>
  if(error) return <p>Error cargando datos.</p>
  if(!data?.matches?.length) return <p>No hay partidos.</p>

  const competitionType = data.competition.type;

  if(competitionType === "LEAGUE"){
    return <LeagueMatches matches={data.matches} pendingMatches={pendingMatches}/>;
  }

  if(competitionType === "CUP"){
    return <CupMatches matches={data.matches} pendingMatches={pendingMatches}/>
  }

  return null;

}
