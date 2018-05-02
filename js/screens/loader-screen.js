import AbstractView from "./AbstractView";

class Loader extends AbstractView {

  get template() {
    return `<section class="main">
      <style>
        @keyframes loader {
          0% {
            transform:  translate(-50%, -50%) rotate(0);
          }
          100% {
            transform:  translate(-50%, -50%) rotate(360deg);
          }
        }
      </style>
      <div class="loader"
          style="
            width: 100px;
            height: 100px;
            background: red;
            animation: loader 2s linear infinite;
            position: fixed;
            top: 50%;
            left: 50%
          ">
      </div>
      </section>`;
  }

}
export default new Loader().element;
