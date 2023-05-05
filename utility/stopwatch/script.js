/*functionalities:
 * 1) using local-storage so that the stop-watch won't get
 *    reset on web page reloading.
 */

// using IIFE notation
(function (){
    // localStorage.clear();

    //1. class for the handling the stopwatch elements.
    class StopWatch{
        constructor() {
            this.timeInHours = $("#hours");
            this.timeInMinutes = $("#minutes");
            this.timeInSeconds = $("#seconds");
            this.timeInMicroSeconds = $("#micro-seconds");
        }
        // this method sets the initial clock time by fetching the data from the local-storage.
        setTimeFromLocalStorage(){
            // condition to check if the app is running for the first time in the browser.
            if(localStorage.getItem("micro-seconds") === null){
                this.initializeTimeToZero();
            }
            this.timeInHours.html(localStorage.getItem("hours"));
            this.timeInMinutes.html(localStorage.getItem("minutes"));
            this.timeInSeconds.html(localStorage.getItem("seconds"));
            this.timeInMicroSeconds.html(localStorage.getItem("micro-seconds"));
        }
        // this method will initialize clock to zero.
        initializeTimeToZero(){
            this.timeInHours.html("00");
            this.timeInMinutes.html("00");
            this.timeInSeconds.html("00");
            this.timeInMicroSeconds.html("00");
            // also setting the local-storage for stop-watch to zero;
            localStorage.setItem("hours", "00");
            localStorage.setItem("minutes", "00");
            localStorage.setItem("seconds", "00");
            localStorage.setItem("micro-seconds", "00");
        }
        // micro-seconds methods.
        setMicroSecondsToZero(){
            this.timeInMicroSeconds.html("00");
        }
        incrementMicroSecondsByOne(){
            // incrementing micro-seconds by 1.
            // also storing the new microSeconds-value to the local-storage.
            let newTime = parseInt(this.timeInMicroSeconds.html()) + 1;
            if(newTime < 10){
                this.timeInMicroSeconds.html("0" + newTime.toString());
                localStorage.setItem("micro-seconds", ("0" + newTime.toString()));
                return;
            }
            this.timeInMicroSeconds.html(newTime.toString());
            localStorage.setItem("micro-seconds", newTime.toString());
        }
        getMicroSeconds(){
            return parseInt(this.timeInMicroSeconds.html());
        }
        // seconds methods.
        setSecondsToZero(){
            this.timeInSeconds.html("00");
        }
        incrementSecondsByOne(){
            // incrementing seconds by 1.
            // also storing the new seconds-value to the local-storage.
            let newTime = parseInt(this.timeInSeconds.html()) + 1;
            if(newTime < 10){
                this.timeInSeconds.html("0" + newTime.toString());
                localStorage.setItem("seconds", ("0" + newTime.toString()));
                return;
            }
            this.timeInSeconds.html(newTime.toString());
            localStorage.setItem("seconds", newTime.toString());
        }
        getSeconds(){
            return parseInt(this.timeInSeconds.html());
        }
        // minutes methods.
        setMinutesToZero(){
            this.timeInMinutes.html("00");
        }
        incrementMinutesByOne(){
            // incrementing minutes by 1.
            // also storing the new minutes-value to the local-storage.
            let newTime = parseInt(this.timeInMinutes.html()) + 1;
            if(newTime < 10){
                this.timeInMinutes.html("0" + newTime.toString());
                localStorage.setItem("minutes", ("0" + newTime.toString()));
                return;
            }
            this.timeInMinutes.html(newTime.toString());
            localStorage.setItem("minutes", newTime.toString());
        }
        getMinutes(){
            return parseInt(this.timeInMinutes.html());
        }
        // hours methods.
        setHoursToZero(){
            this.timeInHours.html("00");
        }
        incrementHoursByOne(){
            // incrementing hours by 1.
            // also storing the new hours-value to the local-storage.
            let newTime = parseInt(this.timeInHours.html()) + 1;
            if(newTime < 10){
                this.timeInHours.html("0" + newTime.toString());
                localStorage.setItem("hours", ("0" + newTime.toString()));
                return;
            }
            this.timeInHours.html(newTime.toString());
            localStorage.setItem("hours", newTime.toString());
        }
        getHours(){
            return parseInt(this.timeInHours.html());
        }
        // this method will return the current stop-watch time.
        getStopWatchTime(){
            return (this.timeInHours.html()+":"+
                    this.timeInMinutes.html()+":"+
                    this.timeInSeconds.html()+":"+
                    this.timeInMicroSeconds.html()
            );
        }
    }
    //2. initializing the stop watch to zero.
    let stopWatch = new StopWatch();
    stopWatch.setTimeFromLocalStorage();

    //3. stop watch interval for running the stop watch.
    let interval;
    function stopWatchInterval() {
        interval = setInterval(function () {
            if (stopWatch.getMicroSeconds() < 99) {
                stopWatch.incrementMicroSecondsByOne();
            } else {
                stopWatch.setMicroSecondsToZero();

                if (stopWatch.getSeconds() < 59) {
                    stopWatch.incrementSecondsByOne();
                } else {
                    stopWatch.setSecondsToZero();

                    if (stopWatch.getMinutes() < 59) {
                        stopWatch.incrementMinutesByOne();
                    } else {
                        stopWatch.setMinutesToZero();

                        if (stopWatch.getHours() < 23) {
                            stopWatch.incrementHoursByOne();
                        } else {
                            stopWatch.setHoursToZero();
                        }
                    }
                }
            }
        }, 10);
    }

    // Lap Handler for handling lap related events.
    class LapHandler{
        constructor() {
            if(localStorage.getItem("lap-record") !== null) {
                // fetching current lap number from local-storage.
                this.currentLapNumber = localStorage.getItem("lap-record").split(" ").length;
            }
            else {
                this.currentLapNumber = 0;
            }
        }
        getLapNumber(){
            return this.currentLapNumber;
        }
        getLapStartTime(){
            return this.startTime;
        }
        reset(){
            $('#lap-screen div').remove();
            localStorage.removeItem("lap-record");
            this.currentLapNumber = 0;
        }
        // this method will load all the laps from the local-storage and displays them.
        loadAllLaps(){
            if(localStorage.getItem("lap-record") !== null){
                let lapTimeArray = localStorage.getItem("lap-record").split(" ");
                let lapCount = 1;
                for(let lapTime of lapTimeArray){
                    $("#lap-screen").prepend(`<div>
                        <span id="lap${lapCount}" class="lap-text">Lap ${lapCount}</span>
                        <span id="lap${lapCount}-time" class="lap-time">${lapTime}</span>
                    </div>`);
                    lapCount++;
                }
            }
        }
        // this function will increment the lap
        incrementLap(){
            this.currentLapNumber++;
            this.startTime = stopWatch.getStopWatchTime();
            let lapButtonText = $("#lap-reset-button div");
            // using multi-line string syntax (``).
            $("#lap-screen").prepend(`<div>
                <span id="lap${this.getLapNumber()}" class="lap-text">Lap ${this.getLapNumber()}</span>
                <span id="lap${this.getLapNumber()}-time" class="lap-time">${this.getLapStartTime()}</span>
            </div>`);

            // storing the lap-data into the local-storage
            let lapRecord;
            if(localStorage.getItem("lap-record") === null){
                // if there is no lap-record exists, then adding the initial lap.
                lapRecord = this.getLapStartTime() ;
            }
            else{
                // else we are just concatenating the previous lap with current lap.
                lapRecord = localStorage.getItem("lap-record") +" "+ this.getLapStartTime() ;
            }
            localStorage.setItem("lap-record", lapRecord);
        }
    }
    // LapHandler Class instance.
    let lapHandler = new LapHandler;
    // loading all laps again in case page unexpectedly reloads.
    lapHandler.loadAllLaps();

    //4. We are using a single button for setting laps and to reset the stopwatch.
    //5. detecting the start-button click.
    let startButton = $("#start-button");
    startButton.click(toggleStartButton);
    function toggleStartButton(){
        let startButtonText = $("#start-button div");
        if(startButtonText.html().trim() === 'Start'){
            // starting up the stop-watch.
            stopWatchInterval();
            // styling the stop-button.
            startButton.css("border-color", "red");
            startButtonText.html("Stop")
            startButtonText.css("color", "orangered");
            startButtonText.css("text-shadow", "0 0 50px orangered");
            // on clicking the start-button the reset button will get change to lap-button.
            $("#lap-reset-button div").html("Lap");
        }
        else{
            // stopping the stop-watch.
            clearInterval(interval);
            // styling the start-button.
            startButton.css("border-color", "darkgreen");
            startButtonText.html("Start")
            startButtonText.css("color", "springgreen");
            startButtonText.css("text-shadow", "0 0 50px springgreen");
            // on clicking the stop-button the lap-button will get change to reset-button.
            $("#lap-reset-button div").html("Reset");
        }
    }
    //6. Detecting the reset-button click.
    //NOTE: The lap/reset-button is same. Here reset functionality is implemented.
    let resetButton = $("#lap-reset-button");
    resetButton.click(resetStopWatch);
    function resetStopWatch(){
        let resetButtonText = $("#lap-reset-button div");
        if(resetButtonText.html().trim() === 'Reset'){
            clearInterval(interval);
            stopWatch.initializeTimeToZero();
            // also clearing the lap-screen.
            lapHandler.reset();
        }
        else{
            // it means Lap-button is pressed, creating a Lap.
            lapHandler.incrementLap();
        }
    }
})();