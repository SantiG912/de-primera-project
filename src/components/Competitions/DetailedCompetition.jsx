import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../api/useFetch';
import Standings from './Standings/Standings';
import Scorers from './Stats/Scorers';
import CompetitionMatches from '../Matches/CompetitionMatches';
import DePrimeraIcon from '../icons/DePrimeraIcon';
import ErrorIcon from '../icons/ErrorIcon';
import AtentionIcon from '../icons/AtentionIcon';

export default function DetailedCompetition() {
    const { id } = useParams();
    const {
        data: competitionData, 
        loading: competitionLoading, 
        error: competitionError
    } = useFetch(`competitions/${id}`);

    if(competitionLoading || competitionData === null) return (
        <section className="index-container">
            <section className="loading-container">
                <DePrimeraIcon />
                <p>Cargando...</p>
            </section>
        </section>
    );

    if(competitionError) return (
        <section className="index-container">
            <section className="error-container">
                <DePrimeraIcon />
                <ErrorIcon />
                <p>Ha ocurrido un error. Intenta recargar la página. <br /> {competitionError}</p>
            </section>
        </section>
    );

    if(!competitionData)return (
        <section className="index-container">
            <section className="atention-container">
                <DePrimeraIcon />
                <AtentionIcon />
                <p>No hay respuesta del servidor.</p>
            </section>
        </section>
    );

    return (
        <section className="index-container">
            <article className="competition-header">
                <img src={competitionData.emblem} alt={competitionData.name} />
                <h2>{competitionData.name}</h2>
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