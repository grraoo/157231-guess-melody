const appNode = document.querySelector(`.app`);
const screensTemplate = document.getElementById(`templates`).content;

const screensArray = [
  screensTemplate.querySelector(`.main.main--welcome`),
  screensTemplate.querySelector(`.main.main--level-artist`),
  screensTemplate.querySelector(`.main.main--level-genre`),
];
const resultsScreensArr = Array.from(screensTemplate.querySelectorAll(`.main--result`));
const allScreensArray = screensArray.concat(resultsScreensArr);

let screenIndex = 0;

function switchScreen(index) {
  const mainContent = appNode.querySelector(`.main`);
  appNode.replaceChild(allScreensArray[index], mainContent);
}

function changeScreen(evt) {
  if (evt.altKey) {
    const mod = allScreensArray.length;
    switch (evt.code) {
      case `ArrowRight`:
        evt.preventDefault();
        screenIndex = (++screenIndex) % mod;
        switchScreen(screenIndex);
        break;
      case `ArrowLeft`:
        evt.preventDefault();
        screenIndex = (--screenIndex + mod) % mod;
        switchScreen(screenIndex);
        break;
    }
  }
}

switchScreen(screenIndex);

document.addEventListener(`keydown`, changeScreen);
