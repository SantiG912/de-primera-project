import React from 'react'
import useFetch from '../../api/useFetch'
import { Link } from 'react-router-dom';

/* ERROR 429 === SE ALCANZO EL LIMITE DE PETICIONES !!! */

export default function Competitions() {
    const {data, loading, error} = useFetch("competitions");
    
    if (loading || data === null){return <p>Cargando competiciones...</p>;}
    if (error){return <p>Error cargando los datos</p>;}
    if (!data){return <p>No hay respuesta del servidor</p>;}
    if (!Array.isArray(data.competitions)){return <p>No hay datos disponibles</p>;}
    if (data.competitions.length === 0) {return <p>No hay datos para mostrar</p>;}

    return (
        <section className="competition-container">
                <section className="competition-content">
                    {data.competitions.map((competition) => (
                        <Link
                        to={`/competitions/${competition.id}`}
                        key={competition.id}
                        >
                        <article className="competition-card">
                            <img 
                            src={competition.emblem} 
                            alt="" 
                            />
                            <h3>{competition.name}</h3>
                        </article>
                        </Link>
                    ))}
                </section>
        </section>
    )
}
