import styled from "styled-components";

const ColorButton = ({
    color='blue',
    disabled,
    clickHandler,
    width='100%',
    title,
    margin=''
}) => {
    return(
        <ColorBtn
            color={color === 'blue' ? '#4D6AED' : '#252733'}
            disabled={disabled}
            onClick={clickHandler}
            width={width}
            margin={margin}
        >
            { title }
        </ColorBtn>
    );
};

export default ColorButton;

const ColorBtn = styled.button`
    background-color:  ${ ({ color }) => color };
    cursor: ${ ({ disabled }) => disabled ? 'auto' : 'pointer' };
    height: 50px;
    width: ${ ({ width }) => width };
    margin: ${ ({ margin }) => margin };
    font-size: 15px;
    color: #fff;
    border-radius: 15px;
`;