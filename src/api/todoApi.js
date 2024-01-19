// todoSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await axios.get('https://asjadsk-react-web-server.onrender.com/todo/alltodo');
    return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (newTodo) => {
    const response = await axios.post('https://asjadsk-react-web-server.onrender.com/todo/createtodo', newTodo);
    return response.data;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (updatedTodo) => {
    const { _id, title } = updatedTodo;  // <-- Fix the typo here
    const response = await axios.put(`https://asjadsk-react-web-server.onrender.com/todo/update/${updatedTodo._id}`, updatedTodo);
    return response.data;
});


export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (todoId) => {
    const response = await axios.delete(`https://asjadsk-react-web-server.onrender.com/todo/delete/${todoId}`);
    return response.data;
});



const todoSlice = createSlice({
    name: 'todos',
    initialState: { data: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                const updatedIndex = state.data.findIndex((todo) => todo._id === action.payload._id);
                if (updatedIndex !== -1) {
                    state.data[updatedIndex] = action.payload;
                }
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                console.log('Deleted Todo:', action.payload.deletedTodo);
                state.data = state.data.filter((todo) => todo._id !== action.payload.deletedTodo._id);
            })
          
            
    },
});

export default todoSlice.reducer;
