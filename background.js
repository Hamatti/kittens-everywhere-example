/**
 * Welcome to kittens-everywhere, an example extension
 * I (Juhis, hamatti.org) built for a class of "How to build
 * a web extension".
 *
 * I've added a bunch of comments to explain what happens and
 * why.
 */

/* We have a few global constants for the API urls */
const KITTEN_URL = "https://placekitten.com";
const DOGGO_URL = "https://placedog.net";

/**
 * To pass along messages and data between content scripts
 * and background scripts, we use messages.
 *
 * Here we listen to messages sent to the background script
 * and if we get a `fetch` action, we download the correct image.
 */
browser.runtime.onMessage.addListener(function (message) {
  if (message.action === "fetch") {
    const { animal, size } = message;
    const { width, height } = size;

    /**
     * To construct the URL, we start with the base URL
     * based on the animal parameter – that is the user
     * preference set via options page.
     */
    let fetchURL = animal === "kittens" ? KITTEN_URL : DOGGO_URL;

    /**
     * To get the correct sized image, we
     * append a `/{width}/{height}` to the URL
     */
    fetchURL = `${fetchURL}/${width}/${height}`;

    /**
     * A added bonus from the doggo API is that by
     * appending `?r` to the URL, we can get a
     * different random photo for each size.
     *
     * The placekitten API does not provide this.
     */
    if (animal === "dogs") {
      fetchURL = `${fetchURL}?r`;
    }

    return fetch(`${fetchURL}`)
      .then((resp) => resp.blob())
      .then((blob) => {
        const imageObjectURL = URL.createObjectURL(blob);
        return { imageUrl: imageObjectURL };
      });
  }
});

/**
 * To let our content script to know the user
 * has activated the extension by clicking on the icon,
 * we send a message to the current active tab.
 */
browser.action.onClicked.addListener(() => {
  browser.tabs
    .query({
      active: true,
      currentWindow: true,
    })
    .then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {
        action: "kittenify",
      });
    });
});
