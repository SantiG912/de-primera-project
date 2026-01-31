import React from 'react'
import {formatDate} from '../../api/formatDate'
import QuestionIcon from '../icons/QuestionIcon'

export default function MatchCard({match}) {
  return (
    <>
      <section className="match-section">
        <span className="match-status">
            {match.status === "FINISHED" && <p>Final</p>}
            {match.status === "PAUSED" && <p className="live-match">Entretiempo</p>}
            {match.status === "IN_PLAY" && <p className="live-match">En vivo</p>}
        </span>
        <section className="match-center">
          <section className="team home">
            <span className="team-name">
              {match.homeTeam.name}{" "}
            </span>
            <span className="team-crest">
              { !match.homeTeam.crest 
                ? <QuestionIcon />
                : <img src={match.homeTeam.crest} alt={match.homeTeam.name} />
              }
            </span>
          </section>
          <span className="match-score">
            {match.score.fullTime.home ?? " "}
            {" - "}  
            {match.score.fullTime.away ?? " "}{" "}
          </span>
          <section className="team away">
            <span className="team-crest">
              { !match.awayTeam.crest 
                ? <QuestionIcon /> 
                : <img src={match.awayTeam.crest} alt={match.awayTeam.name} />
              }
            </span>
            <span className="team-name">
              {match.awayTeam.name}
            </span>
          </section>

        </section>
        <span className="match-date">{formatDate(match.utcDate)}</span>
      </section>
    </>
  );
}