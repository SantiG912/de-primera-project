const MULTI_STAGE = new Set([
    "ROUND_1",
    "ROUND_2",
    "GROUP_STAGE",
    "LEAGUE_STAGE",
    "LAST_16",
    "QUARTER_FINALS",
    "SEMI_FINALS",
    "THIRD_PLACE",
    "FINAL"
]);

export function getCurrentMatchday(matches){
    
    const today = new Date();

    const matchdays = matches
        .filter(m => Number.isFinite(m.matchday))
        .sort((a, b) => a.matchday - b.matchday);

    for(const match of matchdays){
        const matchDate = new Date(match.utcDate);
        if(matchDate >= today){
            return match.matchday;
        }
    }

    return matchdays.at(-1)?.matchday ?? null;
}

export function groupByStageAndMatchday(matches){

    const day = Number.isFinite(matches.matchday) ? matches.matchday : 1;

    const result = {};

    for(const match of matches){
        const stage = match.stage;
        if(!stage) continue;

        if(!result[stage]) {
            result[stage] = {};
        }

        if(Number.isFinite(match.matchday)){
            if(!result[stage][match.matchday]){
                result[stage][match.matchday] = [];
            }
            result[stage][match.matchday].push(match);
        }
    }

    return result;

}

export default function isValidForMatchday(stage, isMultiStage){
    
    return isMultiStage
    ? MULTI_STAGE.has(stage)
    : stage === "REGULAR_SEASON";
    
}

export function filterMatches(matches, isMultiStage){
    return matches.filter(match =>{
        if(!Number.isFinite(match.matchday)) return false;

        if(isMultiStage){
            return ["GROUP_STAGE", "LEAGUE_STAGE"].includes(match.stage);
        }

        return match.stage === "REGULAR_SEASON";

    })
}

export function isMultiStage(stages = []){
    return stages.some(stage => 
        stage !== "REGULAR_SEASON"
    );
}