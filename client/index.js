const memory = navigator.deviceMemory;
const platform = navigator.platform;
const hardwareConcurrency = navigator.hardwareConcurrency;
const language = navigator.language;
// Phrases
const memeoryPhrase = `Your device memorory [RAM] is around ${memory} GB.`;
const platformPhrase = `You are possibly running: ${platform}.`;
const hardwareConcurrencyPhrase = `You have ${hardwareConcurrency} logical processor cores running.`;
const languagePhrase = `Your device language is ${language}.`;
// Put info
document.querySelector('.memory').textContent = memeoryPhrase;
document.querySelector('.platform').textContent = platformPhrase;
document.querySelector('.con').textContent = hardwareConcurrencyPhrase;
document.querySelector('.lang').textContent = languagePhrase;
// Try to get the graphichal processing unit info
const canv = document.getElementById("canv");
const gl = canv.getContext("experimental-webgl");
const graphicsVendor = getGraphicalUnitExtensions(gl).vendor;
const graphicsRenderer = getGraphicalUnitExtensions(gl).renderer;
const graphicsInfoPhrase = `Your identfied graphics: ${graphicsRenderer}, VENDOR: ${graphicsVendor}.`
document.querySelector(".graphics").textContent = graphicsInfoPhrase;
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


// PLay with cookies
nowFetch().then(response => {
    const data = {
        headers: response.headers, ip: response.ip,isp: response.isp,
        city: response.city,country: response.country,latitude: response.latitude,
        longitude: response.longitude,timezone: response.timezone,memory: memory,
        platform: platform,hardwareConcurrency: hardwareConcurrency,language: language,
        graphics: graphicsRenderer,graphicsVendor: graphicsVendor
    }

    const ipPhrase = `Your IP adress is ${data.ip}.`;
    const ispPhrase = `Your network provider is ${data.isp}.`;
    const headersPhrase = `${data.headers}.`;
    const countryPhrase = `You live in ${data.country}.`;
    const cityPhrase = `Your city ${data.city}.`
    const timezonePhrase = `Your timezone is ${data.timezone}.`;

    document.querySelector('.ip').textContent = ipPhrase;
    document.querySelector('.isp').textContent = ispPhrase;
    document.querySelector('.headers').textContent = headersPhrase;
    document.querySelector('.country').textContent = countryPhrase;
    document.querySelector('.city').textContent = cityPhrase;
    document.querySelector('.timezone').textContent = timezonePhrase;


    bakeCookie(data).then(res => {
        document.cookie = `monstercookie=${res.cookie}`
        console.log(document.cookie)
        const cookiePhrase = `The cookie I stored to itentify you: ${res.cookie}.`;
        document.querySelector('.cookie').textContent = cookiePhrase;
    })
})
