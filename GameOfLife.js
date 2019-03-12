
var t = true;

function main(){
    //Program requires a file name to start
    if(process.argv.length!= 2) {
        console.log("This program requires a file name and no other parameters to start");
        process.exit(1)
    }

//New Game Of Life object
    let gol = new GameOfLife();

    //Data from the given filename put into grid
    gol.loadGrid(process.argv[2]);
    console.log("Beginning with grid size " + gol.rows + "," + gol.cols);
    console.log(gol.toString());


    while(t){
        //Takes the input of the user
            let line = readlineSync.question("Press return for next generation, n to iterate multiple times,\n"
                + "w to save grid to disk, or q to quit? ");
            line = line.trim().toLowerCase();
            switch (line) {
                //Quit
                case "q":
                    console.log("Exiting program");
                    process.exit(0);
                    break;
                //Saves
                case "w":
                    let filename = readlineSync.question("Enter a filename: ");
                    gol.saveGrid(filename.trim());
                    console.log("Grid saved to file " + filename + "\n");
                    break;

                case "n":
                    let num = parseInt(readlineSync.question("How many iterations? "));
                    for (let i = 0; i < num; i++) {
                        gol.mutate();
                        console.log(gol.toString());
                    }
                    break;
                case "":
                    gol.mutate();
                    console.log(gol.toString());
                    break;


            }
        }
    }

