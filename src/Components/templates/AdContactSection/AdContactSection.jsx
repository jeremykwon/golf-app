import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { ColorButton } from 'Components/atoms';

// images
import talkBlue from 'Asset/images/talk_blue.svg';
import modalClose from 'Asset/images/modal_close.svg';

const cx = classNames.bind(styles);

const AdContactModal = ({ modalCloseHandler }) => {

    return(
        <div className={cx('modal-body')}>
            <button
                className={cx('modal-close-btn')}
                onClick={modalCloseHandler}
                >
                    <img src={modalClose} alt='모달 닫기버튼' />
                </button>
            <div className={cx('modal-header')}>
                <img src={talkBlue} alt='말풍선' />
                <p>광고문의</p>
            </div>

            {
                [
                    {title: '이메일', text: 'qaz8461@hanmail.net'}, 
                    {title: '연락처', text: '010-0000-0000'}
                ].map((info) => {
                    return (
                        <div key={info.title} className={cx('info-wrap')}>
                            <p>{ info.title }</p>
                            <div className={cx('info-textbox')}>
                                { info.text }
                            </div>
                        </div>
                    );
                })
            }

            <ColorButton clickHandler={modalCloseHandler} title={'확인'} />
        </div>
    );
};

export default AdContactModal;
