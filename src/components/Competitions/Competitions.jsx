import React from 'react'
import useFetch from '../../api/useFetch'
import { Link } from 'react-router-dom';
import DePrimeraIcon from '../icons/DePrimeraIcon';
import ErrorIcon from '../icons/ErrorIcon';
import AtentionIcon from '../icons/AtentionIcon';

/* ERROR 429 === SE ALCANZO EL LIMITE DE PETICIONES !!! */

export default function Competitions() {
    const {data, loading, error} = useFetch("competitions");
    
    if (loading || data === null) return (
        <section className="index-container">
            <section className="loading-container">
                <DePrimeraIcon />
                <p>Cargando...</p>
            </section>
        </section>
    );

    if (error) return (
        <section className="index-container">
            <section className="error-container">
                <DePrimeraIcon />
                <ErrorIcon />
                <p>Ha ocurrido un error. Intenta recargar la página. <br /> {error}</p>
            </section>
        </section>
    );
    
    if (!data) return (
        <section className="index-container">
            <section className="atention-container">
                <DePrimeraIcon />
                <AtentionIcon />
                <p>No hay respuesta del servidor.</p>
            </section>
        </section>
    );

    if (!Array.isArray(data.competitions)) return (
        <section className="index-container">
            <section className="atention-container">
                <DePrimeraIcon />
                <AtentionIcon />
                <p>No hay datos disponibles.</p>
            </section>
        </section>
    );

    if (data.competitions.length === 0) return (
        <section className="index-container">
            <section className="atention-container">
                <DePrimeraIcon />
                <AtentionIcon />
                <p>No hay datos disponibles.</p>
            </section>
        </section>
    );

    return (
        <section className="index-container">
            <section className="competition-container">
                <section className="competition-grid">
                    {data.competitions.map((competition) => (
                        <Link
                        to={`/competitions/${competition.id}`}
                        key={competition.id}
                        className="competition-card"
                        >
                        <section className="competition-emblem">
                            <img 
                            src={competition.emblem} 
                            alt={competition.name}
                            />
                        </section>
                        <span className="competition-name">
                            <h3>{competition.name}</h3>
                        </span>
                        </Link>
                    ))}
                </section>
            </section>
        </section>
    )
}
