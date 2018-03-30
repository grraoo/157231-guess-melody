import welcomeScreen from "./screens/screen-main";

const appNode = document.querySelector(`.app`);
const screensTemplate = document.getElementById(`templates`).content;

const screensArray = [
  welcomeScreen,
  screensTemplate.querySelector(`.main.main--level-artist`),
  screensTemplate.querySelector(`.main.main--level-genre`),
];
const resultsScreensArr = Array.from(screensTemplate.querySelectorAll(`.main--result`));
const allScreensArray = screensArray.concat(resultsScreensArr);

let screenIndex = 0;

function switchScreen(screen) {
  const mainContent = appNode.querySelector(`.main`);
  appNode.replaceChild(screen, mainContent);
}

function changeScreen(evt) {
  if (evt.altKey) {
    const mod = allScreensArray.length;
    switch (evt.code) {
      case `ArrowRight`:
        evt.preventDefault();
        screenIndex = (++screenIndex) % mod;
        switchScreen(allScreensArray[screenIndex]);
        break;
      case `ArrowLeft`:
        evt.preventDefault();
        screenIndex = (--screenIndex + mod) % mod;
        switchScreen(allScreensArray[screenIndex]);
        break;
    }
  }
}

switchScreen(welcomeScreen);

document.addEventListener(`keydown`, changeScreen);
