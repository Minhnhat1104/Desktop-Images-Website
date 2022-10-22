import axios from 'axios';
import {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed,
} from './authSlice';

import { getImagesStart, getImagesSuccess, getImagesFailed } from '~/redux/imageSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('/v1/auth/login', user);
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (err) {
        dispatch(loginFailed());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post('/v1/auth/register', user);
        dispatch(registerSuccess());
        navigate('/login');
    } catch (err) {
        dispatch(registerFailed());
    }
};

export const logoutUser = async (dispatch, id, navigate, accessToken, axoisJWT) => {
    dispatch(logoutStart());
    try {
        await axoisJWT.post('/v1/auth/logout', id, {
            headers: {
                token: `BEARER ${accessToken}`,
            },
        });
        dispatch(logoutSuccess());
        navigate('/login');
    } catch (err) {
        console.log(err);
        dispatch(logoutFailed());
    }
};

export const getAllImages = async (accessToken, dispatch, axoisJWT) => {
    dispatch(getImagesStart());
    try {
        const res = await axoisJWT.get('/v1/image', {
            headers: {
                token: `BEARER ${accessToken}`,
            },
        });
        dispatch(getImagesSuccess());
        return res.data;
    } catch (err) {
        console.log(err);
        dispatch(getImagesFailed());
    }
};
