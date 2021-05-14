const titleItem = document.querySelector('h1 > yt-formatted-string').innerText;
const timeStamp = document.querySelector(
  'div > span.ytp-time-current'
).innerText;
let url = window.location.href;

const data = { title: titleItem, timeStamp, url };
// .querySelectorAll('yt-formatted-string')

// const title = 'hello world';

browser.runtime.onMessage.addListener(addBorder);

function addBorder() {
  // document.body.style.border = '20px solid green';
  browser.runtime.sendMessage(data);
}

// browser.find
//   .find('.title style-scope ytd-video-primary-info-renderer')
//   .then(sendTitle);
