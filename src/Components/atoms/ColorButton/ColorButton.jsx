import styled from "styled-components";

const ColorButton = ({
    color='blue',
    disabled,
    clickHandler,
    width='100%',
    height='50px',
    title,
    margin=''
}) => {
    return(
        <ColorBtn
            color={color === 'blue' ? '#4D6AED' : '#252733'}
            disabled={disabled}
            disable={disabled}
            onClick={clickHandler}
            width={width}
            height={height}
            margin={margin}
        >
            { title }
        </ColorBtn>
    );
};

export default ColorButton;

const ColorBtn = styled.button`
    background-color:  ${ ({ color, disable }) => disable ? '#c1c1c1' : color };
    cursor: ${ ({ disabled }) => disabled ? 'auto' : 'pointer' };
    height: ${ ({ height }) => height };
    width: ${ ({ width }) => width };
    margin: ${ ({ margin }) => margin };
    font-size: 15px;
    color: #fff;
    border-radius: 10px;
    padding: 0 10px;
`;