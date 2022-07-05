class Music{
    constructor(title,singer,img,file){
        this.title=title;
        this.singer=singer;
        this.img=img;
        this.file=file;
    }
    getName(){
        return this.title + " / " + this.singer;
    }
}

const musicList=[
    new Music("Boşver","Nilufer","1.jpeg","1.mp3"), // 0-ci index
    new Music("Bu da Geçer mi Sevgilim","Yalın","2.jpeg","2.mp3"),
    new Music("Aramızda Uçurumlar","Suat Suna","3.jpeg","3.mp3"),
    new Music("Adımız miskindir bizim","Athena","4.jpeg","4.mp3")
];