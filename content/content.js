const titleItem = document.querySelector('h1 > yt-formatted-string').innerText;
const timeStamp = document.querySelector('span.ytp-time-current').innerText;

const data = { title: titleItem, timeStamp };
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
