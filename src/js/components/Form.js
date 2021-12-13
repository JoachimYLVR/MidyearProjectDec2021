import store from "../data";
import { setSearchValue, getLocation } from "../data/location";

class Form {
  constructor(holder) {
    this.holder = holder;
    this.dropdownRef = "";
    this.choiceRef = "";
    this.selectRef = "";
    this.submitRef = "";
    this.inputRef = "";
    this.init();
    this.events();
  }
  init() {
    this.holder.insertAdjacentHTML(
      "beforeend",
      `
      <p>
            Please enter your postal code and select a country from the dropdown
            list.
          </p>
          <input
            class="input"
            type="text"
            placeholder="Enter your postal code"
          />
          <div class="dropdown">
            <div class="dropdown-trigger">
              <button
                class="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu3"
              >
                <span class="selection">Select country</span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu3" role="menu">
              <div class="dropdown-content">
                <a href="#" class="dropdown-item">Austria</a>
                <a href="#" class="dropdown-item">Australia</a>
                <a href="#" class="dropdown-item">Belgium</a>
                <a href="#" class="dropdown-item">Germany</a>
                <a href="#" class="dropdown-item">The Netherlands</a>
                <a href="#" class="dropdown-item">Luxembourg</a>
                <a href="#" class="dropdown-item">Portugal</a>
                <a href="#" class="dropdown-item">United States</a>
              </div>
            </div>
          </div>
          <button id="submit" class="button">Submit</button>
      `
    );
    this.dropdownRef = this.holder.querySelector(".dropdown");
    this.choiceRef = this.holder.querySelector(".dropdown-content");
    this.selectRef = this.holder.querySelector(".selection");
    this.submitRef = this.holder.querySelector("#submit");
    this.inputRef = this.holder.querySelector(".input");
  }
  getCode(){
    let code = "";
    switch (this.selectRef.innerHTML) {
      case "Austria" : code = "AT";
      break;
      case "Australia": code = "AU";
      break;
      case "Belgium": code = "BE";
      break;
      case "Germany": code = "DE";
      break;
      case "The Netherlands": code = "NL";
      break;
      case "Luxembourg": code = "LU";
      break;
      case "Portugal" : code = "PT";
      break;
      case "United States" : code = "US";
      break;
      default : code = "";
    }
    console.log(this.selectRef.innerHTML)
    console.log(code);
    return code;
  }
  events() {
    this.dropdownRef.addEventListener("click", (e)=>{
      e.preventDefault();
      if(this.dropdownRef.classList.contains("is-active")){
          this.dropdownRef.classList.remove("is-active")
      }else{
          this.dropdownRef.classList.add("is-active")
      }
    });
    this.choiceRef.addEventListener("click", (e)=>{
      e.preventDefault();
      this.selectRef.innerHTML = e.target.innerHTML;
      store.dispatch(setSearchValue({country:this.getCode(),postalCode:this.inputRef.value}));
    });
    this.inputRef.addEventListener("input", (e)=>{
      e.preventDefault();
      store.dispatch(setSearchValue({country:this.getCode(),postalCode:this.inputRef.value}));
    })
    this.submitRef.addEventListener("click", (e)=>{
      e.preventDefault();
      //console.log(store.getState().locationReducer.searchObj)
      store.dispatch(getLocation(store.getState().locationReducer.searchObj));
    })
  }
}

export default (holder) => new Form(holder);