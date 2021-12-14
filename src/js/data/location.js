import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    searchObj: {
        country: "",
        postalCode: ""
    },
    loading: false,
    error: {
      status: false,
      message: ""
    },
    location: {}
  };

export const getLocation = createAsyncThunk(
    "location/getLocation",
    async (searchObj) =>
      (await axios(`https://api.zippopotam.us/${searchObj.country}/${searchObj.postalCode}`)).data
  );

const mySlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setSearchValue(state, {type, payload}) {
        state.searchObj = payload;
    },
  },
  extraReducers: {
    [getLocation.pending]: (state) => {
        state.loading = true;
        state.error.status = false;
    },
    [getLocation.rejected]: (state, {payload}) => {
        state.loading = false;
        state.error.status = true;
        state.error.message = payload;
    },
    [getLocation.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.error.status = false;
        state.error.message = "";
        state.location = payload;
    }
  }
});


export const { setSearchValue } = mySlice.actions;
export default mySlice.reducer;