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
                <a href="#" class="dropdown-item"> Austria </a>
                <a href="#" class="dropdown-item"> Australia </a>
                <a href="#" class="dropdown-item"> Belgium </a>
                <a href="#" class="dropdown-item"> Germany </a>
                <a href="#" class="dropdown-item"> Holland </a>
                <a href="#" class="dropdown-item"> Luxembourg </a>
                <a href="#" class="dropdown-item"> Portugal </a>
                <a href="#" class="dropdown-item"> United States </a>
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
    });
    this.submitRef.addEventListener("click", (e)=>{
      e.preventDefault();
      store.dispatch(setSearchValue({country:this.selectRef.innerHTML,postalCode:this.inputRef.value}));
      store.dispatch(getLocation());
    })
  }
}

export default (holder) => new Form(holder);