'use strict';

//*********************************************************
//Filename: life.js
//
//Author: Josef Hartsough, Jarod Collier, Maz Ashgar
//*********************************************************
const readlineSync = require('readline-sync');

//Node.js file system -this is required to use the file system
let fs = require('fs');

// Class that represents Game of Life
class GameOfLife {

    // Constructor that sets up instance variables with default values
    constructor() {
        this.grid = [];
        this.rows = 0;
        this.cols = 0;
    }

    mutate() {
       //Copy of original grid
        let temp_grid = new Array(this.x);
        for (let i = 0; i < this.x; i++) {
            temp_grid[i] = new Array(this.cols);
            temp_grid[i].fill(0);
        }

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let liveNeighbor = this.getNeighbors(i, j);
                //a cell with less than 2 live neighbors dies
                if (this.grid[i][j] !== 0 && liveNeighbor < 2) {
                    temp_grid[i][j] = 0;
                }
                //a cell with 2 or 3 live neighbors lives
                else if (this.grid[i][j] !== 0 && (liveNeighbor === 2 || liveNeighbor === 3)) {
                    temp_grid[i][j] = 1;
                }
                //a cell with greater than 3 live neighbors dies
                else if (this.grid[i][j] !== 0 && liveNeighbor > 3) {
                    temp_grid[i][j] = 0;
                }
                // a dead cell with 3 live neighbors becomes live(gets birthed)
                else if (this.grid[i][j] === 0 && liveNeighbor >= 3) {
                    temp_grid[i][j] = 1;
                }
                // if we get this far then no changes required, so just copy this element
                else {
                    temp_grid[i][j] = this.grid[i][j];
                }
            }
        }
        this.grid = temp_grid;
    }

    // Returns the number of neighbors for cell at this.grid[i][j]
    getNeighbors(i, j) {
        let live_neighbors = 0;
        // 3 neighbors on row above cell
        if (i-1 >= 0 && j-1 >= 0 && this.grid[i-1][j-1] > 0) live_neighbors++;   // test cell up-left
        if (i-1 >= 0             && this.grid[i-1][j]   > 0) live_neighbors++;   // test cell up
        if (i-1 >= 0 && j+1 < y  && this.grid[i-1][j+1] > 0) live_neighbors++;   // test cell up-right
        // 2 neighbors on same row as cell
        if (j-1 >= 0             && this.grid[i][j-1] > 0) live_neighbors++;     // test cell left
        if (j+1 <  y             && this.grid[i][j+1] > 0) live_neighbors++;     // test cell right
        // 3 neighbors on row below cell
        if (i+1 < x && j-1 >= 0  && this.grid[i+1][j-1] > 0) live_neighbors++;    // test cell down-left
        if (i+1 < x              && this.grid[i+1][j] > 0)   live_neighbors++;    // test cell down
        if (i+1 < x && j+1 < y   && this.grid[i+1][j+1] > 0) live_neighbors++;    // test cell down-right
        return live_neighbors;
    }


    // Display the grid
    toString() {
        let str = '\n';
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.grid[i][j] === 0) {
                    str += ' 0 ';
                } else {
                    str += ' X ';
                }
            }
            str += "\n";
        }
        return str;
    }
}

