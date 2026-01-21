import React from 'react'

export default function LeagueStandings({table}) {
  return (
        <section className="standings-container">
            <section className="standings-table">
                <table className="team-standings">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Equipo</th>
                            <th>PJ</th>
                            <th>Puntos</th>
                            <th>PG</th>
                            <th>PE</th>
                            <th>PP</th>
                            <th>GF</th>
                            <th>GC</th>
                            <th>DG</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table?.map(
                            (team) => (                                        
                                <tr key={team.team.id}>
                                    <td>{team.position}</td>
                                    <td>
                                        <img 
                                        src={team.team.crest} 
                                        alt="" 
                                        />
                                        {team.team.name}
                                    </td>
                                    <td>{team.playedGames}</td>
                                    <td>{team.points}</td>
                                    <td>{team.won}</td>
                                    <td>{team.draw}</td>
                                    <td>{team.lost}</td>
                                    <td>{team.goalsFor}</td>
                                    <td>{team.goalsAgainst}</td>
                                    <td>{team.goalDifference}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </section>
        </section>
  )
}
