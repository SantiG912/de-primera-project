export default function getRelevantMatchday(matchesByMatchday) {

    if(!matchesByMatchday || typeof matchesByMatchday !== "object"){
        return null;
    }

    const today = new Date();
    
    const matchdays = Object.entries(matchesByMatchday)
        .filter(([day, matches]) => 
            Number.isFinite(Number(day)) &&
            Array.isArray(matches) &&
            matches.length > 0
        )
        .map(([day]) => Number(day))
        .sort((a, b) => a - b);
    
    if(matchdays.length === 0) return null;

    for (const day of matchdays) {

        const matches = matchesByMatchday[String(day)];

        if (
            Array.isArray(matches) &&
            matches.some(
            m =>
                m.status === "IN_PLAY" ||
                new Date(m.utcDate).toDateString() === today.toDateString()
            )
        ) {
            return day;
        }
    }

    for (const day of matchdays) {

        const matches = matchesByMatchday[String(day)];

        if (
            Array.isArray(matches) &&
            matches.some(m => m.status === "SCHEDULED")
        ) {

            return day;

    }

}

    return matchdays[0];
    
}
