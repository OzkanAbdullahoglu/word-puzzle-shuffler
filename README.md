# Word Puzzle Shuffler

A simple package to shuffle given two words properly to the 3 x 3 matrices.

## Table of Contents

- [Author](#author)


## Usage

[![npm install word-puzzle-shuffler]()]()

### `shuffle.getCellValues(['wordA: string, wordB: string])`
getCellValues returns an array which includes shuffled letters from 0 - 9 indexes, 
Total length of the two words have to be 9 to fit in 3 x 3 matrices.

```const shuffledLetters = shuffle.getCellValues(['LEMON', 'PEAR']);```

```["E","N","O","A","P","M","R","E","L"]```

<p align="center">
<img src="./assets/images/demoCellsValue.png" alt="proper cells value" width="320px" height=160px>
</p>

### `shuffle.getFirstWordIndexes(['wordA: string, wordB: string])`
getFirstWordIndexes returns an array which provides indexes of the first word in 3 x 3 matrices.

```const firstWordIndexes = shuffle.getFirstWordIndexes(['LEMON', 'PEAR']);```
```
[
    [2,2],
    [2,1],
    [1,2],
    [0,2],
    [0,1]
]
```
<p align="center">
<img src="./assets/images/getFirstWordIndexes.png" alt="first word indexes" width="320px" height=160px>
</p>

### `shuffle.getSecondWordIndexes(['wordA: string, wordB: string])`
getSecondWordIndexes returns an array which provides indexes of the second word in 3 x 3 matrices.

```const SecondWordIndexes = shuffle.getSecondWordIndexes(['LEMON', 'PEAR']);```
```
[
    [1,1],
    [0,0],
    [1,0],
    [2,0]
]
```

<p align="center">
<img src="./assets/images/getSecondWordIndexes.png" alt="second word indexes" width="320px" height=160px>
</p>


## Author

- @OzkanAbdullahoglu
