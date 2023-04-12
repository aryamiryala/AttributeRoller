const defaultAttributeScores = [15, 14, 13, 12, 10, 8];

class Player{
    constructor(characterName = 'Naruto'){
        this.name = characterName; 
        this.attributes = {
            strength: 0,
            dexterity: 0, 
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        };
        let shuffledResult = shuffleArray(defaultAttributeScores);
        for(const [key, val] of Object.entries(this.attributes)){
            //get value from array
            let attributeVal = shuffledResult.pop(); 
            //set to key; strenght gets first, dexterity 2nd, etc.
            this.attributes[key] = attributeVal; 
        }

    }

    rollAttributes(){
        for(const key in this.attributes){
            let results = diceRoller(4, 6);
            results.sort(function(a,b){return a - b}); //numeric sort w/compare function
            results.shift(); //remove lowest die roll
            let sum = sumArrayElements(results); //sum rolls
            this.attributes[key] = sum;
        }
    }
    printPlayer(){
        console.log(`NAME: ${this.name}`);
        for(const [key, value] of Object.entries(this.attributes)){
            console.log(`${key.slice(0,3).toUpperCase()}: ${value}`);
        }
    }
} 

const player01 = new Player(); 
player01.printPlayer(); 
const player02 = new Player('Son Goku');
player02.rollAttributes(); 
player02.printPlayer(); 

// Fisher-Yates algorithm for randomly sorting an array
// from: https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
// adapted to JS and reconfigured to return a new (non-mutated) array
function shuffleArray(targetArray){
    let shuffle = Array.from(targetArray);
    for(let i = shuffle.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        const temp = shuffle[i];
        shuffle[i] = shuffle[j];
        shuffle[j] = temp;
    }
    return shuffle;
}

function diceRoller(times, sides){
    let results = []; 
    for(let i = 0; i < times; i++){
        results.push(Math.floor(Math.random() * sides + 1));

    }
    return results; 
}

function sumArrayElements(array){
    let sum = 0; 
    for(let i = 0; i < array.length; i++){
        sum += array[i];
    }
    return sum; 
}