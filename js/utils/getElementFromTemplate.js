function getElementFromTemplate(template) {
  let element = document.createElement(`div`);
  element.innerHTML = template;
  return element.firstChild;
}

export default getElementFromTemplate;
