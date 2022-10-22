import { useState } from 'react';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import style from './Login.module.scss';
import { loginUser } from '~/redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            username,
            password,
        };
        loginUser(user, dispatch, navigate);
    };

    return (
        <section className={cx('container')}>
            <div className={cx('title')}>Log in</div>
            <form className={cx('form')} onSubmit={handleSubmit}>
                <label className={cx('input-label')}>username</label>
                <input
                    name="username"
                    type="text"
                    autoComplete="username"
                    placeholder="Enter your username"
                    className={cx('username-input')}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label className={cx('input-label')}>password</label>
                <input
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className={cx('password-input')}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button className={cx('submit-btn')} type="submit" primary>
                    Continue
                </Button>
            </form>
            <div className={cx('register-title')}>Don't have an account yet?</div>
            <Button text small to="/register">
                Register one for free
            </Button>
        </section>
    );
}

export default Login;
