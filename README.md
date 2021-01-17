# `EpicTracker`
Demo: https://epictracker.now.sh
- It is a demontstration project of how can I track you using fingerprinting and some automated lookups and stuff.
- It uses modern Javascript APIs to intentify your metadata and generates an SHA-1 hash based on it. The hash can be used to further identify the browser even after clearing the cache or using the demo in private browsing mode.
- I may create dummy marketing services in future to demonstrate the (targeted ads) tracking process close to the realworld.

## Attention
**I'm not collecting any of the information. The only string collected is the SHA-1 hash which can NOT be reversed to get the actual data. <del>So stop asking me if now I know your mom's name. </del>**

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
- Use A VPN [your information wont be visible but probably I will detect if you are using one ;) ]
- Find ways to disable fingerprinting in your browser, which is tough.


## Is this illegal ?
- No.

## How can I stop Google and Facebook from tracking us?
- *You Can't*

## Current Arch-
I use some javascript APIs which is listed in the `client` folder, as [index.js](https://github.com/ujjwal-kr/ip-sniff/blob/main/client/index.js) and sends to to a HEROKU backend, the source is in the `index.js` of the root directory. The server takes in your IP and does a quick IP lookup, weather lookup, and SHA indentification.

### Todos
- Try to detect VPN connections from another country. -- *DONE*
- Tell user how many time they visited the page. (cookie mode). -- *BORING*
- Tell user how many times they visited the page. (magic mode). -- *DONE*
- Add some styles.  -- *LOL, NO*
