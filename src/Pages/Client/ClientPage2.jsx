import { useMemo, useState } from 'react';
import styled from "styled-components";

import { ColorButton } from 'Components/atoms';
import { ControlContainer, HoleinoneSide } from 'Components/templates';
import { FullScreen, useFullScreenHandle } from "react-full-screen";



const ClientPage = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const handle = useFullScreenHandle();


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
                    <HoleinoneSide />
                    <ControlContainer />
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
