
export const TITLE = "JK Boxed.com";
export const HEADER_LINK = '#';

// "bogus db: vend static JSON from /assets/data
export const DATA_ENDPOINT = '/assets/data/';

export const DEFAULT_COLLECTION = 'home';
export const DEFAULT_ENSEMBLE = 'all';
export const DEFAULT_ID = 1000;

export const video_formats = ['mp4', 'webm'];
export const audio_formats = ['mp3'];

export const getVideoMimeType = name => {
  if (!name) {
    return '';
  }
  if (name.endsWith('webm')) {
    return 'video/webm';
  }
  if (name.endsWith('mp4')) {
    return 'video/mp4';
  }
  return '';
};

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
