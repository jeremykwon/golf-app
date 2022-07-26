import styled from "styled-components";

const BadgeText = ({ title }) => {
    return(
        <Badge>{ title }</Badge>
    );
};

export default BadgeText;

const Badge = styled.div`
    color: #4d6aed;
    background-color: #f0f3fe;
    font-size: 13px;
    border-radius: 15px;
    padding: 3px 10px;
    width: fit-content;
    font-weight: bold;
`;