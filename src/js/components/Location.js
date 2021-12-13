import store from "../data";

class Location {
  constructor(holder, spinnerRef) {
    this.holder = holder;
    this.spinnerRef = spinnerRef;
    this.resultRef = this.init()
    store.subscribe(this.render.bind(this));
  }
  init() {
    this.holder.insertAdjacentHTML(
      "beforeend",
      `
      <div class="result"></div>
      `
      );
      return this.holder.querySelector(".result");
  }
  showSpinner() {
    this.spinnerRef.style.display = "block";
  }
  hideSpinner() {
    this.spinnerRef.style.display = "none";
  }
  render() {
    const {
      locationReducer: { location, loading }
    } = store.getState();
    if (loading){
      this.showSpinner();
    }else{
      this.hideSpinner();
    }
    console.log("dit is een test")
    if (Object.keys(location).length !== 0) {
      this.resultRef.insertAdjacentHTML(
          "beforeend",
          `<div class="card">
            <div class="card-content">
              <div class="subtitle">
              ${location.places[0]["place name"]}
              </div>
              <div class="content">
              Country: ${location.country}
              </div>
              <div class="content">
              State: ${location.places[0].state}
              </div>
              <div class="content">
              Postal code: ${location["post code"]}
              </div>
            </div>
          </div>
          `
          );
    }
  }
}

export default (holder, spinner) => new Location(holder, spinner);
