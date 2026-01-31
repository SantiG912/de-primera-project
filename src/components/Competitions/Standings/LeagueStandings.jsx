import React from 'react'

export default function LeagueStandings({table}) {
  return (
        <section className="standings-container">
            <section className="standings-section">
                <table>
                    <thead>
                        <tr>
                            <th className="team-position">#</th>
                            <th className="team-name">Equipo</th>
                            <th className="team-played">PJ</th>
                            <th className="team-points">Puntos</th>
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
                                    <td className="team-position">{team.position}</td>
                                    <td className="team-name">
                                        <img 
                                        src={team.team.crest} 
                                        alt="" 
                                        />
                                        {team.team.name}
                                    </td>
                                    <td className="team-played">{team.playedGames}</td>
                                    <td className="team-points">{team.points}</td>
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
