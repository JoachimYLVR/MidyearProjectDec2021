import store from "../data";
import { toast } from 'bulma-toast'

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
      locationReducer: { location, loading, error }
    } = store.getState();
    if (loading){
      this.showSpinner();
    }else{
      this.hideSpinner();
    }
    if (error.status){
      toast({
        message: "Something has gone askew. Please try again in a few seconds.",
        type: 'is-danger',
        closeOnClick: true,
        pauseOnHover: true,
        animate: { in: 'fadeIn', out: 'fadeOut' },
      })
    }
    if (Object.keys(location).length !== 0) {
      while (this.resultRef.firstChild) this.resultRef.removeChild(this.resultRef.firstChild);
      this.resultRef.innerHTML = location.places.map((el)=>{
            return `<div class="card">
              <div class="card-content">
                <div class="subtitle">
                  ${el["place name"]}
                </div>
                <div class="content">
                  Country: ${location.country}
                </div>
                <div class="content">
                  State: ${el.state}
                </div>
                <div class="content">
                  Postal code: ${location["post code"]}
                </div>
              </div>
            </div>
          `
          }).join("")
          ;
    }
  }
}

export default (holder, spinner) => new Location(holder, spinner);
