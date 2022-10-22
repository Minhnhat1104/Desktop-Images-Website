import { useState } from 'react';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import style from './Upload.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '~/createInstance';
import { loginSuccess } from '~/redux/authSlice';

const cx = classNames.bind(style);

function Upload() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [uploaded, setUploaded] = useState('');

    const dispatch = useDispatch();
    const axoisJWT = createAxios(user, dispatch, loginSuccess);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', imageFile[0]);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('username', user?.username);

        try {
            const res = await axoisJWT.post('/v1/image/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploaded(res.data);
        } catch (err) {
            alert(err);
            console.log(err);
        }
    };

    return (
        <div className={cx('wrapper')}>
            {user ? (
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
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <input
                            className={cx('text-input')}
                            name="testImage"
                            type="file"
                            onChange={(e) => {
                                setImageFile(e.target.files);
                            }}
                        />
                        <Button className={cx('submit-btn')} type="submit" primary>
                            Upload
                        </Button>
                    </form>
                </section>
            ) : null}
            <div className="home-msg">{uploaded}</div>
        </div>
    );
}

export default Upload;
