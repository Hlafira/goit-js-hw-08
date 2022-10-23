import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const KEY_TIME = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const startTime = localStorage.getItem(KEY_TIME)
  ? Number(localStorage.getItem(KEY_TIME))
  : 0;

player.setCurrentTime(startTime);

console.log(throttle);
player.on(
  'timeupdate',
  throttle(function (currentTime) {
    localStorage.setItem(KEY_TIME, currentTime.seconds);
  }, 1000)
);
