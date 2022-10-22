import { createSlice } from '@reduxjs/toolkit';

export const imageSlice = createSlice({
    name: 'image',
    initialState: {
        images: {
            isFetching: false,
            error: false,
        },
        msg: '',
        upload: {
            isFetching: false,
            success: false,
            error: false,
        },
    },
    reducers: {
        getImagesStart: (state) => {
            state.images.isFetching = true;
        },
        getImagesSuccess: (state) => {
            state.images.isFetching = false;
            state.images.error = false;
        },
        getImagesFailed: (state) => {
            state.images.isFetching = false;
            state.images.error = true;
        },
    },
});

export const { getImagesStart, getImagesSuccess, getImagesFailed } = imageSlice.actions;

export default imageSlice.reducer;
