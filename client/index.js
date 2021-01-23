const memory = navigator.deviceMemory;
const platform = navigator.platform;
const hardwareConcurrency = navigator.hardwareConcurrency;
const language = navigator.language;
const deviceWidth = screen.availWidth;
const deviceHeight = screen.availHeight;
const colorDepth = screen.colorDepth;
let touchPoints = navigator.maxTouchPoints;
let touchSupport;
// Phrases
const memeoryPhrase = `Your device memory [RAM] is around ${memory} GB.`;
if (touchPoints > 1) {touchSupport = true}
else {touchSupport = false}
const touchPhrase = `Touch screen support: ${touchSupport}`
const platformPhrase = `You are possibly running: ${platform}.`;
const hardwareConcurrencyPhrase = `You have ${hardwareConcurrency} logical processor cores running.`;
const languagePhrase = `Your device language is ${language}.`;
const dimentionPhrase = `Your device dimensions are ${deviceHeight} X ${deviceWidth}.`;
const colorDepthPhrase = `Your device's color depth is ${colorDepth}.`;
document.querySelector('.headers').textContent = `LOADING.............`;
document.querySelector('.pin').textContent = `LOADING...............`;

// Put info
document.querySelector('.memory').textContent = memeoryPhrase;
document.querySelector('.platform').textContent = platformPhrase;
document.querySelector('.con').textContent = hardwareConcurrencyPhrase;
document.querySelector('.lang').textContent = languagePhrase;
document.querySelector('.depth').textContent = colorDepthPhrase;
document.querySelector('.dimentions').textContent = dimentionPhrase;
document.querySelector('.touch').textContent = touchPhrase
document.querySelector('.scan-container').style.display = "none";

// Try to get the graphichal processing unit info
const canv = document.getElementById("canv");
const gl = canv.getContext("experimental-webgl");
const graphicsVendor = getGraphicalUnitExtensions(gl).vendor;
const graphicsRenderer = getGraphicalUnitExtensions(gl).renderer;
const graphicsInfoPhrase = `Your identified graphics: ${graphicsRenderer}, VENDOR: ${graphicsVendor}.`;

// Getting graphic extensions with WEBGL
function getGraphicalUnitExtensions(gl){
    const unMaskedInfo = {
        renderer: '',
        vendor: '',
    }
    const dbgRenderInfo = gl.getExtension("WEBGL_debug_renderer_info")
    if (dbgRenderInfo != null) {
        unMaskedInfo.renderer = gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
        unMaskedInfo.vendor = gl.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL);
    }
    return unMaskedInfo;
}

document.querySelector(".graphics").textContent = graphicsInfoPhrase;
// Device Acceleration go brrrrr
if (deviceWidth < 990) {
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', function(event) {
            setTimeout(() => {
                guessIfTheDeviceIsOnTable(
                    Math.round(event.rotationRate.beta), 
                    Math.round(event.rotationRate.alpha),
                    Math.round(event.rotationRate.gamma))
                getIfDeviceInAcceleration(
                    Math.round(event.acceleration.x),
                    Math.round(event.acceleration.y),
                    Math.round(event.acceleration.z),
                )   
            }, 1000); 
        })
    }
} else {
    document.querySelector('.rotation-rate').textContent = `Open this website on your mobile device to see device motion tracker information`;
}

function guessIfTheDeviceIsOnTable(x,y,z) {
    if (x === 0 && y === 0 && z === 0) {
        document.querySelector('.rotation-rate').textContent = `Your device is on something like a table`;
    } else {
        document.querySelector('.rotation-rate').textContent = `Your device is in your hands`;
    }
}

function getIfDeviceInAcceleration(x,y,z) {
    let a = x*x;
    let b = y*y;
    let c = z*z;
    if(a+b+c > 0) {
        document.querySelector('.acceleration').textContent = `Your device is in accelerated motion`;
    } else {
        document.querySelector('.acceleration').textContent = `Your device isnt accelerating`;
    }
}

async function collectHASH(sha, meta) {
    meta = JSON.stringify(meta)
    meta = btoa(meta)
    const response = await fetch("https://mycookie-monster.herokuapp.com/collect-sha/"+sha, {
        headers: {'Content-Type': 'application/json', 'metadata': meta},
        method: 'GET',
    })
    return response.json()
}

async function scan() {
    const response = await fetch("https://mycookie-monster.herokuapp.com/scan", {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    })
    return response.json()
}

// Add SHA
async function addSHA(sha, meta) {
    meta = btoa(meta)
    const response = await fetch("https://mycookie-monster.herokuapp.com/add-sha/"+sha, {
        headers: {'Content-Type': 'application/json', 'metadata': meta},
        method: 'GET'
    })
    return response.json()
}

// init req
async function nowFetch() {
   const response = await fetch("https://mycookie-monster.herokuapp.com/", {
       headers: {'Content-Type': 'application/json'},
       method: 'GET'
   })
   return response.json()
}

