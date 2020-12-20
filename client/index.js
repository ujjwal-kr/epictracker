const memory = navigator.deviceMemory;
const memeoryPhrase = `Your device memorory is around ${memory}`;
let memeoryContainer = document.querySelector('.memory').textContent = memeoryPhrase;