import { useMemo, useState } from 'react';
import styled from "styled-components";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

import { Modal } from '@mui/material';
import { ColorButton } from 'Components/atoms';
import { ControlContainer, HoleinoneSide, AdContactSection, LoginSection } from 'Components/templates';

const cx = classNames.bind(styles);

const ClientPage = () => {
    const [modalType, setModalType] = useState(null); // contact, logout
    const [isFullScreen, setIsFullScreen] = useState(false);
    const handle = useFullScreenHandle();

    const modalCloseHandler = () => {
        setModalType(null);
    };

    const modalView = (type) => {
        setModalType(type);
    };

    return(
        <>
            {
                !document.fullscreenElement && 
                <Blind>
                    <ColorButton 
                        title={'전체화면 전환'}
                        width='300px'
                        clickHandler={() => {
                            setIsFullScreen(true);
                            handle.enter();
                        }} />
                </Blind>
            }
            
			<FullScreen id="container" handle={handle}>
                <Container>
                    <div
                        className={cx('modal-container')}
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={modalType}
                        onClose={modalCloseHandler}
                        closeAfterTransition
                        BackdropProps={{
                            timeout: 400,
                        }}
                        style={{ position: 'fixed', width: '100vw', height: '100vh', backgroundColor: 'black' }}
                        >
                            <>
                            <p>111111111111</p>
                                {
                                    modalType === 'contact' && <AdContactSection modalCloseHandler={modalCloseHandler} />
                                }
                                {
                                    modalType === 'logout' && <LoginSection />
                                }
                            </>
                    </div>
                    <HoleinoneSide />
                    <ControlContainer modalView={modalView} />
                </Container>
			</FullScreen>
        </>
        
    );
};

export default ClientPage;

const Container = styled.div`
    display: flex;
    height: 100%;
    background-color: #fff;
`;

const Blind = styled.div`
    position: fixed;
    z-index: 10;
    display: flex;
    width: 100vw;
    height: 100vh;
    background-color: rgba(28, 28, 28, 0.95);
    align-items: center;
    justify-content: center;
`;