// weather
async function weather(city) {
    const response = await fetch("https://mycookie-monster.herokuapp.com/weather/"+city, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    })
    return response.json()
}

nowFetch().then(response => {
    const data = {
        headers: response.headers, ip: response.ip,isp: response.isp,
        city: response.city,country: response.country,latitude: response.latitude,
        longitude: response.longitude,timezone: response.timezone,memory: memory,
        platform: platform,hardwareConcurrency: hardwareConcurrency,language: language,
        graphics: graphicsRenderer, graphicsVendor: graphicsVendor, pin: response.pin, deviceWidth: deviceWidth,
        deviceHeight: deviceHeight, touchPoints: touchPoints
    }

    const dynamicData = {
        headers: data.headers, city: data.city, timezone: data.timezone,
        memory: data.memory, platform: data.platform, hardwareConcurrency: data.hardwareConcurrency,
        graphics: graphicsRenderer, graphicsVendor: graphicsVendor, deviceWidth: deviceWidth, 
        deviceHeight: deviceHeight, language: language, colorDepth: colorDepth, isp: data.isp, touchPoints: touchPoints
    }

    const encodedDynamic = btoa(JSON.stringify(dynamicData))
    const HASH = sha1(encodedDynamic)
    document.querySelector('.visits').textContent = `LOADING.......`
    addSHA(HASH).then(shaRESPONSE => {
        const visits = shaRESPONSE.visits
        document.querySelector('.visits').textContent = `According to the unique hash, you have visited the site ${visits} time(s).`
        console.log(visits)
        document.querySelector('.scan-container').style.display = "block";
    }).catch(e => {
        console.log(e)
    })

    const optIn = document.querySelector('.optIn')
    optIn.addEventListener('click', (e) => {
        e.preventDefault()
        collectHASH(HASH, data).then(resp => {console.log(resp)})
        .catch(e => {console.log(e)})
    })

    const scanButton = document.querySelector('.scanButton')
    scanButton.addEventListener('click', async (e) => {
        document.querySelector('.scan-results').textContent = `Scanning.....`;
        await collectHASH(HASH, data).then(resp => {console.log(resp)})
        .catch(e => {console.log(e)})

        scan().then(scanRes => {
            document.querySelector('.scan-results').textContent = ``;
            scanRes.items.map((item, i) => {
                if (item.sha === HASH) {
                    scanRes.items.splice(i, 1)
                }
            })
            console.log(scanRes)
        }).catch(e => {console.log(e)})
    })

    console.log("HASH:" + HASH)
    const hashPhrase = `Your identity HASH: ${HASH}`
    const ipPhrase = `Your IP address is ${data.ip}.`;
    const ispPhrase = `Your network provider is ${data.isp}.`;
    const headersPhrase = `${data.headers}.`;
    const countryPhrase = `You live in ${data.country}.`;
    const cityPhrase = `Your city is ${data.city}.`
    const timezonePhrase = `Your timezone is ${data.timezone}.`;
    const pinPhrase = `Your pin code is around ${data.pin}.`

    document.querySelector('.ip').textContent = ipPhrase;
    document.querySelector('.isp').textContent = ispPhrase;
    document.querySelector('.headers').textContent = headersPhrase;
    document.querySelector('.country').textContent = countryPhrase;
    document.querySelector('.city').textContent = cityPhrase;
    document.querySelector('.timezone').textContent = timezonePhrase;
    document.querySelector('.pin').textContent = pinPhrase;
    document.querySelector('.hash').textContent = hashPhrase;

    // weather
    weather(data.city).then(weatherData => {
        const weatherPhrase = `The weather of your area: ${weatherData.description}.`;
        const temperaturePhrase = `Temperature of area: ${weatherData.temperature} deg C.`;
        document.querySelector('.weather').textContent = weatherPhrase;
        document.querySelector('.temperature').textContent = temperaturePhrase;
    })
    
    // VPN DETECTION
    if (deviceWidth > 990) {
        const date = new Date(Date.now())
        const vpnData = {timezone: data.timezone, deviceTime: date.getTime()}
        let options = {
            timeZone: vpnData.timezone,
            hour: 'numeric',
            minute: 'numeric',
            month: 'numeric',
            second: 'numeric',
            year: 'numeric',
            day: 'numeric'
        };
        formatter = new Intl.DateTimeFormat([], options);
        const stringTime = formatter.format(new Date());
        const IPtime = Date.parse(stringTime)
        let diff = IPtime - Date.now()
        if (diff < 0) {
            diff = -1*diff
        }
        if(diff > 50000) {
            console.log("YAY VPN")
            document.querySelector('.VPN').textContent = `You ARE using a VPN`
        }else {
            console.log("NO VPN")
            document.querySelector('.VPN').textContent = `You donot seem to Use a VPN`
        }
    }
})
