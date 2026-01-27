export function getCurrentMatchday(matches){
    if(!Array.isArray(matches) || matches.length === 0) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const byMatchday = {};

    for(const match of matches){
        if(!Number.isFinite(match.matchday)) continue;

        if(!byMatchday[match.matchday]){
            byMatchday[match.matchday] = [];
        }
        byMatchday[match.matchday].push(match);
    }

    const matchdays = Object.entries(byMatchday)
        .map(([day, matches]) => {
            const dates = matches
                .map(m => new Date(m.utcDate))
                .filter(d => !isNaN(d));
            
                return {
                    day: Number(day),
                    matches,
                    firstDate: new Date(Math.min(...dates))
                };
        })
        .sort((a, b) => a.firstDate - b.firstDate);

        for(const md of matchdays){
            if(
                md.matches.some(
                    m => 
                        m.status === "IN_PLAY" ||
                        new Date(m.utcDate).toDateString() === today.toDateString()
                )
            ) {
                return md.day;
            }
        }

        for(const md of matchdays){
            if(md.firstDate > today){
                return md.day;
            }
        }

        return matchdays.at(-1)?.day ?? null;

}

export function getMatchdayStartDate(matches, matchday){
    const dates = matches
        .filter(m => m.matchday === matchday)
        .map(m => new Date(m.utcDate))
        .filter(d => !isNaN(d));

    if(dates.length === 0) return null;

    return new Date(Math.min(...dates));
}

export function getPendingMatches(matches, currentMatchday){
    if(!Array.isArray(matches) || !currentMatchday) return [];
    if(!Number.isFinite(currentMatchday)) return [];

    return matches.filter(match => {
        if(match.status !== "TIMED") return false;
        if(!Number.isFinite(match.matchday)) return false;
 
        return match.matchday < currentMatchday;
    });
}

export function getMatchdayByDate(matches){
    const today = new Date();

    const futureMatches = matches
        .filter(m => Number.isFinite(m.matchday))
        .map(m => ({
            matchday: m.matchday,
            date: new Date(m.utcDate)
        }))
        .filter(m => m.date >= today)
        .sort((a, b) => a.date - b.date);

    if(futureMatches.length > 0){
        return futureMatches[0].matchday;
    }

    return Math.max(
        ...matches
            .filter(m => Number.isFinite(m.matchday))
            .filter(m => m.status !== "SCHEDULED")
            .filter(m => m.matchday)
    );
}

export function isRegularStage(stage){
    return stage === "GROUP_STAGE" || stage === "LEAGUE_STAGE";
}