import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingIcon from '~/components/LoadingIcon';
import classNames from 'classnames/bind';
import style from './Update.module.scss';
import { loginSuccess } from '~/redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Button from '~/components/Button';
import { createAxios } from '~/createInstance';

const cx = classNames.bind(style);

function Update() {
    const params = useParams();
    const [showLoading, setShowLoading] = useState(false);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    useEffect(() => {
        const getImage = async () => {
            setShowLoading(true);
            const res = await axios.get(`/v1/image/${params._id}`);
            setImage(res.data);
            setShowLoading(false);
        };

        getImage();
    }, []);

    const dispatch = useDispatch();
    const axoisJWT = createAxios(user, dispatch, loginSuccess);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            name,
            description,
            author: user?.username,
        };
        console.log(name);
        console.log(description);
        console.log(user?.username);

        try {
            const res = await axoisJWT.patch(`/v1/image/update/${params._id}`, body);
            alert(res.data);
        } catch (err) {
            alert(err);
        }
    };

    let base64String = '';

    if (image) {
        base64String = btoa(
            new Uint8Array(image?.image.data.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
            }, ''),
        );
    }

    return (
        <>
            {image ? (
                <div className={cx('wrapper')}>
                    <div className={cx('left')}>
                        <img className={cx('img')} src={`data:image/png;base64,${base64String}`} alt="" />
                    </div>
                    <div className={cx('right')}>
                        <section className={cx('container')}>
                            <div className={cx('title')}>Upload</div>
                            <form className={cx('form')} onSubmit={handleSubmit}>
                                <label className={cx('input-label')}>Picture's name</label>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Enter your picture's name"
                                    className={cx('text-input')}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label className={cx('input-label')}>Description</label>
                                <textarea
                                    className={cx('description-input')}
                                    id="description"
                                    name="description"
                                    rows="4"
                                    placeholder="Enter your description"
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                ></textarea>
                                <Button className={cx('submit-btn')} type="submit" primary>
                                    Upload
                                </Button>
                            </form>
                        </section>
                    </div>
                </div>
            ) : (
                ''
            )}
            ;{showLoading && <LoadingIcon />}
        </>
    );
}

export default Update;
