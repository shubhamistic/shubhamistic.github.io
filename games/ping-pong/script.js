// IIFE
(function() {
    // creating score DOM object.
    let score = document.getElementById("score");
    score.innerText = "0";
    score.style.color= "whitesmoke";

    // getting screen width and height.
    let windowInnerWidth = window.innerWidth;
    let windowInnerHeight = window.innerHeight;

    // creating rod1 and rod2 attribute and setting their left position to '0px'.
    let rod1 = document.getElementById("rod1");
    rod1.style.left = getComputedStyle(rod1).left;
    let rod2 = document.getElementById("rod2");
    rod2.style.left = getComputedStyle(rod2).left;

    // adding keypress event listener for key 'a' & 'd'.
    window.addEventListener('keypress', (event) => {
        let totalIterations = 40;
        if((event.key === 'a') || (event.key === 'A')){
            // decrementing and setting new left value of rod by '120px'.
            let currentIterations = 0;
            let rodInterval = setInterval(function (){
                if(parseInt(rod1.style.left) > 0) {
                    if (currentIterations === totalIterations) {
                        clearInterval(rodInterval);
                    }
                    rod1.style.left = (parseInt(rod1.style.left) - 3) + "px";
                    rod2.style.left = (parseInt(rod2.style.left) - 3) + "px";
                    currentIterations++;
                }
                else{
                    clearInterval(rodInterval);
                }
            });
        }
        else if((event.key === 'd') || (event.key === 'D')){
            // incrementing and setting new left value of rod by '120px'.
            let currentIterations = 0;
            let rodInterval = setInterval(function (){
                if((parseInt(rod1.style.left)+200) < windowInnerWidth) {
                    if (currentIterations === totalIterations) {
                        clearInterval(rodInterval);
                    }
                    rod1.style.left = (parseInt(rod1.style.left)+3) + "px";
                    rod2.style.left = (parseInt(rod2.style.left)+3) + "px";
                    currentIterations++;
                }
                else{
                    clearInterval(rodInterval);
                }
            });
        }
    });

    // for moving the ball.
    // creating ball attribute.
    let windowInnerWidthForBall = window.innerWidth-25;
    let windowInnerHeightForBall = window.innerHeight-25;
    let ball = document.getElementById("ball");
    ball.style.left = getComputedStyle(ball).left;
    ball.style.top = getComputedStyle(ball).top;
    let initialPosition = "bottom";
    let finalPosition = "left";

    let ballInterval = setInterval(function (){
        let currentBallPosition = ball.getBoundingClientRect();
        if((initialPosition === "bottom") && (finalPosition === "left")){
            finalPosition = null;
            // ball should move to "left";
            // console.log("left", currentBallPosition.left, currentBallPosition.top, 0, (windowInnerHeightForBall-currentBallPosition.left), "trbl")
            moveBallTo(currentBallPosition.left, currentBallPosition.top, 0, (windowInnerHeightForBall-currentBallPosition.left), "trbl", "left");
        }
        else if((initialPosition === "left") && (finalPosition === "top")){
            finalPosition = null;
            // ball should move to "top";
            // console.log("top", currentBallPosition.left, currentBallPosition.top, currentBallPosition.top, 0, "trbl");
            moveBallTo(currentBallPosition.left, currentBallPosition.top, currentBallPosition.top, 0, "trbl", "top");
        }
        else if((initialPosition === "top") && (finalPosition === "right")){
            finalPosition = null;
            // ball should move to "right";
            // console.log("right", currentBallPosition.left, currentBallPosition.top, windowInnerWidthForBall, windowInnerHeightForBall-(windowInnerWidthForBall-currentBallPosition.left), "trbl");
            moveBallTo(currentBallPosition.left, currentBallPosition.top, windowInnerWidthForBall, windowInnerWidthForBall-currentBallPosition.left, "trbl", "right");
        }
        else if((initialPosition === "right") && (finalPosition === "bottom")){
            finalPosition = null;
            // ball should move to "bottom";
            // console.log("bottom", currentBallPosition.left, currentBallPosition.top, windowInnerWidthForBall-(windowInnerHeightForBall-currentBallPosition.top), windowInnerHeightForBall, "trbl");
            moveBallTo(currentBallPosition.left, currentBallPosition.top, windowInnerWidthForBall-(windowInnerHeightForBall-currentBallPosition.top), windowInnerHeightForBall, "trbl" , "bottom");
        }
        else if((initialPosition === "bottom") && (finalPosition === "right")){
            finalPosition = null;
            // ball should move to "right";
            // console.log("right", currentBallPosition.left, currentBallPosition.top, windowInnerWidthForBall, windowInnerHeightForBall-(windowInnerWidthForBall-currentBallPosition.left), "lbrt");
            moveBallTo(currentBallPosition.left, currentBallPosition.top, windowInnerWidthForBall, windowInnerHeightForBall-(windowInnerWidthForBall-currentBallPosition.left), "lbrt", "right");
        }
        else if((initialPosition === "right") && (finalPosition === "top")){
            finalPosition = null;
            // ball should move to "top";
            // console.log("top", currentBallPosition.left, currentBallPosition.top, (windowInnerWidthForBall-currentBallPosition.top), 0, "lbrt");
            moveBallTo(currentBallPosition.left, currentBallPosition.top, (windowInnerWidthForBall-currentBallPosition.top), 0, "lbrt", "top");
        }
        else if((initialPosition === "top") && (finalPosition === "left")){
            finalPosition = null;
            // ball should move to "left";
            // console.log("left", currentBallPosition.left, currentBallPosition.top, 0, currentBallPosition.left, "lbrt")
            moveBallTo(currentBallPosition.left, currentBallPosition.top, 0, currentBallPosition.left, "lbrt", "left");
        }
        else if((initialPosition === "left") && (finalPosition === "bottom")){
            finalPosition = null;
            // ball should move to "bottom";
            // console.log("bottom", currentBallPosition.left, currentBallPosition.top, (windowInnerHeightForBall-currentBallPosition.top), windowInnerHeightForBall, "lbrt");
            moveBallTo(currentBallPosition.left, currentBallPosition.top, (windowInnerHeightForBall-currentBallPosition.top), windowInnerHeightForBall, "lbrt" , "bottom");
        }
    }, 10);

    function moveBallTo(x1, y1, x2, y2, rule, prediction){
        let moveBall = setInterval(function (){
            let initialPositionGenerated = false;
            if( ((y1 > y2) && (parseInt(ball.style.top) <= 32)) ||
                ((y1 < y2) && (parseInt(ball.style.top) >= windowInnerHeightForBall-32)) )
            {
                if((y1 > y2) && (initialPosition !== "top")){
                    initialPosition = "top";
                    initialPositionGenerated = true;
                }
                else if((y1 < y2) && (initialPosition !== "bottom")){
                    initialPosition = "bottom";
                    initialPositionGenerated = true;
                }
            }
            if( ((x1 > x2) && (parseInt(ball.style.left) <= 0)) ||
                ((x1 < x2) && (parseInt(ball.style.left) >= windowInnerWidthForBall)) )
            {
                if((x1 > x2) && (initialPosition !== "left")){
                    initialPosition = "left";
                    initialPositionGenerated = true;
                }
                else if((x1 < x2) && (initialPosition !== "right")){
                    initialPosition =  "right";
                    initialPositionGenerated = true;
                }
            }

            // generating "final position" based on "initial position".
            if(initialPositionGenerated === true){
                if(rule === "trbl"){
                    if((prediction === "top") && (initialPosition === "top")){
                        finalPosition = "right";
                    }
                    else if((prediction === "top") && (initialPosition === "right")){
                        finalPosition = prediction;
                    }
                    else if((prediction === "right") && (initialPosition === "right")){
                        finalPosition = "bottom";
                    }
                    else if((prediction === "right") && (initialPosition === "bottom")){
                        finalPosition = prediction;
                    }
                    else if((prediction === "bottom") && (initialPosition === "bottom")){
                        finalPosition = "left";
                    }
                    else if((prediction === "bottom") && (initialPosition === "left")){
                        finalPosition = prediction;
                    }
                    else if((prediction === "left") && (initialPosition === "left")){
                        finalPosition = "top";
                    }
                    else if((prediction === "left") && (initialPosition === "top")){
                        finalPosition = prediction;
                    }
                }
                // else means "lbrt" rule;
                else{
                    if((prediction === "left") && (initialPosition === "left")){
                        finalPosition = "bottom";
                    }
                    else if((prediction === "left") && (initialPosition === "bottom")){
                        finalPosition = prediction;
                    }
                    else if((prediction === "bottom") && (initialPosition === "bottom")){
                        finalPosition = "right";
                    }
                    else if((prediction === "bottom") && (initialPosition === "right")){
                        finalPosition = prediction;
                    }
                    else if((prediction === "right") && (initialPosition === "right")){
                        finalPosition = "top";
                    }
                    else if((prediction === "right") && (initialPosition === "top")){
                        finalPosition = prediction;
                    }
                    else if((prediction === "top") && (initialPosition === "top")){
                        finalPosition = "left";
                    }
                    else if((prediction === "top") && (initialPosition === "left")){
                        finalPosition = prediction;
                    }
                }
                console.log(initialPosition, "->",finalPosition);
                // console.log(ball.style.left, ball.style.top);
                clearInterval(moveBall);
                return;
            }

            if(y1 > y2){
                ball.style.top = (parseInt(ball.style.top)-2) + "px";
            }
            else{
                ball.style.top = (parseInt(ball.style.top)+2) + "px";
            }
            if(x1 > x2){
                ball.style.left = (parseInt(ball.style.left)-2) + "px";
            }
            else{
                ball.style.left = (parseInt(ball.style.left)+2) + "px";
            }

            // for incrementing score and detecting ball out of bound movement.
            let rod1Position = rod1.getBoundingClientRect();
            let rod2Position = rod2.getBoundingClientRect();
            if( ( (parseInt(ball.style.top) <= rod1Position.top+32) ||
                    (parseInt(ball.style.top)+25 >= rod2Position.top) ) &&
                ( (parseInt(ball.style.left)+20 < rod1Position.left) ||
                    (parseInt(ball.style.left) > rod1Position.left+200) ) )
            {
                score.style.color = "red";
                setTimeout(function (){
                    window.location.reload();
                }, 150);
            }
            else if((parseInt(ball.style.top) <= rod1Position.top+17) ||
                (parseInt(ball.style.top)+25 === rod2Position.top))
            {
                score.innerText = (parseInt(score.innerText)+1).toString();
            }
        });
    }
})();

// Author - Shubham, github-url: "github.com/shubhamistic";