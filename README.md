# ip-sniff
Demo: https://epictracker.now.sh
- It is a demontstration project of how can I track you using fingerprinting and some automated lookups and stuff.
- It uses modern Javascript APIs to intentify your metadata and keeps the information in a cookie, encrypting it.
- I will make a machine learning algorithm in future which will try to match the encrypted cookies to figure out the target.
- I may create dummy marketing services to demonstrate the (targeted ads) tracking process close to the realworld.

## So what's taken ?
- Your operating system information.
- Browser information.
- CPU and GPU.
- Your IP address.
- Your rough location. (Based on the IP address).
- Your internet provider name.
- Your timezone.
- Device rotation.
- Device Acceleration.

## Is this illegal ?
- No, it's not.
- The data is not enough to track you in real life (it's not public) , they are just to identify your device. And this is just for demonstration purposes so I'm not going to show you any ADs.

## Current Arch-
I use some javascript APIs which is listed in the `client` folder, as [index.js](https://github.com/ujjwal-kr/ip-sniff/blob/main/client/index.js) and sends to to a HEROKU backend, the source is in the `index.js` of the root directory. The server takes in your IP and does a quick IP lookup, also acccepts the cookie and logs in the server.

