import React, { useEffect, useMemo, useState } from 'react'
import {getCurrentMatchday} from '../../api/competitionTools'
import MatchCard from './MatchCard'
import PendingMatches from './PendingMatches';

export default function LeagueMatches({matches, pendingMatches}) {
  const [selectedMatchday, setSelectedMatchday] = useState(null);

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

      {visibleMatches.map(match => (
        <MatchCard key={match.id} match={match}/>
      ))}

      <PendingMatches matches={pendingMatches}/>
    </>
  );
}
