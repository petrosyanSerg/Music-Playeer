//Track details
const nowPlaying = document.querySelector(".now_playing");
const trackPhoto = document.querySelector(".track_art");
const trackName = document.querySelector(".track_name");
const trackArtist = document.querySelector(".track_artist");

//Music controls
const btnPlayPause = document.querySelector(".play_pause");
const nextBtn = document.querySelector(".next_track");
const prevBtn = document.querySelector(".prev_track");

//Track range
const track = document.querySelector(".track");
const volume = document.querySelector(".volume");

//Time counter
const currentTime = document.querySelector(".current_time");
const durationTime = document.querySelector(".duration_time");

//Random Button and Repeat button
const randomTrack = document.querySelector(".random_track_button");
const repeatTrack = document.querySelector(".repeat");

//Wave
const wave = document.getElementById("wave");

//Audio creat
let currTrack = document.createElement("audio");

//Necessary varible
let trackIndex = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

//Music list
const musicList = [
  {
    img: "../img/TheWeeknd1.jpg",
    name: "Call Out My Name",
    artist: "The Weeknd",
    music: "../music/Call Out My Name.mp3",
  },
  {
    img: "../img/TheWeeknd2.jpg",
    name: "The Hills",
    artist: "The Weeknd",
    music: "../music/The Hills.mp3",
  },
  {
    img: "../img/RavingGeorge.gif",
    name: "You're Mine",
    artist: "Raving George",
    music: "../music/You're Mine.mp3",
  },
  {
    img: "../img/GarikSona.png",
    name: "Srtid Banalin",
    artist: "Garik & Sona",
    music: "../music/Srtid_Banalin.mp3",
  },
  {
    img: "../img/Black.jpg",
    name: "Lets Get It Started",
    artist: "Black Eyed Peas",
    music: "../music/Lets Get It Started.mp3",
  },
  {
    img: "../img/Beyonce.jpg",
    name: "Beyonce",
    artist: "Crazy In Love",
    music: "../music/Crazy In Love.mp3",
  },
];

//Player function
function loadTrack(trackIndex) {
  clearInterval(updateTimer);
  reset();

  currTrack.src = `${musicList[trackIndex].music}`;
  currTrack.load();
  trackPhoto.style.backgroundImage = `url(${musicList[trackIndex].img})`;
  trackArtist.textContent = musicList[trackIndex].artist;
  trackName.textContent = musicList[trackIndex].name;
  nowPlaying.textContent = `Playing music ${trackIndex + 1} of ${
    musicList.length
  }`;

  updateTimer = setInterval(setUpdate, 1000);
  currTrack.addEventListener("ended", nextTrack);
  randomBgColor();
}
//Random bg color
function randomBgColor() {
  function color() {
    let randomNumber = [];
    for (let i = 0; i < 3; i++) {
      let temp = Math.floor(Math.random() * 255);
      randomNumber.push(temp);
    }
    let randColor = `rgb(${randomNumber[0]},${randomNumber[1]},${randomNumber[2]})`;
    return randColor;
  }
  const colorOne = color();
  const colorTwo = color();
  const direction = `to left top`;
  const gradient = `linear-gradient(${direction}, ${colorOne}, ${colorTwo})`;
  return (document.body.style.background = gradient);
}
//Reset
function reset() {
  currentTime.textContent = "00:00";
  durationTime.textContent = "00:00";
  track.value = 0;
}
//Random track
function randomMusicFn(event) {
  isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
  isRandom = true;
  randomTrack.classList.add("active");
}
function pauseRandom() {
  isRandom = false;
  randomTrack.classList.remove("active");
}
//Repeat music
function repeatMusicFn(event) {
  let newIndex = trackIndex;
  loadTrack(newIndex);
  playTrack();
}
//Play Pause btn
function playPause(event) {
  isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
  currTrack.play();
  isPlaying = true;
  trackPhoto.classList.add("rotate");
  wave.classList.add("loader");
  btnPlayPause.innerHTML = `<i class="fa-solid fa-circle-pause"></i>`;
}
function pauseTrack() {
  currTrack.pause();
  isPlaying = false;
  trackPhoto.classList.remove("rotate");
  wave.classList.remove("loader");
  btnPlayPause.innerHTML = `<i class="fa-solid fa-circle-play"></i>`;
}
//Next track fn
function nextTrack(event) {
  function randomIndex() {
    return Math.floor(Math.random() * musicList.length);
  }
  if (trackIndex < musicList.length - 1 && isRandom === false) {
    trackIndex++;
  } else if (trackIndex < musicList.length - 1 && isRandom === track) {
    trackIndex = randomIndex();
  } else trackIndex = 0;
  loadTrack(trackIndex);
  playTrack();
}

//Prev track fn
function prevTrack(event) {
  if (trackIndex > 0) {
    trackIndex--;
  } else {
    trackIndex = musicList.length - 1;
  }
  loadTrack(trackIndex);
  playTrack();
}
//Palzunok
function seekTO(event) {
  let seekto = currTrack.duration * (track.value / 100);
  currTrack.currentTime = seekTO;
}
//Volume
function setVolume(event) {
  currTrack.volume = volume.value / 100;
}

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(currTrack.duration)) {
    seekPosition = currTrack.currentTime * (100 / currTrack.duration);
    track.value = seekPosition;

    let currentMinutes = Math.floor(currTrack.currentTime / 60);
    let currSeconds = Math.floor(currTrack.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(currTrack.duration / 60);
    let durationSeconds = Math.floor(currTrack.duration - durationMinutes * 60);
    //00:00
    if (currSeconds < 10) currSeconds = "0" + currSeconds;
    if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;
    if (currentMinutes < 10) currentMinutes = "0" + currentMinutes;
    if (durationMinutes < 10) durationMinutes = "0" + durationMinutes;
    //time
    currentTime.textContent = `${currentMinutes}:${currSeconds}`;
    durationTime.textContent = `${durationMinutes}:${durationSeconds}`;
  }
}
//Player event
track.addEventListener("change", seekTO);
volume.addEventListener("change", setVolume);

//Button event
randomTrack.addEventListener("click", randomMusicFn);
prevBtn.addEventListener("click", prevTrack);
nextBtn.addEventListener("click", nextTrack);
btnPlayPause.addEventListener("click", playPause);
repeatTrack.addEventListener("click", repeatMusicFn);
loadTrack(trackIndex);
