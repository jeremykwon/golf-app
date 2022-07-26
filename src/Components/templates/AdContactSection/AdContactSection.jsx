import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { ColorButton } from 'Components/atoms';

import { IconText } from 'Components/atoms';

// images
import talkBlue from 'Asset/images/talk_blue.svg';
import modalClose from 'Asset/images/modal_close.svg';

const cx = classNames.bind(styles);

const AdContactModal = ({ modalCloseHandler }) => {

    return(
        <div className={cx('modal-body')} onClick={(e) => {e.stopPropagation()}}>
            <button
                className={cx('modal-close-btn')}
                onClick={modalCloseHandler}
                >
                    <img src={modalClose} alt='모달 닫기버튼' />
                </button>

            <IconText title={'광고문의'} imageSrc={talkBlue} />

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
