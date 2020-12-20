const memory = navigator.deviceMemory;
const platform = navigator.platform;
const hardwareConcurrency = navigator.hardwareConcurrency;
const language = navigator.language;

const memeoryPhrase = `Your device memorory [RAM] is around ${memory} GB`;
const platformPhrase = `You are possibly running: ${platform}`;
const hardwareConcurrencyPhrase = `You have ${hardwareConcurrency} logical processor cores`;
const languagePhrase = `Your device language is ${language}`

document.querySelector('.memory').textContent = memeoryPhrase;
document.querySelector('.platform').textContent = platformPhrase;
document.querySelector('.con').textContent = hardwareConcurrencyPhrase;
document.querySelector('.lang').textContent = languagePhrase;


async function nowFetch() {
   const response = await fetch("http://localhost:5000", {
       headers: {'Content-Type': 'application/json'},
       method: 'GET'
   })
   return response.json()
}

async function bakeCookie(data) {
    const response = await fetch("http://localhost:5000/generate/"+ btoa(JSON.stringify(data)) , {
        headers: {'Content-Type': 'application/json'},
        method: 'GET',
    })
    return response.json()
}

// PLay with cookies
nowFetch().then(response => {
    const data = {
        headers: response.headers,
        ip: response.ip,
        isp: response.isp,
        city: response.city,
        country: response.country,
        latitude: response.latitude,
        longitude: response.longitude,
        timezone: response.timezone,
        memory: memory,
        platform: platform,
    }
    console.log(data)
    bakeCookie(data).then(res => {
        console.log(res)
    })
})
