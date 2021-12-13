import "../css/style.scss";
import Form from "./components/Form";
import Location from "./components/Location";
import store from "./data";

const formRef = document.querySelector(".form");
Form(formRef);
const locRef = document.querySelector(".location");
const spinnerRef = document.querySelector(".spinner");
Location(locRef, spinnerRef);