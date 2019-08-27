/* App-wide constants */

export const TITLE = "JK Boxed.com";
export const MAIN_WIDTH = '800px';
export const HEADER_IMAGE = '/assets/boxed_top680.jpg';
export const HEADER_LINK = '#';

// "bogus db: vend static JSON from /assets/data
export const DATA_ENDPOINT = '/assets/data/';

export const JKBOXED = 'jkboxed';
export const COFFEEHOUSE = 'coffeehouse';
export const BERKELEYSQUARE = 'berkeleysquare';
export const JK_SOLO = 'jk';
export const DEFAULT_COLLECTION = JKBOXED;
export const DEFAULT_ENSEMBLE = 'all';

export const video_formats = ['mp4'];
export const audio_formats = ['mp3'];

export const isVideo = name => {
  let ret = false;
  if (name) {
    video_formats.forEach(n => {
      if (name.endsWith(n)) {ret = true};
    });
  }
  return ret;
};

export const isAudio = name => {
  let ret = false;
  if (name) {
    audio_formats.forEach(n => {
      if (name.endsWith(n)) {ret = true};
    });
  }
  return ret;
};

export const isYouTube = name => (name && name.startsWith('YouTube:'));

export const isVimeo = name => (name && name.startsWith('Vimeo:'));
