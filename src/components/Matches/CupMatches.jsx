import React, { useEffect, useMemo, useState } from 'react'
import MatchCard from './MatchCard';
import PendingMatches from './PendingMatches';

export default function CupMatches({matches, pendingMatches}) {
  const [selectedStage, setSelectedStage] = useState(null);

  const matchesByStage = useMemo(() => {
    return matches.reduce((acc, match) => {
      acc[match.stage] ??= [];
      acc[match.stage].push(match);
      return acc;
    }, {});
  }, [matches]);

  const stages = Object.keys(matchesByStage);

  useEffect(() => {
    if(!selectedStage && stages.length > 0){
      setSelectedStage(stages[0]);
    }
  }, [stages, selectedStage]);

  if(!stages.length) return <p>No hay jornadas disponibles...</p>

  return (
    <>
      <select
        value={selectedStage ?? ""}
        onChange={e => setSelectedStage(e.target.value)}
      >
        {stages.map(stage => (
          <option key={stage} value={stage}>
            {stage}
          </option>
        ))}
      </select>

      {matchesByStage[selectedStage]?.map(match => (
        <MatchCard key={match.id} match={match}/>
      ))}

      <PendingMatches matches={pendingMatches}/>
    </>
  );
}
