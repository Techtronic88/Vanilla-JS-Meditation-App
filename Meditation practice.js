// USER EVENTS
// 1st: Play button click gets played
// 2nd: Click 2 Mins - 5 Mins - 10 Mins - Time start 
     //2:B Count Down timer needs to display the time left
     // 2:C Click multiple time button will get conflict results - need to clear queu


// 3RD: USERS EVENT: 
  // Waterfall buttton click - Play Waterfall sounds
    // Video background changes to Waterfall


// 4TH: Click Sunny/ Beach Button - Play Sunny/ Beach Sound
    // 4a: Video Background Changes to Beach Sunny.

    
const app = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle'); // cicle is inside the SVG
  const video = document.querySelector('.vid-container video');


  // SOUNDS 
  // We need to grab all songs and buttons
  const sounds = document.querySelectorAll('.sound-picker button');

  // Display time to the DOM 
  const timeDisplay = document.querySelector('.time-display');
  const timeSelect = document.querySelectorAll('.time-select button');

  // Get length of Circle Outline - that was included in SVG file so we can switch circle colors later
  const outlineLength = outline.getTotalLength(); // We invoke the function right here to get the value
  console.log(outlineLength);

  // White circle SVG is placed above the blue circle SVG
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // Setting up program for Sound Setting button
  sounds.forEach(sound => {
      sound.addEventListener("click", function() {
        song.src = this.getAttribute("data-sound");
        video.src = this.getAttribute("data-video");
        checkPlaying(song);
      });
    });
  play.addEventListener('click', () => {
      checkPlaying(song);
  });

  // USER EVENT: Click the 2-5-10 mins button - time will display accordingly
  // timeSelect is a NodeList right now, we can iterate through no problem.
  // timeInSeconds created so we have a hard value of each object of data-time
      // we iterate through

// Let's declare a initialTimeInSeconds and set it's value 
// It is currently a global variable inside the main function
// We can access this global variable due to its scope.
// NOTE: when we reuse initialTimeInSeconds inside of the function below
// we cannot use let initialTimeinSeconds = .... again... the code will break 
// Behind the scene JS will intepret initialTimeInSeconds as two 
  // separete variables since they are in separate scopes / blocks
   // if 
let initialTimeInSeconds = 600;
  timeSelect.forEach((time) => {
    time.addEventListener("click", function () {
       initialTimeInSeconds = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(initialTimeInSeconds / 60)}:
          ${Math.floor(initialTimeInSeconds % 60 )}`;
          console.log(initialTimeInSeconds);
          // console.log(timeSelect);
    });
  });
  
  // When clicked if song.pause = true song play / video play

  const checkPlaying = song => {
      if (song.paused) {
          song.play();
          video.play();
          play.src = "./svg/pause.svg";
      } else {
          song.pause();
          video.pause();
          play.src="./svg/play.svg"
      }
  }

  // ANIMATE CIRCLE that reflect each second the song plays
  // NOTE: This function will upate it's value every seconds
  song.ontimeupdate = () => { 
    console.log(initialTimeInSeconds);
      let currentTime = song.currentTime 
      let elapsed = initialTimeInSeconds - currentTime;
      let seconds = Math.floor(elapsed % 60); // When this function gets to 60 it resets back to 0;
      let minutes = Math.floor(elapsed / 60);  

  let progress = outlineLength - (currentTime / initialTimeInSeconds) * outlineLength;
  outline.style.strokeDashoffset = progress;    

  // DISPLAY THE TIME REMAINING IN THE DOM
  timeDisplay.textContent = `${minutes}: ${seconds}`;
  };
};

app();


    // EXTRA FEATURES TO BE ADDED:
     // How to keep selected time select button stay highlisghted as long as users using that option

     // Add volume / slider to adjust the volume
