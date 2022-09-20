function border() {
    document.body.style = "border: 4px solid green;"
}

browser.runtime.onMessage.addListener((message) => {
    if(message.action === 'kittenify'){
        border();
    }
})