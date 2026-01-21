import React, { useEffect, useState } from 'react'
import useFetch from '../api/useFetch';
import {isMultiStage, filterMatches, getCurrentMatchday, groupByStageAndMatchday} from '../api/competitionTools'
import { formatDate } from '../api/formatDate';

export default function CompetitionMatches({ competitionId }) {
  
  const {
    data: matchData,
    loading: matchLoading,
    error: matchError
  } = useFetch(`competitions/${competitionId}/matches`);

  console.log(matchData);
  

  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedMatchday, setSelectedMatchday] = useState(null);
  
  const matches = matchData?.matches ?? [];
  const competitionType = matchData?.competition?.type;
  const isLeague = competitionType === "LEAGUE";
  const isCup = competitionType === "CUP";
  
  const matchesByMatchday = React.useMemo(() => {
    
    if(!isLeague) return {};
    
    return matches.reduce((acc, match) => {
      if(!Number.isFinite(match.matchday)) return acc;
      
      if(!acc[match.matchday]) acc[match.matchday] = [];
      acc[match.matchday].push(match);
      return acc;
    }, {});
    
  }, [matches, isLeague]);
  
  const matchesByStage = React.useMemo(() => {
    if(!isCup) return {};
    
    return groupByStageAndMatchday(matches);
  }, [matches, isCup]);
  
  const stages = Object.keys(matchesByStage);

  useEffect(() => {
    if(!selectedStage && stages.length > 0){
      setSelectedStage(stages[0]);
    }
  }, [stages, selectedStage])

  const currentMatchday = React.useMemo(() => {
    if(!isLeague) return null;
    return getCurrentMatchday(matches);
  }, [matches, isLeague]);

  useEffect(() => {
    
    if (!currentMatchday) return;

    if (
      selectedMatchday === null ||
      !matchesByMatchday[selectedMatchday]
    ){
      setSelectedMatchday(currentMatchday);
    }

  }, [currentMatchday, selectedMatchday, matchesByMatchday]);

  useEffect(() => {

    if(
      isCup &&
      selectedStage &&
      selectedMatchday === null &&
      matchesByStage[selectedStage]
    ){
      const days = Object.keys(matchesByStage[selectedStage])
        .map(Number)
        .sort((a, b) => a - b);

      if(days.length > 0){
        setSelectedMatchday(days[0]);
      }
    }

  }, [isCup, selectedStage, selectedMatchday, matchesByStage]);

  if(matchLoading || matchData === null)return <p>Cargando partidos...</p>;
  if(matchError)return <p>Error cargando los partidos</p>;
  if(!matchData)return <p>No hay respuesta del servidor</p>;
  if(matches.length === 0)return <p>No hay partidos disponibles</p>;
  if(!currentMatchday)return <p>No hay jornadas disponibles</p>;

  return (
    <>
    {isCup && (
        <>
          <select value={selectedStage ?? ""} onChange={e => setSelectedStage(e.target.value)}>
            {stages.map(stage => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>

          {matchesByStage[selectedStage] && (
            <select
              value={selectedMatchday ?? ""}
              onChange={e => setSelectedMatchday(Number(e.target.value))}
            >
              {Object.keys(matchesByStage[selectedStage])
                .sort((a, b) => a - b)
                .map(day => (
                  <option key={day} value={day}>Jornada {day}</option>
                ))}
            </select>
          )}
        </>
      )}
      {isLeague && (
        <>
          <section className="matches-container">
          <h3>Partidos</h3>

          <select
            value={selectedMatchday ?? ""}
            onChange={e => setSelectedMatchday(Number(e.target.value))}
          >
            
            {Object.keys(matchesByMatchday)
              .sort((a, b) => a - b)
              .map(day => (
                <option key={day} value={day}>
                  Jornada {day}
                </option>
            ))}

          </select>

          <section className="matchday-table">

            {matchesByMatchday[selectedMatchday]?.map(match => (
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
        </>
      )}
      </>
  );
}
