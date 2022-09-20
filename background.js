browser.browserAction.onClicked.addListener(async () => {
    const tabs = await browser.tabs.query({
        active: true,
        currentWindow: true
    });

    browser.tabs.sendMessage(tabs[0].id, { action: "kittenify" })
})
