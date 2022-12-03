import { data } from './data.mjs'
const picks = `A Y
B X
C Z`

const getHeroChoiceScore = (hero) => {
    if(hero === 'rock') {
        return 1
    } if (hero === 'paper') {
        return 2
    } if (hero === 'scissors') {
        return 3
    }
    throw ('hero choice not found')
}

const getMatchScore = (p1, p2) => {
    const villianMap = {
        A : 'rock',
        B : 'paper',
        C : 'scissors'
    }
    const heroMap = {
        X : 'rock',
        Y : 'paper',
        Z : 'scissors'
    }
    const win = 6;
    const draw = 3;
    const loss = 0;
    const villian = villianMap[p1];
    const hero = heroMap[p2];

    // draw
    if (villian === hero) {
        return draw + getHeroChoiceScore(hero)
    } 
    // p2 loss
    if (villian === 'rock' && hero === 'scissors'){
        return loss + getHeroChoiceScore(hero)
    }
    if (villian === 'paper' && hero === 'rock'){
        return loss + getHeroChoiceScore(hero)
    }
    if (villian === 'scissors' && hero === 'paper'){
        return loss + getHeroChoiceScore(hero)
    }
    // p2 win
    if (hero === 'rock' && villian === 'scissors'){
        return win + getHeroChoiceScore(hero)
    }
    if (hero === 'paper' && villian === 'rock'){
        return win + getHeroChoiceScore(hero)
    }
    if (hero === 'scissors' && villian === 'paper'){
        return win + getHeroChoiceScore(hero)
    }
}

const tournamentRounds = picks.split('\n');
const calculateTournamentScore = (tournamentRounds) => {
    let score = 0;
    for (const round of tournamentRounds) {
        const picks = round.split(' ');
        score += getMatchScore(picks[0], picks[1])
    }
    return score
}

console.log(calculateTournamentScore(tournamentRounds))