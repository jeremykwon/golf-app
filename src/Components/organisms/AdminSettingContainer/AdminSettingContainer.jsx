/* admin페이지 주문관리, 룸관리 컨테이너박스 */
import styled from "styled-components";

import { AddTitleHeader } from 'Components/molecules';
import { SettingSelectBox } from 'Components/organisms';

const AdminSettingContainer = ({ type, itemList, refreshMenuList, refreshClientList }) => {
    return(
        <Box>
            <AddTitleHeader type={type} />
            <SettingSelectBox
                refreshMenuList={refreshMenuList}
                itemList={itemList}
                type={type}
                refreshClientList={refreshClientList}
                />
        </Box>
    );
};

export default AdminSettingContainer;

const Box = styled.div`
    border-radius: 15px;
    border: solid 1px rgba(0, 0, 0, 0.1);
    padding: 30px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    flex: 1;
    max-width: 50%;
`;