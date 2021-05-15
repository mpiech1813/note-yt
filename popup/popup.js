// popup must find a way to listen to data, maybe cookies?

let notebook = [];

let currentNote = {
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
  let textArea;
  if (notebook.length === 0) {
    textArea = `
    URL: ${currentNote.link}
    Title: ${currentNote.title}
    Time Stamp: ${currentNote.timeStamp}
    Quick Note: ${currentNote.quickNote}
    `;
  } else {
    notebook.forEach((note) => {
      textArea += `
      URL: ${note.link}
      Title: ${note.title}
      Time Stamp: ${note.timeStamp}
      Quick Note: ${note.quickNote}
      `;
    });

    displayDataFromStorage();
  }

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

function copyToClipboard() {
  let textArea = `
    URL: ${currentNote.link}
    Title: ${currentNote.title}
    Time Stamp: ${currentNote.timeStamp}
    Quick Note: ${currentNote.quickNote}
  `;

  navigator.clipboard.writeText(textArea).then(
    function () {
      /* clipboard successfully set */
      console.log('clip success');
    },
    function () {
      console.log('clip failed');
      /* clipboard write failed */
    }
  );
}

const continueButton = document.getElementById('continue');
continueButton.addEventListener('click', copyToClipboard);

browser.runtime.onMessage.addListener((message) => {
  currentNote.title = message.title;
  currentNote.link = message.url;
  currentNote.timeStamp = message.timeStamp;
});

const addToLocalStorage = () => {
  notebook.push(currentNote);
  browser.storage.sync.set({ notebook });
  counterUpdate();
  // console.log(notebook);
};

const counterUpdate = () => {
  const counter = document.getElementById('counter');
  counter.innerText = notebook.length;
};

const addToLocalStorageButton = document.getElementById('addLS');
addToLocalStorageButton.addEventListener('click', addToLocalStorage);

const loadData = async () => {
  console.log('loadData fired');
  let notebookFromStore = await browser.storage.sync.get('notebook');
  console.log('notebook from store', notebookFromStore);
  if (notebookFromStore.notebook) notebook = notebookFromStore.notebook;
  console.log('notebook from state', notebook);
  counterUpdate();
};

document.addEventListener('DOMContentLoaded', loadData);

const displayDataFromStorage = async () => {
  await browser.storage.sync.remove('notebook');
  counterUpdate();
};

const displayButton = document.getElementById('display');
displayButton.addEventListener('click', displayDataFromStorage);
