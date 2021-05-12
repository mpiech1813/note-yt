// popup must find a way to listen to data, maybe cookies?

const notebook = [];

const note = {
  title: '',
  link: '',
  timeSpamt: 0,
  quickNote: '',
};

const form = document.forms['inputForm'];
form.onsubmit = (e) => {
  e.preventDefault();
  const { title, link, stamp, note } = e.target.elements;
  if (title.checked) {
    console.log('hello title checked');
  }
};

const downloadToFile = (content, filename, contentType) => {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });

  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();

  URL.revokeObjectURL(a.href);
};

function createTXT() {
  const textArea = 'hello world';
  console.log(textArea);
  downloadToFile(textArea, 'my-new-file.txt', 'text/plain');
}

const endButton = document.getElementById('end');
endButton.addEventListener('click', createTXT);
// jeden
function getActiveTab() {
  return browser.tabs.query({ active: true, currentWindow: true });
}
// dwa
const sendRequest = () => {
  getActiveTab().then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, 'kolok');
  });
};

const continueButton = document.getElementById('continue');
continueButton.addEventListener('click', sendRequest);

browser.runtime.onMessage.addListener((message) => );
