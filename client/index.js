// Get and display the stuff

const memory = navigator.deviceMemory;
const platform = navigator.platform;

const memeoryPhrase = `Your device memorory is around ${memory}`;
const platformPhrase = `You are running ${platform}`;

document.querySelector('.memory').textContent = memeoryPhrase;
document.querySelector('.platform').textContent = platformPhrase;

// Request goes here

nowFetch().then(response => {
    console.log(response)
})

async function nowFetch() {
   const response =  await fetch("https://mycookie-monster.herokuapp.com", {
       headers: {'Content-Type': 'application/json'},
       method: 'GET'
   })
   return response.json()
}
