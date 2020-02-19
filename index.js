/* eslint-disable linebreak-style */
import { includes } from 'ramda';
// mathJS library
const math = require('mathjs');

// holding all randomised new assigned indexes
let randomisedIndexesArray = [];
// holding end values of matrice - in our case randomised letters-
const values = [];
// holding randomised indexes for the first word
let assignedIndexForFirstWord = [];
// holding randomised indexes for the second word
let assignedIndexForSecondWord = [];
let indexes = [];

/**
 *  @description constants to pick random number
 */
const pickerOne = () => math.pickRandom([0, 1, 2]);
const pickerZero = () => math.pickRandom([0, 1]);
const pickerTwo = () => math.pickRandom([1, 2]);

// creating a 3 x 3 matrice with values of ones
const matrice = math.ones(3, 3);

/**
 *  @description we are just taking indexes to use its length for the next steps
 *  this function will be replaced  ( we will use matrices' size instead)
 */
const getTestingIndexes = () => {
  indexes = [];
  matrice.forEach((value, index) => {
    indexes.push(index);
  });
};

/**
 *  @description reset all of the process
 *  and start the loop again to find out the right randomised replacement
 *  @param {Object[]} words- array which keeps the words of the game
 */
const reset = (words) => {
  randomisedIndexesArray = [];
  assignedIndexForFirstWord = [];
  assignedIndexForSecondWord = [];
  randomiseAll(words);
};

/**
 *  @description trigger function to generate new random indexes for both words
 *  @param {Object[]} words- array which keeps the words of the game
 */
const randomiseAll = (words) => {
    // sorting the words in ascending order according to their length
  words.sort((a, b) => a.length - b.length);
  generateRandomIndexes(words[0].split(''), assignedIndexForFirstWord, words);
  generateRandomIndexes(words[1].split(''), assignedIndexForSecondWord, words);
};

/**
 *  @description generating all random indexes per word (initial + ...rest)
 *  @param {string} singleWord- one of the word from words array
 *  @param {Object[]} assignedIndexesPerWord- we will keep randomised indexes,
 *  in a seperated array for every word. ( In case of future needs)
 *  @param {Object[]} words- array which keeps the words of the game
 */
const generateRandomIndexes = (singleWord, assignedIndexesPerWord, words) => {
  getInitialIndex(assignedIndexesPerWord);
  for (let i = 1, len = singleWord.length; i < len; i += 1) {
    infiniteLoop(assignedIndexesPerWord, words);
  }
};

/**
 *  @description get the starting index for the first letter in the word.
 *  We have to assing an initial random value for the begining
 *  So in the next steps we will produce the following random index values,
 *  according to previous one.(There has to be a begining)
 *  @param {Object[]} assignedIndexes- we will keep all randomised values in an array.
 */
const getInitialIndex = (assignedIndexes) => {
  const indX = math.pickRandom([0, 1, 2]);
  const indY = math.pickRandom([0, 1, 2]);
  const getInit = () => {
    if (includes([indX, indY], randomisedIndexesArray)) {
      return getInitialIndex(assignedIndexes);
    }
    assignedIndexes.push([indX, indY]);
    randomisedIndexesArray.push([indX, indY]);
  };
  getInit();
};

/**
 *  @description pick random following index according to the previous index
 *  @param {Object[]} prevIndex- this is an array which keeps previous index
 */
const pickFollowingIndex = (prevIndex) =>
    (prevIndex === 0 ? pickerZero() : prevIndex === 1 ? pickerOne() : pickerTwo());

/**
 *  @description get the following index according to the previous index
 *  and hold them into seperated arrays
 *  @param {Object[]} assignedIndexes- we will keep all randomised values in an array.
 *  @param {number} indX- x coordinate of index
 *  @param {number} indY- y coordinate of index
 */
const push = (assignedIndexes, indX, indY) => {
  assignedIndexes.push([indX, indY]);
  randomisedIndexesArray.push([indX, indY]);
};

/**
 *  @description an infinite loop which continuesly generate random values,
 *  If there is a deadend we break the loop and reset the process
 *  @param {Object[]} assignedIndexes- we will keep all randomised values in an array.
 *  @param {Object[]} words- array which keeps the words of the game
 */
const infiniteLoop = (assignedIndexes, words) => {
  for (let count = 0; ; count += 1) {
    const indX = pickFollowingIndex(assignedIndexes[assignedIndexes.length - 1][0]);
    const indY = pickFollowingIndex(assignedIndexes[assignedIndexes.length - 1][1]);
    if (!includes([indX, indY], randomisedIndexesArray)) {
      return push(assignedIndexes, indX, indY);
    }
        // This is to stop the execution immediately in case of finding the solution
    if (randomisedIndexesArray.length === indexes.length) {
      break;
    }
        // If we loop for twenty-five times for a letter,
        // we break the loop and reset the process,twenty-five times seems to be optimal
    if (count === 25) {
      reset(words);
      break;
    }
  }
};

/**
 *  @description finally, we replace the initial indexes (just ones) with
 *  the randomised indexes into the matrice so we can gather its values
 *  in the final step
 *  @param {Object[]} words- array which keeps the words of the game
 */
const replaceValuesInMatrix = (words) => {
  assignedIndexForFirstWord.map((elm, index) =>
        matrice.subset(math.index(elm[0], elm[1]), words[0].split('')[index])
    );
  assignedIndexForSecondWord.map((elm, index) =>
        matrice.subset(math.index(elm[0], elm[1]), words[1].split('')[index])
    );
};

/**
 *  @description we are exporting this function which ignites the process
 *  @param {Object[]} words- array which keeps the words of the game
 */
const shuffle = (words) => {
    // checking inputs
  if (!Array.isArray(words)) throw Error('Words must be in an array');
  if (words.length !== 2) throw Error('Just Two words can be accepted!');
  if (words.map((e) => e.filter((f) => typeof (f) !== 'string').length) > 0) throw Error('Just strings are accepted!');
    // to reset the old values
  values.length = 0;
  getTestingIndexes();
  reset(words);
  replaceValuesInMatrix(words);
    // collecting final values (randomised indexes) from matrice after replacement
  matrice.forEach((value) => {
    values.push(value);
  });
  return {
    value: values,
    firstWordIndexes: assignedIndexForFirstWord,
    secondWordIndexes: assignedIndexForSecondWord,
  };
};

module.exports = {
  shuffle,
};

