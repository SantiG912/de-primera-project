import React from 'react'
import useFetch from '../api/useFetch';
import GroupStandings from './GroupStandings';
import LeagueStandings from './LeagueStandings';

export default function Standings({competitionId}) {
    const {
        data: standingsData, 
        loading: standingsLoading, 
        error: standingsError
    } = useFetch(`competitions/${competitionId}/standings`);

    if(standingsLoading || standingsData === null) return <p>Cargando posiciones...</p>
    if(standingsError) return <p>Error cargando posiciones: {standingsError}</p>
    if(!standingsData || standingsData.length === 0) return <p>No hay datos...</p>
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