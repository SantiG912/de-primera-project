import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../api/useFetch';
import Standings from './Standings';
import Scorers from './Scorers';
import CompetitionMatches from './CompetitionMatches';

export default function DetailedCompetition() {
    const { id } = useParams();
    const {data, loading, error} = useFetch(`competitions/${id}`);

    console.log(data);
    

    if(loading || data === null){return <p>Cargando competición...</p>;}
    if(error){return <p>Error cargando la competición</p>;}
    if(!data){return <p>No hay respuesta del servidor</p>;}
    if(!data.id){return <p>La competición no existe</p>;}

    return (
        <section className="detailed-competition-container">
        <article className="detailed-competition-card">
            <img src={data.emblem} alt={data.name} />
            <h2>{data.name}</h2>
            <p>Área: {data.area?.name}</p>
            <p>
            Temporada actual: {data.currentSeason?.startDate} →{" "}
            {data.currentSeason?.endDate}
            </p>
        </article>
        <Standings competitionId={id} />
        <Scorers competitionId={id} />
        <CompetitionMatches competitionId={id} />
        </section>
    );
}