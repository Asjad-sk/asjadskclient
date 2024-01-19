// weather.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCitydata = createAsyncThunk("weather/getCitydata", async (obj) => {
  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/find?q=${obj.searchvalue}&appid=3261f2f5e3886b6018b6320026f185df`);
    
    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error.message, // Use the error.message property
    };
  }
});

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    citySearchLoading: false,
    citySearchData: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCitydata.pending, (state) => {
        state.citySearchLoading = true;
        state.citySearchData = null;
      })
      .addCase(getCitydata.fulfilled, (state, action) => {
        state.citySearchLoading = false;
        state.citySearchData = action.payload.data;
      })
      .addCase(getCitydata.rejected, (state, action) => {
        state.citySearchLoading = false;
        state.citySearchData = null;
      
      });
  },
});

export default weatherSlice.reducer;
