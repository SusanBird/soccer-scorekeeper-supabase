import { 
    logout, 
    checkAuth,
    getGames,
    createGame,
} from '../fetch-utils.js';
import { renderGame } from '../render-utils.js';

const currentGameEl = document.getElementById('current-game-container');
const pastGamesEl = document.getElementById('past-games-container');
const logoutButton = document.getElementById('logout');

const nameForm = document.getElementById('name-form');
const teamOneAddButton = document.getElementById('team-one-add-button');
const teamTwoAddButton = document.getElementById('team-two-add-button');
const teamOneSubtractButton = document.getElementById('team-one-subtract-button');
const teamTwoSubtractButton = document.getElementById('team-two-subtract-button');
const finishGameButton = document.getElementById('finish-game-button');
const teamOneLabel = document.getElementById('team-one-name');
const teamTwoLabel = document.getElementById('team-two-name');

checkAuth();

// const pastGames = [];
let currentGame = {
    name1: '',
    name2: '',
    score1: 0,
    score2: 0,
};



nameForm.addEventListener('submit', (e) => {
    // don't forget to prevent the default form behavior!
    e.preventDefault();

    // get the name data from the form
    const data = new FormData(nameForm);

    // set the state to this data from the form
    currentGame.name1 = data.get('.team-one');
    currentGame.name2 = data.get('.team-two');

    // reset the form values
    nameForm.reset(); 

    displayCurrentGameEl();
});


teamOneAddButton.addEventListener('click', () => {
    // increment the current state for team one's score
    currentGame.score1++;
    
    displayCurrentGameEl();
});

teamTwoAddButton.addEventListener('click', () => {
    // increment the current state for team two's score
    currentGame.score2++;

    displayCurrentGameEl();
});

teamOneSubtractButton.addEventListener('click', () => {
    // decrement the current state for team one's score
    currentGame.score1--;

    displayCurrentGameEl();
});

teamTwoSubtractButton.addEventListener('click', () => {
    // decrement the current state for team two's score
    currentGame.score2--;

    displayCurrentGameEl();
});

finishGameButton.addEventListener('click', async() => {
    // create a new game using the current game state

    await createGame(currentGame);
    
    // console.log(pastGames);

    // let currentGameArr = { name1: name1, name2: name2, score1: score1, score2: score2 };
    // pastGames.push(currentGameArr);

    displayAllGames();

    // after creating this new game, re-fetch the games to get the updated state and display them (hint: call displayAllGames())
            
    currentGame.name1 = '';
    currentGame.name2 = '';
    currentGame.score1 = 0;
    currentGame.score2 = 0;

    displayCurrentGameEl();
});

logoutButton.addEventListener('click', () => {
    logout();
});

 // on load . . .
window.addEventListener('load', async() => {
    // display all past games (hint: call displayAllGames())

    await displayAllGames();
});


function displayCurrentGameEl() {
    // clear out the current game div
    currentGameEl.textContent = '';

    // change the label to show team one's name;
    // change the label to show team two's name;
    teamOneLabel.textContent = currentGame.name1;
    teamTwoLabel.textContent = currentGame.name2;

    // call the render game function to create a game element
    const gameEl = renderGame(currentGame);
    currentGameEl.classList.add('current');

    // append the element to the cleared out current game div
    currentGameEl.append(gameEl);
}


async function displayAllGames() {
    // clear out the past games list in the DOM
    pastGamesEl.textContent = '';

    // FETCH ALL GAMES from supabase
    const games = await getGames();
    // loop through the past games 
    // render and append a past game for each past game in state

    for (let game of games){
      
        const gameEl = renderGame(game);

        //gameEl.classList.add('past');

        pastGamesEl.append(gameEl);
    }
}


displayCurrentGameEl();
