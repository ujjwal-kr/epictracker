# `EpicTracker`
Demo: https://epictracker.now.sh
- It is a demonstration project of how can I track you using [device fingerprinting](https://en.wikipedia.org/wiki/Device_fingerprint) and some automated lookups and stuff.
- It uses modern Javascript APIs to identify your metadata and generates an [SHA-1 hash](https://en.wikipedia.org/wiki/SHA-1) based on it. The hash can be used to further identify the browser even after clearing the cache or using the demo in private browsing mode.
- I may create dummy marketing services in future to demonstrate the (targeted ads) tracking process close to the realworld.

## How it works
- The scripts running on the website gathers information about you by transfering data back and forth between your device and my server, then displays them to you.
- A [HASH](https://en.wikipedia.org/wiki/Cryptographic_hash_function) (unique identifier) for your device browser is then generated.
- I save the HASH and update the visit count everytime the server sees the same HASH again.
- Even when your [browser cache](https://www.bigcommerce.com/ecommerce-answers/what-browser-cache-and-why-it-important/) is cleared or the browser is in incognito/private mode, the hash remains the same, allowing me to always track your browser whenever it visits my site, or let's say any other websites I'm partnered with to show you ADs.

<img src="https://ujjwalkumar.now.sh/images/tracker.jpeg" height="500" width="550"></img>

## Attention
**I'm not collecting any private user information. The only string collected is the SHA-1 hash which can NOT be reversed to get the actual data. <del>So stop asking me if now I know your mom's name. </del>**

## What Information is used ?
- Your operating system information.
- Browser information.
- CPU and GPU information.
- Your IP address.
- Your rough location. (Based on the IP address).
- Your internet provider name.
- Your timezone.
- Device rotation.
- Device Acceleration.
- Weather information of your area.

## How can we stop you from tracking us?
- Use A [VPN](https://en.wikipedia.org/wiki/Virtual_private_network) [your information wont be visible but probably I will detect if you are using one ;) ]
- Find ways to disable fingerprinting in your browser, which is tough.


## Is this illegal ?

NO

## How can I stop Google and Facebook from tracking us?

NO, but using a browser with fingerprinting disabled can help.

## Current Arch-
I use some javascript APIs which is listed in the `client` folder, as [index.js](https://github.com/ujjwal-kr/ip-sniff/blob/main/client/index.js) and sends to to a HEROKU backend, the source is in the `index.js` of the root directory. The server takes in your IP and does a quick IP lookup, weather lookup, and SHA indentification.

### Todos
- Try to detect VPN connections from another country. -- *DONE*
- Tell user how many time they visited the page. (cookie mode). -- *BORING*
- Tell user how many times they visited the page. (magic mode). -- *DONE*
- Add some styles.  -- *LOL, NO*
