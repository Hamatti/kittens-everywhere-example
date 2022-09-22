# kittens-everywhere

_This project was a live-coded "how to build an extension" example that I built for a class I taught in September of 2022. It's not available in addons.mozilla.org nor Chrome Web Store._

_It's called kittens-everywhere even though it supports dogs too because the feature for dogs came later and at that point I had already fallen in love with the name._

## Functionality

Doomscrolling and too much of serious can be detrimental. Sometimes it's a good thing to lighten up one's life and what better way to do that than replace pictures on websites with cute pictures of either kittens or dogs.

When user clicks on the extension icon on the toolbar, the extension will replace all images larger than 150x150px (to avoid replacing things like icons or in-site graphics) with pictures from [http://placekitten.com/](http://placekitten.com/) or [https://placedog.net/](https://placedog.net/).

Once the images have been changed, if the user clicks the button again, we bring back the old images.

The user can define whether they like kittens or doggos more in the extension options page (see [`options_page/`](options_page/))

## Development

### How to run

This extension is built for Firefox, using Manifest v2. To load it while in development, either (I recommend #2):

1. Build a .zip file of all the files, open Firefox and head to [about:debugging](about:debugging), choose "This Firefox" and click "Load Temporary Add-on...". Then choose your .zip file. With this method, you need to create a new .zip file and click "Reload" in that page to reload the changes.

or

2. Install [web-ext](https://github.com/mozilla/web-ext) from [npm](https://www.npmjs.com/) (with `npm install -g web-ext`) and run `web-ext run` in this folder. That will package the extension, open a fresh Firefox window and load the extension in. It will also provide hot reload so the extension gets reloaded everytime you save your changes.