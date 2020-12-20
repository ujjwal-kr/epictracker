const memory = navigator.deviceMemory;
const platform = navigator.platform;
const hardwareConcurrency = navigator.hardwareConcurrency;
const language = navigator.language;
// Phrases
const memeoryPhrase = `Your device memorory [RAM] is around ${memory} GB`;
const platformPhrase = `You are possibly running: ${platform}`;
const hardwareConcurrencyPhrase = `You have ${hardwareConcurrency} logical processor cores running`;
const languagePhrase = `Your device language is ${language}`;
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
const graphicsInfoPhrase = `Your identfied graphics: ${graphicsRenderer}, VENDOR: ${graphicsVendor}`
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
    const response = await fetch("http://localhost:5000/generate/"+ btoa(JSON.stringify(data)) , {
        headers: {'Content-Type': 'application/json'},
        method: 'GET',
    })
    return response.json()
}

// init req
async function nowFetch() {
   const response = await fetch("http://localhost:5000", {
       headers: {'Content-Type': 'application/json'},
       method: 'GET'
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
        hardwareConcurrency: hardwareConcurrency,
        language: language,
        graphics: graphicsRenderer,
        graphicsVendor: graphicsVendor
    }
    console.log(data)
    bakeCookie(data).then(res => {
        console.log(res)
    })
})
