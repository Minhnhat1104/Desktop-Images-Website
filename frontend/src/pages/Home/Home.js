import classNames from 'classnames/bind';
import style from './Home.module.scss';

import { getAllImages } from '~/redux/apiRequest';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/redux/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';

const cx = classNames.bind(style);

function Home() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [allImages, setAllImages] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const axoisJWT = createAxios(user, dispatch, loginSuccess);
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
        const accessToken = user?.accessToken;
        setShowLoading(true);
        const fetchApi = async () => {
            if (user && accessToken) {
                setShowLoading(true);

                const data = await getAllImages(accessToken, dispatch, axoisJWT);
                setAllImages(data);

                setShowLoading(false);
            }
        };

        fetchApi();
    }, []);
    return (
        <div className={cx('wrapper')}>
            {allImages
                ? allImages.map((singleData, index) => {
                      const base64String = btoa(
                          new Uint8Array(singleData.image.data.data).reduce(function (data, byte) {
                              return data + String.fromCharCode(byte);
                          }, ''),
                      );

                      return (
                          <div key={index} className={cx('img-fluid')}>
                              <img className={cx('img')} src={`data:image/png;base64,${base64String}`} alt="" />
                              <div className={cx('overlay')}>
                                  <div className={cx('img-content')}>
                                      <div className={cx('name')}>
                                          <p className={cx('data-label')}>{`Name: ${singleData.name}`}</p>
                                      </div>
                                      <div className={cx('author')}>
                                          <p className={cx('data-label')}>{`Author: ${singleData.author}`}</p>
                                      </div>
                                      <div className={cx('description')}>
                                          <p className={cx('data-label')}>{`Description: ${singleData.description}`}</p>
                                      </div>
                                  </div>
                                  <Button
                                      primary
                                      className={cx('download-btn')}
                                      href={`data:image/png;base64,${base64String}`}
                                      download={`data:image/png;base64,${base64String}`}
                                  >
                                      Download
                                  </Button>
                              </div>
                          </div>
                      );
                  })
                : ''}
            {showLoading && <FontAwesomeIcon className={cx('loading-icon')} icon={faSpinner} />}
        </div>
    );
}

export default Home;
