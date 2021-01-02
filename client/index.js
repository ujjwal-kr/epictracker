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
}
function guessIfTheDeviceIsOnTable(x,y,z) {
    if (x === 0 && y === 0 && z === 0) {
        return document.querySelector('.rotation-rate').textContent = `Your device is on something like a table`;
    } 
    return document.querySelector('.rotation-rate').textContent = `Your device in your hands`;
}
function getIfDeviceInAcceleration(x,y,z) {
    let a = x*x;
    let b = y*y;
    let c = z*z;
    if(a+b+c > 0) {
        return document.querySelector('.acceleration').textContent = `Your device is in accelerated motion`;
    } 
    document.querySelector('.acceleration').textContent = `Your device isnt accelerating`;
}
// cookie string send
async function bakeCookie(data) {
    const response = await fetch("http://localhost:5000/generate/"+ btoa(JSON.stringify(data)) , {
        headers: {'Content-Type': 'application/json'},
        method: 'GET',
    })
    return response.json()
}
// VPN
async function ifVpn(data) {
    const response = await fetch("http://localhost:5000/if-vpn/"+ btoa(JSON.stringify(data)), {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
    return response.json()
}
// init req
async function nowFetch() {
   const response = await fetch("http://localhost:5000/", {
       headers: {'Content-Type': 'application/json'},
       method: 'GET'
   })
   return response.json()
}
// PLay with cookies
nowFetch().then(response => {
    const data = {
        headers: response.headers, ip: response.ip,isp: response.isp,
        city: response.city,country: response.country,latitude: response.latitude,
        longitude: response.longitude,timezone: response.timezone,memory: memory,
        platform: platform,hardwareConcurrency: hardwareConcurrency,language: language,
        graphics: graphicsRenderer, graphicsVendor: graphicsVendor, pin: response.pin, deviceWidth: deviceWidth,
        deviceHeight: deviceHeight, weather: response.weather, temperature: response.temperature
    }
    const ipPhrase = `Your IP address is ${data.ip}.`;
    const ispPhrase = `Your network provider is ${data.isp}.`;
    const headersPhrase = `${data.headers}.`;
    const countryPhrase = `You live in ${data.country}.`;
    const cityPhrase = `Your city is ${data.city}.`
    const timezonePhrase = `Your timezone is ${data.timezone}.`;
    const pinPhrase = `Your pin code is around ${data.pin}.`
    const weatherPhrase = `The weather of your area: ${data.weather}.`;
    const temperaturePhrase = `Temperature of area: ${data.temperature} deg C.`
    document.querySelector('.ip').textContent = ipPhrase;
    document.querySelector('.isp').textContent = ispPhrase;
    document.querySelector('.headers').textContent = headersPhrase;
    document.querySelector('.country').textContent = countryPhrase;
    document.querySelector('.city').textContent = cityPhrase;
    document.querySelector('.timezone').textContent = timezonePhrase;
    document.querySelector('.pin').textContent = pinPhrase;
    document.querySelector('.weather').textContent = weatherPhrase;
    document.querySelector('.temperature').textContent = temperaturePhrase;
    bakeCookie(data).then(res => {
        document.cookie = `monstercookie=${res.cookie}`
        console.log(document.cookie)
        const cookiePhrase = `The cookie I stored to identify you: ${res.cookie}.`;
        document.querySelector('.cookie').textContent = cookiePhrase;
    })
})
    const date = Date.now()
    console.log(date)
    const vpnData = {timezone: data.timezone}
    console.log(vpnData)
    ifVpn(vpnData).then(res => { console.log(res) })
})
