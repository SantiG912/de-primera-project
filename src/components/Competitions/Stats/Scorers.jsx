import React from 'react'
import useFetch from '../../../api/useFetch';
import DePrimeraIcon from '../../icons/DePrimeraIcon';
import ErrorIcon from '../../icons/ErrorIcon';
import AtentionIcon from '../../icons/AtentionIcon';

export default function Scorers({competitionId}) {
    const {
        data: scorersData,
        loading: scorersLoading,
        error: scorersError
    } = useFetch(`competitions/${competitionId}/scorers`);
    
    if (scorersLoading || scorersData === null) return (
        <section className="index-container">
            <section className="loading-container">
                <DePrimeraIcon />
                <p>Cargando...</p>
            </section>
        </section>
    );

    if (scorersError) return (
        <section className="index-container">
            <section className="error-container">
                <DePrimeraIcon />
                <ErrorIcon />
                <p>Ha ocurrido un error. Intenta recargar la página. <br /> {scorersError}</p>
            </section>
        </section>
    );
    if (!scorersData) return (
        <section className="index-container">
            <section className="error-container">
                <DePrimeraIcon />
                <ErrorIcon />
                <p>Ha ocurrido un error. Intenta recargar la página.</p>
            </section>
        </section>
    );

    if (!Array.isArray(scorersData.scorers)) return (
        <section className="index-container">
            <section className="error-container">
                <DePrimeraIcon />
                <ErrorIcon />
                <p>Ha ocurrido un error. Intenta recargar la página.</p>
            </section>
        </section>
    );
    
    if (scorersData.scorers.length === 0) return (
        <section className="index-container">
            <section className="atention-container">
                <DePrimeraIcon />
                <AtentionIcon />
                <p>No hay información disponible.</p>
            </section>
        </section>
    );
    
    return (
        <section className="scorers-container">
            <section className="scorers-section">
                <table>
                    <thead>
                        <tr>
                            <th className="player-name">Jugador</th>
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
                                    <td className="player-name">
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
