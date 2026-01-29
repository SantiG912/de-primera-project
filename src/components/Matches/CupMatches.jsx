import React, { useEffect, useMemo, useState } from 'react'
import MatchCard from './MatchCard';
import PendingMatches from './PendingMatches';
import { getCurrentMatchday, isRegularStage } from '../../api/competitionTools';
import DePrimeraIcon from '../icons/DePrimeraIcon';
import AtentionIcon from '../icons/AtentionIcon';

export default function CupMatches({matches, pendingMatches}) {
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedMatchday, setSelectedMatchday] = useState(null);
  
  
  const matchesByStage = useMemo(() => {
    return matches.reduce((acc, match) => {
      acc[match.stage] ??= [];
      acc[match.stage].push(match);
      return acc;
    }, {});
  }, [matches]);
  
  const stages = Object.keys(matchesByStage);

  const stageMatches = matchesByStage[selectedStage] ?? [];

  const matchesByMatchday = useMemo(() => {
    if(!isRegularStage(selectedStage)) return [];

    return stageMatches.reduce((acc, match) => {
      if(!Number.isFinite(match.matchday)) return acc;
      acc[match.matchday] ??= [];
      acc[match.matchday].push(match);
      return acc;
    }, {});
  },[stageMatches, selectedStage]);

  const matchdays = Object.keys(matchesByMatchday)
    .map(Number)
    .sort((a, b) => a - b);

  const currentMatchday = useMemo(() => {
    if(!isRegularStage(selectedStage)) return null;

    return getCurrentMatchday(stageMatches);
  }, [stageMatches, selectedStage])

  useEffect(() => {
    if(currentMatchday){
      setSelectedMatchday(currentMatchday);
    }
  }, [currentMatchday]);

  useEffect(() => {
    if(!selectedStage && stages.length > 0){
      setSelectedStage(stages[0]);
    }
  }, [stages, selectedStage]);

  const matchesToRender = isRegularStage(selectedStage)
    ? matchesByMatchday[selectedMatchday] ?? []
    : stageMatches

  if(!stages.length) return (
      <section className="index-container">
          <section className="error-container">
              <DePrimeraIcon />
              <AtentionIcon />
              <p>No hay jornadas disponibles.</p>
          </section>
      </section>
  );

  return (
    <>
    <section className="featured-matches">
      <section className="matches-container">
        <span className="matchday-select">
          <select
            value={selectedStage ?? ""}
            onChange={e => {
              setSelectedStage(e.target.value)
              setSelectedMatchday(null)
            }}
          >
            {stages.map(stage => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>

        {isRegularStage(selectedStage) && (
          <select
          value={selectedMatchday ?? ""}
          onChange={e => setSelectedMatchday(Number(e.target.value))}
          >
            {matchdays.map(day => (
              <option key={day} value={day}>
                Jornada {day}
              </option>
            ))}
          </select>
        )}
        </span>
        
        <section className="matchday-table">
          {matchesToRender.map(match => (
            <MatchCard key={match.id} match={match}/>
          ))}

          <PendingMatches matches={pendingMatches}/>
        </section>
      </section>
    </section>
    </>
  );
}
