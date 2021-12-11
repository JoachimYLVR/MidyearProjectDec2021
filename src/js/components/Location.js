import store from "../data";

class Location {
  constructor(holder) {
    this.holder = holder;
    this.loadingRef = null;
    this.resultRef = null;
    this.init()
    //store.subscribe(this.render.bind(this));
  }
  init() {
    this.holder.insertAdjacentHTML(
      "beforeend",
      `
      <div class="loading">Looking up your location</div>
      <div class="result"></div>
      `
      );
      this.loadingRef = this.holder.querySelector(".loading");
      this.resultRef = this.holder.querySelector(".result");
  }
  render() {
    const {
      locationrReducer: { location }
    } = store.getState();
    if (location !== {}) {
      this.resultRef.insertAdjacentHTML(
          "beforeend",
          `
          <h2>${location.places[0]["place name"]}</h2>
          <p>Country: ${location.country}</p>
          <p>State: ${location.places[0].state}</p>
          <p>Postal code: ${location["post code"]}</p>
          `
          );
    }
  }
}

export default (holder) => new Cocktails(holder);
