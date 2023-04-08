(() => {
    // prevents form to reload the page
    $("#input-size-div div form").submit(function(e) {
        e.preventDefault();
    });

    // detect the button click and call executeCode function with value
    $("#input-size-div div form #submit-button").click(function(){
        // taking user input
        let chessInputBlock = $('#input-size-div div form input')

        // get input block value
        let chessBlockSize = chessInputBlock.val();

        // print error message if entered value is not range (2 to 50)
        let errorMsg = $('#input-size-div div form #error-message');
        if(chessBlockSize > 50 || chessBlockSize < 4){
            // make the error message visible
            errorMsg.css("visibility", "visible");
            // clear the input box
            chessInputBlock.val('')
            return;
        }
        else{
            // hide error message if input value is in range (2 to 50)
            errorMsg.css("visibility", "hidden");
        }

        // disable button click until the executeCode() function completes
        let button = $('#input-size-div div form #submit-button');
        button.prop('disabled', true);
        button.css({
            "cursor": "not-allowed",
            "background-color": "darkseagreen"
        });
        button.hover(
            function () {
                $(this).css({"background-color": "limegreen"});
            },
            function () {
                $(this).css({"background-color": "limegreen"});
            }
        );

        // n-queen program execution handler
        executeCode(chessBlockSize).then(()=>{
            // enable button after executeCode() function ends
            button.prop('disabled', false);
            button.css({
                "cursor": "default",
                "background-color": "limegreen"
            });
            button.hover(
                function () {
                    $(this).css({"background-color": "lawngreen"});
                },
                function () {
                    $(this).css({"background-color": "limegreen"});
                }
            );
        });
    });

    // handle reset button click
    $("#input-size-div div form #reset-button").click(function(){
        // reload the website
        // ISSUE: looking for better alternative where website or js resets without reloading the entire page
        location.reload();
    });

    function putBlocksInChess(chessBlockSize){
        let chessBoard = $('#chess-board');

        // empty the chess board & possible outcomes screen & also the set possible outcomes count to 0
        chessBoard.empty();
        $("#possible-outcomes #possible-outcomes-container").empty();
        $("#possible-outcomes h2 span").text("0");


        // initialize a 2d array to store information of all the chess blocks
        let chessBlockArray = [];

        // arrange the boxes into the chess board
        for(let i=0 ; i < chessBlockSize ; i++){
            let chessBlockLine = [];
            for(let j=0 ; j < chessBlockSize ; j++){
                let chessBlock = $(`<div></div>`);
                chessBoard.append(chessBlock);
                chessBlock.attr({
                    'id'   : `block_${i.toString() + j.toString()}`,
                    'class': "chess-block"
                });
                chessBlockLine.push(chessBlock);
            }
            chessBlockArray.push(chessBlockLine);
        }

        // set size of each block to fit into the square board
        $('#chess-board .chess-block').css({
            "height" : `calc((${chessBoard.css('height')}/${chessBlockSize}) - 4px)`,
            "width"  : `calc((${chessBoard.css('width')}/${chessBlockSize}) - 4px)`
        });

        // return the 2d array of chess blocks
        return chessBlockArray;
    }

    function canBePlaced(chessBlockArray, x, y){
        // checking from left to right of a line
        for (let i=0 ; i < chessBlockArray.length ; i++) {
            if (chessBlockArray[x][i].css("background-color") === 'rgb(255, 0, 0)') {
                return false;
            }
        }

        // checking from top to bottom of a line
        for (let i=0 ; i < chessBlockArray.length ; i++) {
            if (chessBlockArray[i][y].css("background-color") === 'rgb(255, 0, 0)') {
                return false;
            }
        }

        // checking in top-right-diagonal
        let a = x;
        let b = y;
        while( (a < chessBlockArray.length)  &&  (b > 0) ){
            if (chessBlockArray[a][b].css("background-color") === 'rgb(255, 0, 0)') {
                return false;
            }
            a++;
            b--;
        }

        // checking in bottom-right-diagonal
        a = x;
        b = y;
        while((a < chessBlockArray.length)  &&  (b < chessBlockArray.length)){
            if (chessBlockArray[a][b].css("background-color") === 'rgb(255, 0, 0)') {
                return false;
            }
            a++;
            b++;
        }

        // checking in top-left-diagonal
        a = x;
        b = y;
        while( (a >= 0)  &&  (b >= 0) ){
            if (chessBlockArray[a][b].css("background-color") === 'rgb(255, 0, 0)') {
                return false;
            }
            a--;
            b--;
        }

        // checking in bottom-left-diagonal
        a = x;
        b = y;
        while( (a >= 0 )  &&  (b < chessBlockArray.length) ){
            if (chessBlockArray[a][b].css("background-color") === 'rgb(255, 0, 0)') {
                return false;
            }
            a--;
            b++;
        }

        return true;
    }

    // add a delay for light change transition
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function solveNQueen(chessBlockArray, row=0){
        // append the combination generated to the possible outcomes screen
        // also it is the base case of the N-Queen problem recursion
        if(row === chessBlockArray.length){
            // append the same generated div to possible outcomes screen
            let outcomeDiv = $('#chess-board').clone().prependTo('#possible-outcomes-container');

            // altering height and width to fit into the screen
            outcomeDiv.css({
                "width": "calc(80vw - 100vh - 100px)",
                "height": "calc(80vw - 100vh - 100px)",
                "margin": "50px",
                "padding": "0"
            });

            // altering children divs i.e. chess-blocks to fit into the screen
            outcomeDiv.children().css({
                "width": `calc((80vw - 100vh - 100px)/${chessBlockArray.length} - 4px)`,
                "height": `calc((80vw - 100vh - 100px)/${chessBlockArray.length} - 4px)`,
            });

            // increment count of outcomes by 1
            let possibleOutcomeCount = $("#possible-outcomes h2 span");
            possibleOutcomeCount.text(parseInt(possibleOutcomeCount.text()) + 1);

            await sleep(2000);
            return;
        }

        for(let i=0 ; i<chessBlockArray.length ; i++){
            if(canBePlaced(chessBlockArray, row, i)){
                chessBlockArray[row][i].css("background-color", 'red');
                await sleep(500);
                await solveNQueen(chessBlockArray, row+1);
                chessBlockArray[row][i].css("background-color", 'limegreen');
            }
        }
    }

    async function executeCode(chessBlockSize){
        // step 1 is to put n blocks in chess board
        let chessBlockArray = putBlocksInChess(chessBlockSize);

        // step 2 is to solve the N-Queen problem
        await solveNQueen(chessBlockArray).then(()=>{});
    }
})();