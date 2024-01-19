// store.js
import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../api/weatherApi";
import todoReducer from "../api/todoApi"; // Correct the import path

const store = configureStore({
    reducer: {
        weather: weatherReducer,
        todos: todoReducer, // Correct the reducer name
    }
});

export default store;
