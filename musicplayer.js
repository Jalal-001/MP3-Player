class MusicPlayer{
    constructor(List){
        this.List=List;
        this.musicIndex=0;
    }
    getMusic(){
        return this.List[this.musicIndex];//List-in 0-ci indeksindeki elementi
    }
    previus(){
        if(this.musicIndex != 0){
            this.musicIndex--;
        }else{
            this.musicIndex=this.List.length-1;
        }
    }
    next(){
        if(this.musicIndex + 1 < this.List.length){
            this.musicIndex++;
        }
        else{
            this.musicIndex = 0; // 0-ci indeksde 1-ci mahni dayanir
        }
    }
}