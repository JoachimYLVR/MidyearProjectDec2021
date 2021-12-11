import store from "../data";

class Form {
  constructor(holder) {
    this.holder = holder;
    this.init();
    this.render();
    this.events();
    store.subscribe(this.render.bind(this));
  }
  events() {
    this.btn.onclick = () => {
      store.dispatch(getRandomJoke());
    };
  }
  init() {
    this.holder.insertAdjacentHTML(
      "beforeend",
      `
    <p>Please select a country from the dropdown list and enter your postal code.</p>
    <input class="input" type="text" placeholder="Text input">
    <div class="dropdown is-active">
        <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                <span>Dropdown button</span>
                <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
            </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
                <a href="#" class="dropdown-item">
                    Dropdown item
                </a>
                <a href="#" class="dropdown-item">
                    Other dropdown item
                </a>
                <a href="#" class="dropdown-item">
                    Active dropdown item
                </a>
                <a href="#" class="dropdown-item">
                    Other dropdown item
                </a>
            </div>
        </div>
    </div>
    <button>Submit</button>
    `
    );
    this.h1_1 = this.holder.querySelector("h1:nth-of-type(1)");
    this.h1_2 = this.holder.querySelector("h1:nth-of-type(2)");
    this.btn = this.holder.querySelector("button");
  }
  show() {
    this.h1_1.style.display = "block";
    this.h1_2.style.display = "block";
    this.btn.style.display = "block";
  }
  hide() {
    this.h1_1.style.display = "none";
    this.h1_2.style.display = "none";
    this.btn.style.display = "none";
  }
  render() {
    const {
      joke: { setup, delivery },
      loading
    } = store.getState().joke;
    if (loading || !setup) {
      this.hide();
    } else {
      this.show();
    }
    if (setup) {
      this.h1_1.innerText = setup;
      this.h1_2.innerText = delivery;
    }
  }
}

export default (holder) => new Form(holder);