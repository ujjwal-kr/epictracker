const memory = navigator.deviceMemory;
const platform = navigator.platform;
const hardwareConcurrency = navigator.hardwareConcurrency;
const language = navigator.language;
const deviceWidth = screen.availWidth;
const deviceHeight = screen.availHeight;
const colorDepth = screen.colorDepth;
// Phrases
const memeoryPhrase = `Your device memory [RAM] is around ${memory} GB.`;
const platformPhrase = `You are possibly running: ${platform}.`;
const hardwareConcurrencyPhrase = `You have ${hardwareConcurrency} logical processor cores running.`;
const languagePhrase = `Your device language is ${language}.`;
const dimentionPhrase = `Your device dimensions are ${deviceHeight} X ${deviceWidth}.`;
const colorDepthPhrase = `Your device's color depth is ${colorDepth}.`;
document.querySelector('.headers').textContent = `LOADING.............`
document.querySelector('.pin').textContent = `LOADING...............`;
// Put info
document.querySelector('.memory').textContent = memeoryPhrase;
document.querySelector('.platform').textContent = platformPhrase;
document.querySelector('.con').textContent = hardwareConcurrencyPhrase;
document.querySelector('.lang').textContent = languagePhrase;
document.querySelector('.depth').textContent = colorDepthPhrase;
document.querySelector('.dimentions').textContent = dimentionPhrase;
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
// cookie string send
async function bakeCookie(data) {
    const response = await fetch("https://mycookie-monster.herokuapp.com/generate/"+ btoa(JSON.stringify(data)) , {
        headers: {'Content-Type': 'application/json'},
        method: 'GET',
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
// Visits
let visitCount = localStorage.getItem("visits")
if (!visitCount) {
    document.querySelector('.visits').textContent = `This is your first time on this page`;
    localStorage.setItem("visits", 1)
} else {
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem("visits", visitCount)
    document.querySelector('.visits').textContent = `You have visited this page ${visitCount} times`;
}
// PLay with cookies
nowFetch().then(response => {
    const data = {
        headers: response.headers, ip: response.ip,isp: response.isp,
        city: response.city,country: response.country,latitude: response.latitude,
        longitude: response.longitude,timezone: response.timezone,memory: memory,
        platform: platform,hardwareConcurrency: hardwareConcurrency,language: language,
        graphics: graphicsRenderer, graphicsVendor: graphicsVendor, pin: response.pin, deviceWidth: deviceWidth,
        deviceHeight: deviceHeight
    }
    const dynamicData = {
        headers: data.headers, city: data.city, timezone: data.timezone,
        memory: data.memory, platform: data.platform, hardwareConcurrency: data.hardwareConcurrency,
        graphics: graphicsRenderer, graphicsVendor: graphicsVendor, deviceWidth: deviceWidth, 
        deviceHeight: deviceHeight, language: language, colorDepth: colorDepth, isp: data.isp
    }
    const encodedDinamic = btoa(JSON.stringify(dynamicData))
    const HASH = sha1(encodedDinamic)
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
