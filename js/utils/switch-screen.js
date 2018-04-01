const appNode = document.querySelector(`.app`);

function switchScreen(screen) {
  const mainContent = appNode.querySelector(`.main`);
  appNode.replaceChild(screen, mainContent);
}

export default switchScreen;
