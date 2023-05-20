(() => {
    // define HTTPS to connect to server
    const HTTPS = 'https://api.shubhamistic.com/tictactoe';
    // define socket
    const socket = io(HTTPS, {autoConnect: false});

    // (global) variables
    let marker = null; // Variable to store either 'X' or 'O'
    let room_code = null;
    let token = null;
    let participant_type = null;
    let validTurn = false; // Variable to track whether it is the player's turn or the opponent's turn.

    // define all the buttons
    let joinButton = $("#join-button");
    let createRoomButton = $("#create-room-button");
    let exitButton = $("#exit-button");

    // define all prompts
    let prompts = $('#prompts'); // prompts container
    let prompt1 = $("#prompt-1"); // INSTRUCTIONS prompt
    let prompt2 = $("#prompt-2"); // YOU WON! || OPPONENT WON! || MATCH DRAW! prompt
    let prompt3 = $("#prompt-3"); // OPPONENT LEFT! || ROOM EXPIRED! prompt

    // tic-tac-toe board area
    let tttBoardDiv = $('#ttt-board-div');

    // tic-tac-toe box
    let tttBox = $('#ttt-board .ttt-box');

    // error-message
    let errorMsg = $('#input-room-div form #error-message');

    // user input
    let roomCodeInput = $('#input-room-div form input');

    // create markers html
    let cross_marker = (`
        <div class="marker">
            <i class="fa-solid fa-xmark cross-marker"></i>
        </div>
    `)
    let circle_marker = (`
        <div class="marker">
            <div class="circle-marker"></div>
        </div>
    `)

    // marker value
    let markerValue = $('#marker-value');

    // prevent form to reload the page
    $("#input-room-div form").submit(function(e) {
        e.preventDefault();
    });

    // enable game for small screen device except mobiles
    // if "open anyway" button is clicked
    let openAnywayButton = $('#mobile-devices-prompt button');
    openAnywayButton.click(function (){
        $('#input-room-div, #ttt-board-div').css("display", "flex");
        $('#mobile-devices-prompt').css("display", "none");
    });

    // function to bring the webpage to its default state
    function defaults() {
        // set all (global) variable to their default values
        marker = null;
        room_code = null;
        token = null;
        participant_type = null;
        validTurn = false;

        // disable exit button click
        exitButton.prop('disabled', true);
        exitButton.css({
            "cursor": "not-allowed",
            "background-color": "#7d4a46"
        });

        // enable the create-room button
        createRoomButton.html("CREATE");
        createRoomButton.prop('disabled', false);
        createRoomButton.css({
            "cursor": "pointer",
            "background-color": "goldenrod",
            "color": "#303030"
        });

        // enable the join-room button
        joinButton.prop('disabled', false);
        joinButton.css({
            "cursor": "pointer",
            "background-color": "limegreen"
        });

        // Disable the tic-tac-toe board
        tttBoardDiv.attr('disabled', true);
        tttBoardDiv.css({
            'pointer-events': 'none',
            'opacity': '50%'
        });

        // enable hover events in tic-tac-toe boxes & clear all html inside tic-tac-toe box
        tttBox.removeClass("lock-ttt-box lock-all-ttt-box");
        tttBox.empty();

        // enable the prompts
        prompts.css("display", "block");

        // prompt user to join or create a room
        prompt1.css("display", "block");
        prompt1.html('Join or create a room to play Tic Tac Toe! 😉')

        // clear marker value
        markerValue.css("visibility", "hidden");

        // clear all socket events and disconnect the socket
        socket.off();
    }
    // initially set all things to default
    defaults();


    // handle join button click
    joinButton.click(function(){
        // take user input
        let roomCodeInputVal = roomCodeInput.val();

        // ajax call to send server a "join room" request
        $.ajax({
            url: `${HTTPS}/join-room`,
            type: "POST",
            data: JSON.stringify({"room_code": roomCodeInputVal}),
            success: function(response){
                // if request is fulfilled by the server,
                if(response["fulfilled"]) {
                    // set (global) room_code & token variable
                    room_code = response.room_code;
                    token = response.token;
                    participant_type = "guest";

                    // hide error message if entered room code is correct
                    errorMsg.css("visibility", "hidden");

                    // on join, enable the exit button
                    exitButton.prop('disabled', false);
                    exitButton.css({
                        "cursor": "pointer",
                        "background-color": "indianred"
                    });

                    // on join, disable create-room button click
                    createRoomButton.prop('disabled', true);
                    createRoomButton.css({
                        "cursor": "not-allowed",
                        "background-color": "darkgoldenrod"
                    });

                    // on join, disable join button click
                    joinButton.prop('disabled', true);
                    joinButton.css({
                        "cursor": "not-allowed",
                        "background-color": "darkseagreen"
                    });

                    // program execution handler
                    startGame(room_code, token, participant_type);
                }
                else{
                    // display error message if entered room code is unavailable
                    errorMsg.css("visibility", "visible");
                }
            },
            error: function() {
                // display error message if entered room code is incorrect
                errorMsg.css("visibility", "visible");
            }
        });
    });
    joinButton.hover(
        function () {$(this).css({"background-color": "lawngreen"});},
        function () {$(this).css({"background-color": "limegreen"});}
    );

    // handle create-room button click
    createRoomButton.click(function(){
        // ajax call to request server to generate a room code
        $.ajax({
            url: `${HTTPS}/generate-room-code`,
            type: "GET",
            success: function (response) {
                // set (global) room_code & token variable
                room_code = response.room_code;
                token = response.token;
                participant_type = "host";

                // hide error message if entered room code is correct
                errorMsg.css("visibility", "hidden");

                // empty the input value
                roomCodeInput.val('');

                // prompt user to share the code
                prompt1.html(`Share the room code (${response.room_code}) with your friend and let the game begin! 😁`);

                // on create-room, enable the exit button
                exitButton.prop('disabled', false);
                exitButton.css({
                    "cursor": "pointer",
                    "background-color": "indianred"
                });

                // display the room code on the create-button itself
                createRoomButton.html(response.room_code);
                // on join, disable create-room button click
                createRoomButton.prop('disabled', true);
                createRoomButton.css({
                    "cursor": "not-allowed",
                    "background-color": "#242424",
                    "color": "whitesmoke"
                });

                // on join, disable join button click
                joinButton.prop('disabled', true);
                joinButton.css({
                    "cursor": "not-allowed",
                    "background-color": "darkseagreen"
                });

                // program execution handler
                startGame(room_code, token, participant_type);
            },
            error: function () {/* exception (not necessary to handle) */}
        });
    });
    createRoomButton.hover(
        function () {$(this).css({"background-color": "gold"});},
        function () {$(this).css({"background-color": "goldenrod"});}
    );


    // handle exit button click
    exitButton.click(function(){
        // ajax call to send server a "exit room" request
        $.ajax({
            url: `${HTTPS}/exit-room`,
            type: "POST",
            data: JSON.stringify({
                "room_code": room_code,
                "token": token
            })
        });

        // break the socket connection from server side
        socket.emit('exit-room', {
            "room_code": room_code,
            "token": token,
            "participant_type": participant_type
        });

        // reset to default web-page
        defaults();
    });
    exitButton.hover(
        function() {$(this).css("background-color", "tomato");},
        function() {$(this).css("background-color", "indianred");}
    );


    // handle the tic-tac-toe box clicks
    tttBox.click(function (){
        let boxId = $(this).attr('id');
        boxId = (boxId[4] + boxId[5]); // id: "box-00", "00" are at indexes 4 & 5

        // check whether it is the player's turn or the opponent's turn.
        if(validTurn) {
            // place the marker
            socket.emit('place-marker', {
                "room_code": room_code,
                "token": token,
                "participant_type": participant_type,
                "box_id": boxId
            });
        }
    });


    function startGame(room_code, token, participant_type){
        // connect to the socket
        socket.connect();

        // define socket events
        socket.on('connect', function() {
            // connected to the socket
        });

        // function to initialize the player and set properties
        // such as marker, marker color, lock all boxes.
        function initializePlayer(data){
            // host joined, set marker for the host
            marker = data["marker"];

            // player with marker 'X' will always have first mover advantage
            if(marker === 'X'){
                validTurn = true;
                // display marker value
                markerValue.html("MARKER: <b>X</b>");
                markerValue.css({
                    "visibility": "visible",
                    "color": "#f71638"
                });
            }
            if(marker === 'O'){
                // display marker value
                markerValue.html("MARKER: <b>O</b>");
                markerValue.css({
                    "visibility": "visible",
                    "color": "dodgerblue"
                });

                // lock all boxes
                tttBox.addClass("lock-all-ttt-box");
            }
        }

        // function to initialize the player's turn
        function initializePlayerTurn(data){
            prompt1.fadeIn(function() {
                $(this).delay(1000).fadeOut(function() {
                    if(marker === 'X'){
                        // prompt host about his/her turn
                        prompt1.html("It's your turn now 😉!");
                        prompt1.fadeIn(function() {
                            $(this).delay(500).fadeOut(function() {
                                // Enable the tic-tac-toe board and disable prompts
                                prompts.css("display", "none");
                                tttBoardDiv.attr('disabled', false);
                                tttBoardDiv.css({
                                    'pointer-events': 'auto',
                                    'opacity': '100%'
                                });
                            });
                        });
                    }
                    if(marker === 'O'){
                        // prompt host about guest's turn
                        prompt1.html("It's now your opponent's turn 🥸!");
                        prompt1.fadeIn(function() {
                            $(this).delay(500).fadeOut(function() {
                                // Enable the tic-tac-toe board and disable prompts
                                prompts.css("display", "none");
                                tttBoardDiv.attr('disabled', false);
                                tttBoardDiv.css({
                                    'pointer-events': 'auto',
                                    'opacity': '100%'
                                });
                            });
                        });
                    }
                });
            });
        }


        // host socket events
        if(participant_type === "host") {
            // host join handler
            socket.on('host-joined', function (data) {
                // initialize the host
                initializePlayer(data);
            });

            // guest join from host point of view handler
            socket.on('guest-joined', function (data) {
                // guest joined

                // prompt opponent join successful message and initialize the turn
                prompt1.html("Your opponent 😈 has joined the game!");
                initializePlayerTurn(data);
            });

            // host won on host side
            socket.on('host-won', function (data) {
                // display you won prompt and reset the game to defaults
                prompts.css("display", "block");
                prompt2.html("YOU WON! 🥳");
                prompt2.fadeIn(function() {
                    $(this).delay(2000).fadeOut(function() {
                        prompts.css("display", "none");
                        defaults();
                    });
                });
            });

            // guest won on host side
            socket.on('guest-won', function (data) {
                // display opponent won prompt and reset the game to defaults
                prompts.css("display", "block");
                prompt2.html("OPPONENT WON! 😓");
                prompt2.fadeIn(function() {
                    $(this).delay(2000).fadeOut(function() {
                        prompts.css("display", "none");
                        defaults();
                    });
                });
            });

            // if guest left the game
            socket.on('guest-left', function (data) {
                // display opponent left prompt and reset the game to defaults
                prompts.css("display", "block");
                prompt3.html("OPPONENT LEFT! 🫠");
                prompt3.fadeIn(function() {
                    $(this).delay(1000).fadeOut(function() {
                        prompts.css("display", "none");
                        defaults();
                    });
                });
            });
        }

        // guest socket events
        if(participant_type === "guest") {
            // guest join handler
            socket.on('guest-joined', function (data) {
                // initialize the guest
                initializePlayer(data);

                // prompt join successful message and initialize the turn
                prompt1.html("You have successfully joined the game! 😉️");
                initializePlayerTurn(data);
            });

            // guest won on guest side
            socket.on('guest-won', function (data) {
                // display you won prompt and reset the game to defaults
                prompts.css("display", "block");
                prompt2.html("YOU WON! 🥳");
                prompt2.fadeIn(function() {
                    $(this).delay(2000).fadeOut(function() {
                        prompts.css("display", "none");
                        defaults();
                    });
                })
            });

            // host won on guest side
            socket.on('host-won', function (data) {
                // display opponent won prompt and reset the game to defaults
                prompts.css("display", "block");
                prompt2.html("OPPONENT WON! 😓");
                prompt2.fadeIn(function() {
                    $(this).delay(2000).fadeOut(function() {
                        prompts.css("display", "none");
                        defaults();
                    });
                });
            });

            // if host left the game
            socket.on('host-left', function (data) {
                // display opponent left prompt and reset the game to defaults
                prompts.css("display", "block");
                prompt3.html("OPPONENT LEFT! 🫠");
                prompt3.fadeIn(function() {
                    $(this).delay(1000).fadeOut(function() {
                        prompts.css("display", "none");
                        defaults();
                    });
                });
            });
        }

        // common host & guest events,
        // if room code is expired
        socket.on('room-expired', function (data){
            // reset to default game page
            prompts.css("display", "block");
            prompt3.html("ROOM EXPIRED! 🤕");
            prompt3.fadeIn(function() {
                $(this).delay(2000).fadeOut(function() {
                    prompts.css("display", "none");
                    defaults();
                });
            });
        });

        // set marker handler
        socket.on('marker-placed', function (data) {
            let markedBox = $(`#box-${data["box_id"]}`);

            // lock the box if marker is placed
            markedBox.addClass("lock-ttt-box");

            // place the marker html
            if(data["marker"] === 'X'){
                markedBox.append(cross_marker);
            }
            if(data["marker"] === 'O'){
                markedBox.append(circle_marker);
            }

            // disable the player board if he has already played his turn
            if(data["marker"] === marker){
                validTurn = false;
                tttBox.each(function() {
                    if(!$(this).hasClass('lock-ttt-box')){
                        $(this).addClass("lock-all-ttt-box");
                    }
                });
            }
            else{
                validTurn = true;
                tttBox.removeClass("lock-all-ttt-box");
            }
        });

        // match draw
        socket.on('match-draw', function (data) {
            // display match draw prompt and reset the game to defaults
            prompts.css("display", "block");
            prompt2.html("MATCH DRAW! 😬");
            prompt2.fadeIn(function() {
                $(this).delay(1000).fadeOut(function() {
                    prompts.css("display", "none");
                    defaults();
                });
            });
        });

        // join the room
        socket.emit('join-room', {
            "room_code": room_code,
            "token": token,
            "participant_type": participant_type
        });
    }
})();