import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import style from './LoadingIcon.module.scss';

const cx = classNames.bind(style);

function LoadingIcon() {
    return <FontAwesomeIcon className={cx('loading-icon')} icon={faSpinner} />;
}

export default LoadingIcon;
