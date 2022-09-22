/**
 * Welcome to kittens-everywhere, an example extension
 * I (Juhis, hamatti.org) built for a class of "How to build
 * a web extension".
 * 
 * I've added a bunch of comments to explain what happens and 
 * why.
 */

// We don't want to replace tiny images since those can be used as
// icons or in-site graphics so I picked an arbitrary size of 150x150px
// as the minimum. To tinker with it, change this number
// and see how it affects the images being swapped.
const MIN_IMAGE_DIMENSION = 150;

/**
 * Our main function `kittenify` does the work in this content script
 * It loads the user preference set in an options page (see `options.html` 
 * and `options.js`), then replaces each image with either a kitten or doggo.
 */
function kittenify() {
    /**
     * The user preferences are stored in local storage.
     * Note that this requires "permissions": ["storage"]
     * in manifest.json so if you get a "browser.storage is undefined"
     * error, check if it's missing there
     */
    let localStorage = browser.storage.local.get(['animalPreference'])
    localStorage.then(function(res) {
        // We default to kittens if the user has not set a preference
        const animal = res.animalPreference || "kittens";

        // We find all the images in the page
        const images = document.querySelectorAll('img')
        images.forEach(async function(img) {
            // check if each image is large enough that we want to replace it
            if (img.width > MIN_IMAGE_DIMENSION && img.height > MIN_IMAGE_DIMENSION) {
                // and ask for the image data from the backend
                const newImage = await browser.runtime.sendMessage({
                    action: 'fetch',
                    animal,
                    size: {
                        width: img.width, 
                        height: img.height
                    }
                })

                /**
                 * A nifty little trick:
                 * we store the old image in the `img` element's
                 * data-oldSrc data attribute so that reclicking
                 * the extension icon brings back the old images
                 */
                if (img.dataset.oldSrc) {
                    img.src = img.dataset.oldSrc
                    delete img.dataset.oldSrc
                } else {
                    img.dataset.oldSrc = img.src
                    img.src = newImage.imageUrl;
                }
            }
        })
    })
}

/**
 * To run the function on a extension icon click, we listen to
 * messages from the background script and run `kittenify` function
 * if we get a `kittenify` action.
 */
browser.runtime.onMessage.addListener(function(message) {
    if (message.action === 'kittenify') {
        kittenify()
    }
})
