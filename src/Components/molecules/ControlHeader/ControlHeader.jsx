import styled from "styled-components";

const ControlHeader = ({ children, width, height='35px' }) => {
    return(
        <Box width={width} height={height}>
            { children }
        </Box>
    );
};

export default ControlHeader;

const Box = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 35px;
    height: ${ ({ height }) => height };
    align-items: center;
    width: ${ ({ width }) => width ? width : '100%' } ;
    background-color: #4d6aed;
    padding-right: 60px;

    @media screen and (max-width: 1000px) {
        padding-right: 40px;
    }
`;