import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import styled from "styled-components";

import { Modal } from '@mui/material';

const cx = classNames.bind(styles);

const ModalWrapper = ({ children, open, onClose, title }) => {
    return (
        <Modal 
            className={cx('modal-container')}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropProps={{
                timeout: 400,
            }}>
            <Body>
                <Title>{ title }</Title>
                { children }
            </Body>
        </Modal>
    );
};

export default ModalWrapper;

const Body = styled.div`
    background-color: #fff;
    width: 450px;
    min-height: 100px;
    border-radius: 10px;
    text-align: center;
    padding:25px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Title = styled.p`
    color: #252733;
    text-align: center;
    font-size: 25px;
    font-weight: 420;
`;