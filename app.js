const container=document.querySelector(".container");
const image=document.querySelector("#music_image");
const title=document.querySelector("#music_details .title");
const singer=document.querySelector("#music_details .singer");
const prev=document.querySelector("#controls #prev");
const play=document.querySelector("#controls #play");
const next=document.querySelector("#controls #next");
const duration=document.querySelector("#duration");
const currentTime=document.querySelector("#current-time");
const volume=document.querySelector("#volume");
const volumeBar=document.querySelector("#volumeBar");
const ul=document.querySelector("#music-list ul");

// ---CLASS-IN OBYEKTININ YARADILMASI---
const player = new MusicPlayer(musicList);

window.addEventListener("load",()=>{
    let index = player.getMusic(); //index musiqi indeksini getirir
    displayMusic(index); 
    displayMusicList(musicList);
    isPlayingNow();
});
// arrow function
const displayMusic=(index)=>{
    image.src="img/" + index.img;
    audio.src="mp3/"+ index.file;
    title.innerText = index.getName();
    singer.innerText=index.singer;
};
play.addEventListener("click",()=>{
    const isMusicPlay=container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();  
});

prev.addEventListener("click",()=>{prevMusic();})

next.addEventListener("click",()=>{nextMusic();})

const playMusic=()=>{
    container.classList.add("playing");
    audio.play();
    play.querySelector("i").classList="fa-solid fa-pause"; //Deyisilecek icon i-dir.
};
const pauseMusic=()=>{
    container.classList.remove("playing");
    audio.pause();
    play.querySelector("i").classList="fa-solid fa-play";
};
const prevMusic=()=>{
    player.previus();
    let music=player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
};
const nextMusic=()=>{
    player.next();
    let music=player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
};

audio.addEventListener("loadedmetadata",()=>{
    duration.textContent=calculateTime(audio.duration); //audio.duration is a javascript method
    progressBar.max=Math.floor(audio.duration); //ProgressBar max(end) time = Music max time
});

const calculateTime=(totalSecond)=>{
    const minute=Math.floor(totalSecond/60);
    const second=Math.floor(totalSecond%60);
    const newSecond=second<10?`0${second}`:`${second}`;
    const result =`${minute}:${newSecond}`;
    return result;
};
audio.addEventListener("timeupdate",()=>{
    progressBar.value=Math.floor(audio.currentTime); //audio.currentTime is a javascript method
    currentTime.textContent=calculateTime(progressBar.value);
});
progressBar.addEventListener("input",()=>{
    currentTime.textContent=calculateTime(progressBar.value);
    audio.currentTime=progressBar.value; //progressBar uzerinden bir deyer daxil etdikde
});


let volumeMood="sound";

volume.addEventListener("click",()=>{
    if(volumeMood === "sound"){
        audio.muted=true;
        volumeMood="silent";
        volume.classList="fa-solid fa-volume-xmark";
        volumeBar.value=0;
    }
    else{
        audio.muted=false;
        volumeMood="sound";
        volume.classList="fa-solid fa-volume-high";
        volumeBar.value=100;
    }
});

volumeBar.addEventListener("input",(p)=>{
    const value=p.target.value;
    audio.volume=value/100;
    if(value==0){
        audio.muted=true;
        volumeMood="silent";
        volume.classList="fa-solid fa-volume-xmark";
    }
    else{
        audio.muted=false;
        volumeMood="sound";
        volume.classList="fa-solid fa-volume-high";
    }
});

const displayMusicList = (list) =>{
    for(let i=0; i< list.length; i++){
        let liTag=`
                <li onclick="selectedMusic(this)" li-index=${i} class="list-group-item d-flex justify-content-between align-items-center">
                    <span>${list[i].getName()}</span>
                    <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
                    <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
                 </li>
        `;
        ul.insertAdjacentHTML("beforeend",liTag);

        let liAudioTag=ul.querySelector(`.music-${i}`); //melumati audio-dan alaraq span-a set edirik.
        let liAudioDuration=ul.querySelector(`#music-${i}`);
        liAudioTag.addEventListener("loadeddata",()=>{
            liAudioDuration.innerText=calculateTime(liAudioTag.duration);
        });
    }
};

const selectedMusic=(li)=>{
    player.musicIndex=li.getAttribute("li-index");
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow();
    
};
const isPlayingNow=()=>{
    for(let li of ul.querySelectorAll("li")){
        if(li.classList.contains("playing")){
            li.classList.remove("playing");
        }
        if(li.getAttribute("li-index")==player.musicIndex){
            li.classList.add("playing");
        }
    }
}
audio.addEventListener("ended",()=>{
    nextMusic();
})