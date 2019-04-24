
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


    // Setting duration, song will stop when the duration of the song finish - not duration we choose
    let fakeDuration = 600;
    

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

    // Setting up program for Time Setting button
    timeSelect.forEach(option => {
        option.addEventListener("click", function() {
          fakeDuration = this.getAttribute("data-time");
          timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
            fakeDuration % 60
          )}`;
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

    // ANIMATE CIRCLE that reflect each seconds the song plays
    // NOTE: This function will upate it's value every seconds
    song.ontimeupdate = () => { // also HTML attribute
        let currentTime = song.currentTime // HTML attribute for song / video
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60); // When this function gets to 60 it resets back to 0;
        let minutes = Math.floor(elapsed / 60);  

    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;    

    // DISPLAY THE TIME REMAINING IN THE DOM
    timeDisplay.textContent = `${minutes}: ${seconds}`;
    };
};

app();
