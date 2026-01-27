import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../api/useFetch';
import Standings from './Standings/Standings';
import Scorers from './Stats/Scorers';
import CompetitionMatches from '../Matches/CompetitionMatches';

export default function DetailedCompetition() {
    const { id } = useParams();
    const {
        data: competitionData, 
        loading: competitionLoading, 
        error: competitionError
    } = useFetch(`competitions/${id}`);

    if(competitionLoading || competitionData === null){return <p>Cargando competición...</p>;}
    if(competitionError){return <p>Error cargando la competición</p>;}
    if(!competitionData){return <p>No hay respuesta del servidor</p>;}

    return (
        <section className="detailed-competition-container">
        <article className="detailed-competition-card">
            <img src={competitionData.emblem} alt={competitionData.name} />
            <h2>{competitionData.name}</h2>
            <p>Área: {competitionData.area?.name}</p>
            <p>
            Temporada actual: {competitionData.currentSeason?.startDate} →{" "}
            {competitionData.currentSeason?.endDate}
            </p>
        </article>
        <Standings competitionId={id} />
        <Scorers competitionId={id} />
        <CompetitionMatches competitionId={id} />
        </section>
    );
}