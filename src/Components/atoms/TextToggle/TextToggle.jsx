/* 텍스트 + 토글버튼 */
import styled from "styled-components";

import { Switch, FormControlLabel } from '@mui/material';

const TextToggle = ({ title, changeHandler, price }) => {
    return(
        <Box>
            <p>{ title }</p>
            {
                price !== null &&
                <FormControlLabel 
                    control={
                        <Switch
                            defaultChecked={price !== 0 ? true : false}
                            onChange={changeHandler}
                            />
                    }
                    />
            }
        </Box>
    );
};

export default TextToggle;

const Box = styled.div`
    display: flex;
    color: #6b7583;
    align-items: center;

    p {
        font-size: 15px;
        color: #6b7583;
        margin-right: 12px;
    }
`;