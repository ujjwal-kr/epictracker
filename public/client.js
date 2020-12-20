const memory = navigator.deviceMemory
let memoryPhrase = `Your device memory is ${memory}`

const memoryContainer = document.querySelector(".memory")
memoryContainer.textContent = memoryPhrase