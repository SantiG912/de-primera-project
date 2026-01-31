import React, { useEffect, useMemo, useState } from 'react'
import MatchCard from './MatchCard';
import PendingMatches from './PendingMatches';
import { getCurrentMatchday, isRegularStage } from '../../api/competitionTools';
import DePrimeraIcon from '../icons/DePrimeraIcon';
import AtentionIcon from '../icons/AtentionIcon';

export default function CupMatches({matches, pendingMatches}) {
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedMatchday, setSelectedMatchday] = useState(null);
  const [isStageOpen, setIsStageOpen] = useState(false);
  const [isMatchdayOpen, setIsMatchdayOpen] = useState(false);
  
  const STAGE_LABELS = {
    ROUND_1: "Primera ronda",
    ROUND_2: "Segunda ronda",
    LEAGUE_STAGE: "Liga",
    GROUP_STAGE: "Fase de grupos",
    PLAYOFFS: "Playoffs",
    LAST_16: "Octavos de final",
    QUARTER_FINALS: "Cuartos de final",
    SEMI_FINALS: "Semifinales",
    FINAL: "Final",
  }
  
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
          <section className="atention-container">
              <DePrimeraIcon />
              <AtentionIcon />
              <p>No hay jornadas disponibles.</p>
          </section>
      </section>
  );

  return (
    <>
    <section className="featured-matches">
      <section className="matches-wrapper">
        <section className="matches-container">
          <span className="stage-selector">
            <button
             className="dropdown-trigger"
             onClick={() => setIsStageOpen(!isStageOpen)}
            >
              {selectedStage ? STAGE_LABELS[selectedStage] : "Seleccionar fase"}
              <span className="chevron">▾</span>
            </button>
            {isStageOpen && (
              <ul className="dropdown-menu">
                {stages.map(stage => (
                  <li key={stage}
                    onClick={() =>  {
                      setSelectedStage(stage)
                      setSelectedMatchday(null)
                      setIsStageOpen(false)
                    }}
                  >
                    {STAGE_LABELS[stage]}
                  </li>
                ))}
              </ul>
            )}
          </span>
          {isRegularStage(selectedStage) && (
            <span className="matchday-selector">
              <button
                className="dropdown-trigger"
                onClick={() => setIsMatchdayOpen(!isMatchdayOpen)}
              >
                {selectedMatchday ? `Jornada ${selectedMatchday}` : "Seleccionar jornada"}
                <span className="chevron">▾</span>
              </button>

              {isMatchdayOpen && (
                <ul className="dropdown-menu">
                  {matchdays.map(day => (
                    <li
                      key={day}
                      onClick={() => {
                        setSelectedMatchday(day)
                        setIsMatchdayOpen(false)
                      }}
                    >
                      Jornada {day}
                    </li>
                  ))}
                </ul>
              )}
            </span>
          )}
          
          <section className="matchday-table">
            {matchesToRender.map(match => (
              <MatchCard key={match.id} match={match}/>
            ))}

            <PendingMatches matches={pendingMatches}/>
          </section>
        </section>
      </section>
    </section>
    </>
  );
}
