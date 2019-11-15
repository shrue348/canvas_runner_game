export class LibCanvasAudio {
  audio: any;
  barrels: Array<any>;
  gatIndex: number;

  constructor (file: string) {
    this.audio = new Audio;
    this.src(file);
  }

  src (file: string) {
    let codec = this.getSupport();
    if (!codec) throw 'AudioNotSupported';
    this.audio.src = file.replace(/\*/g, this.getSupport().toString());
    this.audio.load();
    return this;
  }

  getSupport () {
    return !this.audio.canPlayType ? false :
      this.audio.canPlayType('audio/ogg;') ? 'ogg' :
      this.audio.canPlayType('audio/mpeg;') ? 'mp3' : false;
  }

  cloneAudio () {
    // @ts-ignore
    if (window.opera) { // Reported Opera bug DSK-309302
      var audioClone = new Audio;
      audioClone.src = this.audio.src;
    } else {
      audioClone = this.audio.cloneNode(true);
    }
    audioClone.load();
    return audioClone;
  }

  gatling (count: number) {
    this.barrels = [];
    this.gatIndex = 0;
    while (count--) {
      this.barrels.push(this.cloneAudio());
    }
    return this;
  }

  getNext () {
    var elem = this.barrels[this.gatIndex];
    ++this.gatIndex >= this.barrels.length && (this.gatIndex = 0);
    return elem;
  }

  playNext () {
    var elem = this.getNext();
    elem.pause();
    // firefox 3.5 starting audio bug
    elem.currentTime = 0.025;
    elem.play();
    return this;
  }
};

// let shotSound = new LibCanvasAudio('explosion.*').gatling(6);

// window.addEventListener('keydown', function (e) {
//   shotSound.playNext();
// }, false);