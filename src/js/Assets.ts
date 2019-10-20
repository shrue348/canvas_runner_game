/**
 * Basic usage
 *
 * let ASSET_MANAGER = new AssetManager();
 * ASSET_MANAGER.add('img/earth.png');
 * ASSET_MANAGER.downloadAll(function() {
 *    let sprite = ASSET_MANAGER.getAsset('img/earth.png');
 *    ctx.drawImage(sprite, x - sprite.width/2, y - sprite.height/2);
 * });
 */

export class AssetManager {
  _queue: Array<string>;
  _successCount: number;
  _errorCount: number;
  _cache: any;

  constructor () {
    this._queue = [];
    this._successCount = 0;
    this._errorCount = 0;
    this._cache = {};
  }

  add (path: string) {
    this._queue.push(path);
  }

  downloadAll (callback?: () => void) {
    if (this._queue.length === 0) callback();

    for (let i = 0; i < this._queue.length; i++) {
      let path = this._queue[i];
      let ext = path.split('.').pop();

      switch (ext) {
        case 'png':
        case 'jpg':
        case 'jpeg':
          this._loadImage(path, callback);
          break;

        case 'json':
          this._loadJSON(path, callback);
          break;

        default:
          console.log('AssetManager: Unknown filetype');
          break;
      }
    }
  }

  get (key: number) {
    return this._cache[key];
  }

  _isDone () {
    return this._queue.length === this._successCount + this._errorCount;
  }

  _loadImage (path: string, callback: () => void) {
    let img = new Image();

    img.addEventListener('load', () => {
      this._successCount++;
      if (this._isDone()) { callback(); }
    }, false);

    img.addEventListener('error', () => {
      this._errorCount++;
      if (this._isDone()) { callback(); }
    });

    img.src = path;
    this._cache[path] = img;
  }

  async _loadJSON (path: string, callback: () => void) {

    await fetch(path).then(res => res.json()).then(data => {
      this._cache[path] = data;
      this._successCount++;
    }).catch(() => {
      this._errorCount++;
    }).then(() => {
      if (this._isDone()) { callback(); }
    });
  }
}

/**
 * Загружалка-проверялка аудио форматов
 */
// export class LibCanvasAudio {
//   audio: any;
//   src: string;

//   constructor (file: string) {
//     this.audio = new Audio;
//     this.src(file);
//   }

//   loadSrc (file: string) {
//     let codec = this.getSupport();
//     // @ts-ignore
//     if (!codec) throw 'AudioNotSupported';
//     this.audio.src = file.replace(/\*/g, this.getSupport());
//     this.audio.load();
//     return this;
//   }

//   getSupport () {
//     return !this.audio.canPlayType ? false :
//       this.audio.canPlayType('audio/ogg;') ? 'ogg' :
//         this.audio.canPlayType('audio/mpeg;') ? 'mp3' : false;
//   }

//   cloneAudio () {
//     if (window.opera) { // Reported Opera bug DSK-309302
//       let audioClone = new Audio;
//       audioClone.src = this.audio.src;
//     } else {
//       audioClone = this.audio.cloneNode(true);
//     }
//     audioClone.load();
//     return audioClone;
//   }

//   gatling (count) {
//     this.barrels = [];
//     this.gatIndex = 0;
//     while (count--) {
//       this.barrels.push(this.cloneAudio());
//     }
//     return this;
//   }

//   getNext () {
//     let elem = this.barrels[this.gatIndex];
//     ++this.gatIndex >= this.barrels.length && (this.gatIndex = 0);
//     return elem;
//   }

//   playNext () {
//     let elem = this.getNext();
//     elem.pause();
//     // firefox 3.5 starting audio bug
//     elem.currentTime = 0.025;
//     elem.play();
//     return this;
//   }
// }

// usage
// let shotSound = new LibCanvasAudio('explosion.*').gatling(6);

// window.addEventListener('keydown', function (e) {
//   shotSound.playNext();
// }, false);
