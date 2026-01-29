import React from 'react'
import useFetch from '../../../api/useFetch';
import GroupStandings from './GroupStandings';
import LeagueStandings from './LeagueStandings';
import DePrimeraIcon from '../../icons/DePrimeraIcon';
import ErrorIcon from '../../icons/ErrorIcon';

export default function Standings({competitionId}) {
    const {
        data: standingsData, 
        loading: standingsLoading, 
        error: standingsError
    } = useFetch(`competitions/${competitionId}/standings`);

    if(standingsLoading || standingsData === null) return (
        <section className="index-container">
            <section className="loading-container">
                <DePrimeraIcon />
                <p>Cargando...</p>
            </section>
        </section>
    );

    if(standingsError) return (
        <section className="index-container">
            <section className="error-container">
                <DePrimeraIcon />
                <ErrorIcon />
                <p>Ha ocurrido un error. Intenta recargar la página. <br /> {standingsError}</p>
            </section>
        </section>
    );

    if(!standingsData || standingsData.length === 0) return (
        <section className="index-container">
            <section className="error-container">
                <DePrimeraIcon />
                <ErrorIcon />
                <p>Ha ocurrido un error. Intenta recargar la página.</p>
            </section>
        </section>
    );

    if(!standingsData?.standings) {return null;}
    
    const table = standingsData.standings.find(
        (s) => s.type === "TOTAL"
    );

    if(!table?.table) {return null;}

    const groupStandings = standingsData?.standings?.filter(
        s => s.stage === 'ALL'
    );
    
    return (
        <>
            {groupStandings?.length
                ? <GroupStandings standings={groupStandings}/>
                : <LeagueStandings table={standingsData?.standings[0]?.table}/>
            }
        </>
        );
}