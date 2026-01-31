# Futbolismo (De Primera) ⚽

**Futbolismo** es una SPA en React + Vite que muestra información de competiciones de fútbol usando la API de football-data.org mediante un proxy Express con caché para evitar límites de petición.

---

## 📌 Características principales

- Página de inicio con competiciones destacadas y los partidos del día.
- Listado de competiciones (página **Competiciones**).
- Vista detallada de una competición con:
  - Encabezado con temporada actual
  - Tabla de posiciones (soporta ligas y fases de grupos)
  - Máximos goleadores (scorers)
  - Listado de partidos (se diferencia entre competiciones tipo `LEAGUE` y `CUP`)
  - Partidos pendientes (matches con status `TIMED` y anteriores al matchday actual)
- Sistema de petición reutilizable en cliente (`useFetch` hook) y utilidades para cálculo de jornada relevante (`competitionTools`).
- Proxy servidor en `server.js` que agrega cabeceras con la API key y cachea respuestas con TTLs por endpoint.

---

## 🛠️ Tecnologías

- Frontend: React + Vite
- Routing: react-router-dom
- Server: Express + node-fetch + cors
- Linter: ESLint
- Otras: FontAwesome

---

## 📁 Estructura (resumen)

- `src/` – código fuente React
  - `components/` – componentes UI (Index, Navbar, Competitions, Matches, Standings, Scorers...)
  - `api/` – `useFetch`, `competitionTools`, `formatDate`, utilidades
  - `main.jsx`, `App.jsx` – entrada y rutas
- `server.js` – proxy a football-data.org con caché
- `vercel.json` – configuración de despliegue

---

## ⚙️ Variables de entorno

- `API_KEY` (servidor): tu API key de football-data.org (usada por `server.js`).
- `VITE_API_URL` (cliente): URL base del proxy, por ejemplo `http://localhost:3001`.

Ejemplo de `.env` (en el root):

```
API_KEY=tu_api_key_aca
VITE_API_URL=http://localhost:3001
```

> Nota: las variables con prefijo `VITE_` se exponen al cliente cuando se ejecuta Vite.

---

## ▶️ Ejecutar localmente

1. Instala dependencias:

```bash
npm install
```

2. En una terminal inicia el proxy (usa la API key en `.env`):

```bash
npm run start
# ó
node server.js
```

3. En otra terminal inicia la app en modo desarrollo:

```bash
npm run dev
```

- Para producción: `npm run build` y luego `npm run preview` para previsualizar la build.

---

## 🔧 Detalles del proxy y caché

`server.js` actúa como proxy para evitar exponer la API key y para mitigar límites de petición (429). Implementa un simple cache en memoria con TTL por endpoint:

- `competitions`: 24 horas
- `standings`: 5 minutos
- `scorers`: 10 minutos
- `matches`: 1 minuto
- por defecto: 1 minuto

Si ves errores 429 revisa que el proxy esté corriendo y que la caché esté funcionando.

---

## 🧭 Funcionalidades internas importantes

- `useFetch(url)` – hook que llama a `${VITE_API_URL}/api/${url}` y maneja `loading`, `error`, `data`.
- `competitionTools.js` – funciones para calcular jornada actual, partidos pendientes, etc.
- Formato de fecha: `formatDate` con localización `es-AR`.

---

## 🚨 Errores comunes / Solución de problemas

- Si aparece `Error 429` significa que se alcanzó el límite de la API: espera, revisa la configuración del proxy o solicita otra API key.
- Asegúrate de tener `API_KEY` en el `.env` y `VITE_API_URL` apuntando al proxy.

---

## Contribuciones ✅

Si quieres mejorar el proyecto:

- Abre un issue con la propuesta o bug
- Crea un branch, añade tests y PR
