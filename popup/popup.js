// popup must find a way to listen to data, maybe cookies?

const notebook = [];

const currentNote = {
  title: '',
  link: '',
  timeStamp: 0,
  quickNote: '',
};

const form = document.forms['inputForm'];
form.onsubmit = (e) => {
  e.preventDefault();
  const { title, link, stamp, note } = e.target.elements;

  currentNote.quickNote = note.value;
  form.reset();

  if (!title.checked) delete currentNote.title;
  if (!link.checked) delete currentNote.link;
  if (!stamp.checked) delete currentNote.timeStamp;

  sendRequest();
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
  let textArea = `
    URL: ${currentNote.link}
    Title: ${currentNote.title}
    Time Stamp: ${currentNote.timeStamp}
    Quick Note: ${currentNote.quickNote}
  `;
  downloadToFile(textArea, `Note.txt`, 'text/plain');
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
continueButton.addEventListener('click', () => console.log(currentNote));

browser.runtime.onMessage.addListener((message) => {
  currentNote.title = message.title;
  currentNote.link = message.url;
  currentNote.timeStamp = message.timeStamp;
});
