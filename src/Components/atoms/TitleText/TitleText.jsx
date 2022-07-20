import styled from "styled-components";

const TitleText = ({ 
    title,
    color='#3b3b46',
    size=17
}) => {
    return(
        <Title
            color={color}
            size={size}
            >
            { title }
        </Title>
    );
};

export default TitleText;

const Title = styled.p`
    font-size: ${({ size }) => `${size}px`};
    font-weight: bold;
    color: ${({ color }) => color};
    text-align: center;
`;
