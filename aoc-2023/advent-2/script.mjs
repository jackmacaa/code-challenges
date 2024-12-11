import { data } from './data.mjs'
const villianMap = {
    A : 'rock',
    B : 'paper',
    C : 'scissors'
}
const win = 6;
const draw = 3;
const loss = 0;

// PART 1
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
    const heroMap = {
        X : 'rock',
        Y : 'paper',
        Z : 'scissors'
    }
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

const tournamentRounds = data.split('\n');
const calculateTournamentScore = (tournamentRounds) => {
    let score = 0;
    for (const round of tournamentRounds) {
        const picks = round.split(' ');
        score += getMatchScore(picks[0], picks[1])
    }
    return score
}
console.log(`Day 1: ${calculateTournamentScore(tournamentRounds)}`);

// PART 2
const getMatchScoreP2 = (p1, p2) => {
    const heroMap = {
        X : 'lose',
        Y : 'draw',
        Z : 'win'
    }
    const villian = villianMap[p1];
    const hero = heroMap[p2];

    // draw
    if (villian === 'rock' && hero === 'draw'){
        return draw + getHeroChoiceScore(villian)
    }
    if (villian === 'paper' && hero === 'draw'){
        return draw + getHeroChoiceScore(villian)
    }
    if (villian === 'scissors' && hero === 'draw'){
        return draw + getHeroChoiceScore(villian)
    }
    // p2 loss
    if (villian === 'rock' && hero === 'lose'){
        return loss + getHeroChoiceScore('scissors')
    }
    if (villian === 'paper' && hero === 'lose'){
        return loss + getHeroChoiceScore('rock')
    }
    if (villian === 'scissors' && hero === 'lose'){
        return loss + getHeroChoiceScore('paper')
    }
    // p2 win
    if (villian === 'rock' && hero === 'win'){
        return win + getHeroChoiceScore('paper')
    }
    if (villian === 'paper' && hero === 'win'){
        return win + getHeroChoiceScore('scissors')
    }
    if (villian === 'scissors' && hero === 'win'){
        return win + getHeroChoiceScore('rock')
    }
}
const tournamentRoundsP2 = data.split('\n');
const calculateTournamentScoreP2 = (tournamentRounds) => {
    let score = 0;
    for (const round of tournamentRounds) {
        const picks = round.split(' ');
        score += getMatchScoreP2(picks[0], picks[1])
    }
    return score
}
console.log(`Day 2: ${calculateTournamentScoreP2(tournamentRoundsP2)}`);

