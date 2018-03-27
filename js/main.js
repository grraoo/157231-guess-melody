const appNode = document.querySelector(`.app`);


const screensTemplate = Array.from(document.getElementById(`templates`).content.querySelectorAll(`.main`));

let screenIndex = 0;

function switchScreen(index) {
  const mainContent = appNode.querySelector(`.main`);
  appNode.replaceChild(screensTemplate[index], mainContent);
}

switchScreen(screenIndex);

function changeScreen(evt) {
  if (evt.altKey) {
    const mod = screensTemplate.length;
    switch (evt.code) {
      case `ArrowRight`:
        evt.preventDefault();
        screenIndex = (++screenIndex) % mod;
        switchScreen(screenIndex);
        break;
      case `ArrowLeft`:
        evt.preventDefault();
        screenIndex = (screensTemplate.length + screenIndex - 1) % mod;
        switchScreen(screenIndex);
        break;
    }
  }
}

document.addEventListener(`keydown`, changeScreen);
