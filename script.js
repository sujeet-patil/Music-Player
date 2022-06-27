let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
    {
        name: "Lover",
        artist: "Diljit Dosanjh",
        image: "https://www.pagalworld.pw/GpE34Kg9Gq/113515/145952-lover-diljit-dosanjh-mp3-song-300.jpg",
        path:"./music/Lover.mp3"
    },
    {
        name: "Hymn for the Weekend",
        artist: "Coldplay",
        image: "https://naasongspro.com/wp-content/uploads/2022/05/download-4.jpg",
        path:"./music/Hymn.mp3"
    },
    {
        name: "Pasoori",
        artist: "Shae Gill, Ali Sethi",
        image: "https://www.pagalworld.pw/GpE34Kg9Gq/113604/148772-pasoori-mp3-song-300.jpg",
        path:"./music/Pasoori.mp3"
    },
]

function loadTrack(track_index){
    clearInterval(updateTimer);
    resetValues();

    curr_track.src = track_list[track_index].path;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = "PLAYING "+(track_index+1)+" OF "+track_list.length;

    updateTimer = setInterval(seekUpdate,1000);
    curr_track.addEventListener("ended",nextTrack);

    random_bg_color();
}

function random_bg_color(){
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    document.body.style.background = bgColor;
}

function resetValues(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack(){
    if(!isPlaying)
        playTrack();
    else
        pauseTrack();
}

function playTrack(){
    curr_track.play();
    isPlaying=true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack(){
    curr_track.pause();
    isPlaying=false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack(){
    if(track_index<track_list.length-1)
        track_index++;
    else
        track_index=0;
    loadTrack(track_index);
    playTrack();
}

function prevTrack(){
    if(track_index>0)
        track_index--;
    else
        track_index = track_list.length-1;

    loadTrack(track_index);
    playTrack();
}

function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value/100);
    curr_track.currentTime = seekto;
}

function setVolume(){
    curr_track.volume = volume_slider.value/100;
}

function seekUpdate(){
    let seekPosition =0;

    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime*(100/curr_track.duration);
        seek_slider.value=seekPosition;

        let curMin = (Math.floor(curr_track.currentTime/60));
        let currSec = Math.floor(curr_track.currentTime-curMin*60);
        let totMin = Math.floor(curr_track.duration/60);
        let totSec = Math.floor(curr_track.duration - totMin*60);
        // console.log(currSec)
        if (currSec < 10) { currSec = "0" + currSec; }
        if (totSec < 10) { totSec = "0" + totSec; }
        if (curMin < 10) { curMin = "0" + curMin; }
        if (totMin < 10) { totMin = "0" + totMin; }
        curr_time.textContent = curMin+":"+currSec;
        total_duration.textContent = totMin+":"+totSec;
    }
}

loadTrack(track_index);