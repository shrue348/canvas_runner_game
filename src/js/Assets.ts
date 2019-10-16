/**
 * Basic usage
 *
 * var ASSET_MANAGER = new AssetManager();
 * ASSET_MANAGER.queueDownload('img/earth.png');
 * ASSET_MANAGER.downloadAll(function() {
 *    var sprite = ASSET_MANAGER.getAsset('img/earth.png');
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

  downloadAll (callback: () => void) {
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
    })

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
