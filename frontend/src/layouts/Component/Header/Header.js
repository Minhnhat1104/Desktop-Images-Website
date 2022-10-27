import Button from '~/components/Button';
import classNames from 'classnames/bind';
import style from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { createAxios } from '~/createInstance';
import { logoutUser } from '~/redux/apiRequest';
import { loginSuccess } from '~/redux/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import Logo from '~/assets/img/logo.js';

const cx = classNames.bind(style);

function Header() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const accessToken = user?.accessToken;
    const id = user?._id;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleLogout = () => {
        logoutUser(dispatch, id, navigate, accessToken, axiosJWT);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('right-container')}>
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
                {user ? (
                    <div className={cx('left-container')}>
                        <Button outline to="/upload">
                            Upload
                        </Button>
                        <Button outline to="/">
                            Home
                        </Button>
                        <Button>{user.username}</Button>
                        <Button primary onClick={handleLogout}>
                            Log Out
                        </Button>
                    </div>
                ) : (
                    <div className={cx('left-container')}>
                        <Button outline to="/">
                            Home
                        </Button>
                        <Button primary to="/login">
                            Login
                        </Button>
                        <Button outline to="/Register">
                            Register
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
