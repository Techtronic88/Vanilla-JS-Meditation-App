// WHAT DO YOU NEED TO DO 
// 1st: Play button click gets played
// 2nd: Click 2 Mins - 5 Mins - 10 Mins - Time start 
     //2:B Count Down timer needs to display the time left
     // 2:C Click multiple time button will get conflict results - need to clear queu


// 3rdL Click Rains Button - Play Rain sounds
    // 3a: Video background change to Rain


// 4TH: Click Sunny Button - Play Sunny Sounds
    // 4a: Video Background Change to  Sunny


// WHAT ARE THE CONSIDERATIONS ?

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

    // Get length of Circle Outline - that was included in SVG file so we can switch circle colors later
    const outlineLength = outline.getTotalLength(); // We invoke the function right here to get the value
    console.log(outlineLength);


    // Setting duration, song will stop when the duration of the song finish - not duration we choose
    let fakeDuration = 20;
    
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;


    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    // When clicked if song.pause = true - song play - video play - 

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
        console.log(currentTime);
        let elapsed = fakeDuration - currentTime;
        console.log(elapsed); 
        let seconds = Math.floor(elapsed % 60); // When this function gets to 60 it resets back to 0;
        console.log(seconds);
        let minutes = Math.floor(elapsed / 60);  
        console.log(minutes);

    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;    
    console.log(progress);
    };
};

app();
// const song = document.querySelector(".song");
// const play = document.querySelector(".play");
// const outline = document.querySelector(".moving-outline circle");
// const video = document.querySelector(".vid-container video");
// //Sounds
// const sounds = document.querySelectorAll(".sound-picker button");
// //Time Display
// const timeDisplay = document.querySelector(".time-display");
// const outlineLength = outline.getTotalLength();
// //Duration
// const timeSelect = document.querySelectorAll(".time-select button");
// let fakeDuration = 600;

// outline.style.strokeDashoffset = outlineLength;
// outline.style.strokeDasharray = outlineLength;
// timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
//   fakeDuration % 60
// )}`;

// sounds.forEach(sound => {
//   sound.addEventListener("click", function() {
//     song.src = this.getAttribute("data-sound");
//     video.src = this.getAttribute("data-video");
//     checkPlaying(song);
//   });
// });

// play.addEventListener("click", function() {
//   checkPlaying(song);
// });

// timeSelect.forEach(option => {
//   option.addEventListener("click", function() {
//     fakeDuration = this.getAttribute("data-time");
//     timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
//       fakeDuration % 60
//     )}`;
//   });
// });

// const checkPlaying = song => {
//   if (song.paused) {
//     song.play();
//     video.play();
//     play.src = "./svg/pause.svg";
//   } else {
//     song.pause();
//     video.pause();
//     play.src = "./svg/play.svg";
//   }
// };

// song.ontimeupdate = function() {
//   let currentTime = song.currentTime;
//   let elapsed = fakeDuration - currentTime;
//   let seconds = Math.floor(elapsed % 60);
//   let minutes = Math.floor(elapsed / 60);
//   timeDisplay.textContent = `${minutes}:${seconds}`;
//   let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
//   outline.style.strokeDashoffset = progress;

//   if (currentTime >= fakeDuration) {
//     song.pause();
//     song.currentTime = 0;
//     play.src = "./svg/play.svg";
//     video.pause();
//   }
// };