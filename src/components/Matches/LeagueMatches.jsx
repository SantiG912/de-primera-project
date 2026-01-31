import React, { useEffect, useMemo, useState } from 'react'
import {getCurrentMatchday} from '../../api/competitionTools'
import MatchCard from './MatchCard'
import PendingMatches from './PendingMatches';

export default function LeagueMatches({matches, pendingMatches}) {
  const [selectedMatchday, setSelectedMatchday] = useState(null);
  const [isMatchdayOpen, setIsMatchdayOpen] = useState(false);

  const matchesByMatchday = useMemo(() => {
    return matches.reduce((acc, match) => {
      if(!Number.isFinite(match.matchday)) return acc;
      
      if(!acc[match.matchday]) acc[match.matchday] = [];
      acc[match.matchday].push(match);
      return acc;
    }, {});
  }, [matches]);

  useEffect(() => {
    if(selectedMatchday !== null) return;

    const lastPlayed = getCurrentMatchday(matches);

    if(lastPlayed !== null){
      setSelectedMatchday(lastPlayed);
    }

  }, [matches, selectedMatchday]);

  const visibleMatches = matchesByMatchday[selectedMatchday] ?? [];

  return (
    <>
    <section className="featured-matches">
      <section className="matches-wrapper">
        <section className="matches-container">
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
                {Object.keys(matchesByMatchday)
                  .sort((a, b) => a - b)
                  .map(day => (
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
          <section className="matchday-table">
            {visibleMatches.map(match => (
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
