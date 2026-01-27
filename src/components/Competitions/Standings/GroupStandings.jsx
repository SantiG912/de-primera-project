import React from 'react'

export default function GroupStandings({standings}) {
  return(
  <>
    {standings?.map(group => (
        <section key={group.group} className="group-section">
            <h3>{group.group.replace("Group", "Grupo")}</h3>
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
                    {group.table.map(
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
    ))}
  </>
  )
}
