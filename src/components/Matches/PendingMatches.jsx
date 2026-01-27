import React from 'react'
import MatchCard from './MatchCard';

export default function PendingMatches({matches}) {
    return (
        <section className="pending-matches">
            <span className="pending-badge">
                Pendientes
            </span>
            {matches.map(match => (
                <MatchCard key={match.id} match={match}/>
            ))}
        </section>
    );
}
