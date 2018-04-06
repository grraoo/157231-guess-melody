/**
 * creating new DOM object
 * @param {string} template html markup of DOMnode
 * @return {Object} DOM node
 */

function getElementFromTemplate(template) {
  const element = document.createElement(`div`);
  element.innerHTML = template;
  return element.firstChild;
}

export default getElementFromTemplate;
