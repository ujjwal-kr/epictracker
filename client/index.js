// Get and display the stuff

const memory = navigator.deviceMemory;
const platform = navigator.platform;

const memeoryPhrase = `Your device memorory is around ${memory}`;
const platformPhrase = `You are running ${platform}`;

document.querySelector('.memory').textContent = memeoryPhrase;
document.querySelector('.platform').textContent = platformPhrase;


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
    postData(data).then(res => {
        console.log(res)
    })
})



// initial request

async function nowFetch() {
   const response = await fetch("http://localhost:5000", {
       headers: {'Content-Type': 'application/json'},
       method: 'GET'
   })
   return response.json()
}

async function postData(data) {
    const response = await fetch("http://localhost:5000/generate/", {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: (JSON.stringify(data))
    })
    return response.json()
}
