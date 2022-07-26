import styled from "styled-components";

const IconText = ({ imageSrc, title, color='#3b3b46' }) => {
    return (
        <Box color={color}>
            <img src={imageSrc} alt='타이틀 아이콘' />
            <p>{title}</p>
        </Box>
    );
};

export default IconText;

const Box = styled.div`
    display: flex;
    align-items: center;
    
    img {
        width: 30px;
        height: 30px;
        }

    p {
        color: ${ ({ color }) => color };
        font-size: 20px;
        margin-left: 10px;
    }
`;