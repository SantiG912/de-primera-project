import React from 'react'
import { formatDate } from '../../api/formatDate'
import MatchCard from './MatchCard';

export default function PendingMatches({matches}) {
    if(!matches || matches.length === 0) return null;

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
