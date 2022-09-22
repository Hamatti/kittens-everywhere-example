/**
 * Welcome to kittens-everywhere, an example extension
 * I (Juhis, hamatti.org) built for a class of "How to build
 * a web extension".
 * 
 * I've added a bunch of comments to explain what happens and 
 * why.
 */

/**
 * The options page lets us give the user an ability
 * to save their preferences. In our case, we let them
 * decide if they want kittens or doggos because we're 
 * kind people like that.
 * 
 * See `options.html` for the markup and the MDN page below for documentation
 * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Options_pages
 */

/**
 * When the user opens the preferences page, we load the
 * current data from the storage (in this case we use storage.local)
 * and populate the form based on that data.
 */
async function restorePreferences() {
    /**
     * 
     */
    let localStorage = await browser.storage.local.get(['animalPreference']);
    let preference = localStorage.animalPreference || "kittens" // We default to kittens
    if (preference === 'kittens') {
        document.querySelector('#kittens').checked = true
        document.querySelector('#dogs').checked = false
    } else {
        document.querySelector('#dogs').checked = true
        document.querySelector('#kittens').checked = false
    }
}

/**
 * 
 * When the user submits the form, we get the data from
 * the form and save it to storage.
 */
function savePreferences(ev) {
    /**
     * It's important to remember to prevent the default
     * action, which in case of form submit would result
     * in page reload.
     */
    ev.preventDefault();

    const formElement = document.querySelector('form');
    const formData = new FormData(formElement);
    const key = 'animalPreference';
    const value = formData.get(key);
    browser.storage.local.set({
        [key]: value
    })
}

/**
 * When the page is loaded, we load the setting
 * and populate the preference to the form on the page
 */
document.addEventListener('DOMContentLoaded', restorePreferences);

/**
 * When form is submitted, we save the preference.
 */
document.querySelector("form").addEventListener("submit", savePreferences);