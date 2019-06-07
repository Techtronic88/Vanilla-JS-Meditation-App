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

        // GRAB DOM ELEMENTS in player-container div 
        // play button / circle outline / video container background with video
        const song = document.querySelector('.song');
        const play = document.querySelector('.play');
        const outline = document.querySelector('.moving-outline circle'); // cicle is inside the SVG
        const video = document.querySelector('.vid-container video');
    
    
        // SOUNDS 
        // GRAB DOM ELEMENTS for video background / sound change
        const sounds = document.querySelectorAll('.sound-picker button');
    
        // GRAB DOM ELEMENTS for 2-5-10 mins button and time display
        const timeSelect = document.querySelectorAll('.time-select button');
        const timeDisplay = document.querySelector('.time-display');
       
    
        // Get length of Circle Outline - that was included in SVG file so we can switch circle colors later
        const outlineLength = outline.getTotalLength(); // We invoke the function right here to get the value        
        console.log(outlineLength);
    
    
        // Setting duration, song will stop when the duration of the song finish - not duration we choose
        let fakeDuration = 600;
        outline.style.strokeDasharray = outlineLength;
        outline.style.strokeDashoffset = outlineLength;
        // outline.style.strokeDasharray = outlineLength;
        // outline.style.strokeDashoffset = outlineLength;


          
        //  THIS keyword is pointing to each Object clicked on 
        //  It knows the elements users clicked by get Attribute ??
        //  Each Object has access to getAttribute to pick the data-video / sounds
        sounds.forEach(sound => {
          sound.addEventListener("click", function (){ 
              song.src = this.getAttribute("data-sound");
              video.src = this.getAttribute("data-video");
              checkPlaying(song);
          });
        });

        
        // This is for the PLAY BUTTON / logo right in the middle
        // only resume / pause the current song. UNALBE TO CHANGE
        play.addEventListener('click', () => {checkPlaying(song)});
    
        
        // We will have a Nodelist to iterate through 
        // Problem we are having right now = Does not swithc to full reset 
        timeSelect.forEach(option => {
          option.addEventListener("click", function() {
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60 )}`;
            console.log(fakeDuration);
            console.log(timeSelect);
            });
          });
    
        
        // When clicked if song.pause = true - song play - video play - 
        // When in pause state: next user interaction will be play - 
        // play condition is set right away in flow control.
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
    
        // ANIMATE CIRCLE that reflect each seconds the song plays
        // NOTE: This function will upate it's value every seconds
        song.ontimeupdate = () => { // also HTML attribute
            let currentTime = song.currentTime // HTML attribute for song / video
            let elapsed = fakeDuration - currentTime;
            // console.log(elapsed); 
            let seconds = Math.floor(elapsed % 60); // When this function gets to 60 it resets back to 0;
            // console.log(seconds);
            let minutes = Math.floor(elapsed / 60);  
            // console.log(minutes);
    
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;    
        // console.log(progress);
    
        // DISPLAY THE TIME REMAINING IN THE DOM
        timeDisplay.textContent = `${minutes}: ${seconds}`;
        };
    };
    
    app();

    // EXTRA FEATURES TO BE ADDED:
     // How to keep selected time select button stay highlisghted as long as users using that option

     // Add volume / slider to adjust the volume
