/**
 * Función que permite agregar atributos a un elemento
 *
 * @param {document.element} element | Elemento al que se le agregaran los atributos
 * @param {object} attrObj | Objeto con los atributos a agregar
 */
const addAttributes = (element, attrObj) => {
  for (let attr in attrObj) {
    if (attrObj.hasOwnProperty(attr)) element.setAttribute(attr, attrObj[attr]);
  }
};

/**
 * Función que permite crear un elemento con sus atributos y contenido (hijos)
 *
 * @param {string} element | Elemento a crear
 * @param {object} attributes | Atributos del elemento
 * @param {Array} children | Contenido del elemento
 * @return {document.element} | Elemento creado 
 */
const createCustomElement = (element, attributes, children) => {
  let customElement = document.createElement(element);
  if (children !== undefined)
    children.forEach((el) => {
      if (el.nodeType) {
        if (el.nodeType === 1 || el.nodeType === 11)
          customElement.appendChild(el);
      } else {
        customElement.innerHTML += el;
      }
    });
  addAttributes(customElement, attributes);
  return customElement;
};

/**
 * Función que permite crear un modal. Crea 2 elementos contenedores para el contenido.
 *
 * @param {string} content | Contenido del modal
 */
const printModal = (content) => {
  // crear contenedor interno
  const modalContentEl = createCustomElement(
    "div",
    {
      id: "content--modal",
      class: "content--modal",
    },
    [content]
  );
  // crear contenedor principal
  const modalContainerEl = createCustomElement(
    "section",
    {
      id: "modal--container",
      class: "modal--container",
    },
    [modalContentEl]
  );

  // Imprimir modal
  document.body.appendChild(modalContainerEl);
  // remover modal
  const removeModal = () => {
    document.body.removeChild(modalContainerEl);
  };

  modalContainerEl.addEventListener("click", (e) => {
    if (e.target === modalContainerEl || e.target.classList.contains("cancelar")) {
      removeModal();
    }
  });

  window.addEventListener("keydown", (keyData) => {
    let modal = document.querySelector(".modal--container");
    if (keyData.keyCode == 27 && modal) {
      modal.click();
    }
  });
};