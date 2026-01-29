import React from 'react'
import {formatDate} from '../../api/formatDate'
import QuestionIcon from '../icons/QuestionIcon'

export default function MatchCard({match}) {
  return (
    <>
      <section className="match-section">
        <span className="match-status">
            {match.status === "FINISHED" && <p>Final</p>}
        </span>
        <section className="match-center">
          { !match.homeTeam.crest 
            ? <QuestionIcon /> 
            : <img src={match.homeTeam.crest} alt={match.homeTeam.name} />
          }
          <section className="match-teams">
            {match.homeTeam.name}{" "}
            {match.score.fullTime.home ?? " "}
            {" - "}  
            {match.score.fullTime.away ?? " "}{" "}
            {match.awayTeam.name}
          </section>
          { !match.awayTeam.crest
            ? <QuestionIcon />
            : <img src={match.awayTeam.crest} alt={match.awayTeam.name} />
          }

        </section>
        <span className="match-date">{formatDate(match.utcDate)}</span>
      </section>
    </>
  );
}