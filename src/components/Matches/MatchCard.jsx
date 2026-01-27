import React from 'react'
import {formatDate} from '../../api/formatDate'

export default function MatchCard({match}) {
  console.log(match);
  
  return (
    <>
      <section className="matches-section">
        <img src={match.homeTeam.crest} alt={match.homeTeam.name} />
        <span>
          {match.homeTeam.name}{" "}
          {match.score.fullTime.home ?? " "}
          {" - "}
          {match.score.fullTime.away ?? " "}{" "}
          {match.awayTeam.name}
        </span>
        <img src={match.awayTeam.crest} alt={match.awayTeam.name} />

        <span>{formatDate(match.utcDate)}</span>
      </section>
    </>
  );
}
