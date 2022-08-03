//
const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img1 img"),
musicName = wrapper.querySelector(".song_details .name"),
musicArtist = wrapper.querySelector(".song_details .artist");
mainAudio = wrapper.querySelector(".Audioc"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressArea = wrapper.querySelector(".progress_area"),
progressBar = wrapper.querySelector(".progress_bar");

let musicIndex = 2;

window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
})

//
function loadMusic(indexNumb) {
    musicName.innerText = allmusic[indexNumb -1].name;
    musicArtist.innerText = allmusic[indexNumb -1].artist;
    musicImg.src = `gambar/${allmusic[indexNumb -1].img}.jpg`;
    mainAudio.src = `music/${allmusic[indexNumb -1].src}.mp3`;   
}
//
function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}
//
function pauseMusic(){
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}
//
function nextMusic(){
    musicIndex++;
    musicIndex > allmusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}
//
function prevMusic(){
    musicIndex--;
    musicIndex < 1 ? musicIndex = allmusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}
//
playPauseBtn.addEventListener("click",()=>{
    const isMusicPaused = wrapper.classList.contains("paused");
    //
    isMusicPaused ? pauseMusic() : playMusic();
});

//
nextBtn.addEventListener("click", ()=>{
    nextMusic();
})
//
prevBtn.addEventListener("click", ()=>{
    prevMusic();
})
//
mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current"),
    musicDuration = wrapper.querySelector(".duration");

    mainAudio.addEventListener("loadeddata", ()=>{
       

        //
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10){
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });
        //
        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
        if(currentSec < 10){
            currentSec = `0${currentSec}`;
        }
        musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

//
progressArea.addEventListener("click", (e)=>{
    let progressWidthval = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
    playMusic(); 
});

