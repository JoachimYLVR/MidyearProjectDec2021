import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./location";
import logger from 'redux-logger'

const rootReducer = {
  locationReducer
};

export default configureStore({ 
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});