const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note. 

💡 HINT: You may want to filter the data first 😉*/
const finals2014 = fifaData.filter((item) => {
return item.Year === 2014 && item.Stage === 'Final';
});
console.log(finals2014);
//(a) Home Team name for 2014 world cup final
console.log('Task 1a', finals2014[0] ['Home Team Name']);
//(b) Away Team name for 2014 world cup final
console.log('Task 1b', finals2014[0] ['Away Team Name']);
//(c) Home Team goals for 2014 world cup final
console.log('Task 1c', finals2014[0] ['Home Team Goals']);
//(d) Away Team goals for 2014 world cup final
console.log('Task 1d', finals2014[0] ['Away Team Goals']);
//(e) Winner of 2014 world cup final */
console.log('Task 1e', finals2014[0] ['Win conditions']);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive an array as a parameter that will take the fifa data as its argument
2. Return an array of objects with the data of the teams that made it to the final stage

💡 HINT - you should be looking at the stage key inside of the objects
*/

function getFinals(matches) {
    // 1. Use the Array filter method to find objects with 'Stage' equal to 'Final'
    const finals = matches.filter(match => {
        // 2. Return true if the 'Stage' key of the match object is 'Final'
        return match.Stage === 'Final';
    });

    // 3. Return the array of objects containing data of the teams that made it to the final stage
    return finals;
}

const finalMatches = getFinals(fifaData);
console.log(finalMatches);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(matches, callback) {
    // 1. Call the callback function with the matches array
    const finals = callback(matches);

    // 2. Use the Array map method to create a new array of years from the finals data set
    const years = finals.map(match => {
        // 3. Return the 'Year' key of the match object
        return match.Year;
    });

    // 4. Return the array of years
    return years;
}

const finalYears = getYears(fifaData, getFinals);
console.log(finalYears);



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Determines the winner (home or away) of each `finals` game. 
💡 HINT: Don't worry about ties for now (Please see the README file for info on ties for a stretch goal.)
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(matches, callback) {
    // 1. Call the callback function with the matches array
    const finals = callback(matches);

    // 2. Use the Array map method to create a new array of winners from the finals data set
    const winners = finals.map(match => {
        // 3. Determine the winner (home or away) of each finals game
        if (match['Home Team Goals'] > match['Away Team Goals']) {
            return match['Home Team Name'];
        } else {
            return match['Away Team Name'];
        }
    });

    // 4. Return the array of winners
    return winners;
}

const finalWinners = getWinners(fifaData, getFinals);
console.log(finalWinners);



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Receive a callback function as the third parameter that will take getYears from task 3 as an argument
4. Receive a callback function as the fourth parameter that will take getWinners from task 4 as an argument
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

💡 HINT: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(matches, getFinalsCallback, getYearsCallback, getWinnersCallback) {
    // 1. Call the callback functions with the matches array
    const finals = getFinalsCallback(matches);
    const years = getYearsCallback(matches, getFinalsCallback);
    const winners = getWinnersCallback(matches, getFinalsCallback);

    // 2. Use the Array map method to create a new array of strings
    const winnersByYear = years.map((year, index) => {
        // 3. Return the string "In {year}, {country} won the world cup!"
        return `In ${year}, ${winners[index]} won the world cup!`;
    });

    // 4. Return the array of strings
    return winnersByYear;
}

const winnersByYear = getWinnersByYear(fifaData, getFinals, getYears, getWinners);
console.log(winnersByYear);


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function `getAverageGoals` to do the following: 
 1. Receive a callback function as a parameter that will take `getFinals` (from task 2) as an argument; ensure you pass in `fifaData` as its argument
 
 💡 HINT: Example of invocation: `getAverageGoals(getFinals(fifaData));`

 2. Calculate the AVERAGE number of the TOTAL home team goals AND TOTAL away team goals scored PER MATCH

 3. Round to the second decimal place and return the value
 
 💡 HINT: use .reduce, .toFixed (refer to MDN for syntax), and do this in 2 steps) 
 
*/

function getAverageGoals(finals) {
    // 1. Calculate the total number of goals using the reduce method
    const totalGoals = finals.reduce((accumulator, match) => {
        return accumulator + match['Home Team Goals'] + match['Away Team Goals'];
    }, 0);

    // 2. Calculate the average number of goals per match
    const averageGoals = totalGoals / finals.length;

    // 3. Round to the second decimal place and return the value
    return averageGoals.toFixed(2);
}

const averageGoals = getAverageGoals(getFinals(fifaData));
console.log(averageGoals);




/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(/* code here */) {

    /* code here */

}



/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {

    /* code here */

}


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
