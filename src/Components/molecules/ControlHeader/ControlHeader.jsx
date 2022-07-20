import styled from "styled-components";

const ControlHeader = ({ children }) => {
    return(
        <Box>
            { children }
        </Box>
    );
};

export default ControlHeader;

const Box = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 35px;
    height: 35px;
    align-items: center;
    width: 600px;
    background-color: #4d6aed;
    padding-right: 30px;
`;