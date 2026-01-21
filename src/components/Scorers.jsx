import React from 'react'
import useFetch from '../api/useFetch';

export default function Scorers({competitionId}) {
    const {
        data: scorersData,
        loading: scorersLoading,
        error: scorersError
    } = useFetch(`competitions/${competitionId}/scorers`);
    
    if (scorersLoading || scorersData === null){return <p>Cargando estadísticas...</p>;}
    if (scorersError){return <p>Error cargando las estadísticas: {scorersError}</p>;}
    if (!scorersData){return <p>No hay respuesta del servidor</p>;}
    if (!Array.isArray(scorersData.scorers)){return <p>No hay estadísticas disponibles</p>;}
    if (scorersData.scorers.length === 0){return <p>No hay goleadores</p>;}
    
    return (
        <section className="scorers-container">
            <section className="scorers-table">
                <table className="scorers-standings">
                    <thead>
                        <tr>
                            <th>Jugador</th>
                            <th>Goles</th>
                            <th>Asistencias</th>
                            <th>PJ</th>
                            <th>Promedio G/A</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scorersData?.scorers.map(
                            (scorer) => (
                                <tr key={scorer.player.id}>
                                    <td>
                                        <img 
                                        src={scorer.team.crest} 
                                        alt={scorer.team.shortName} 
                                        />
                                        {scorer.player.name}
                                    </td>
                                    <td>{scorer.goals}</td>
                                    <td>{scorer.assists ?? 0}</td>
                                    <td>{scorer.playedMatches}</td>
                                    <td>{((scorer.goals + scorer.assists ?? 0) /scorer.playedMatches).toFixed(2)}</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </section>
        </section>
    );
}
