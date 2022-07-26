import { useState, useMemo } from 'react';
import styled from "styled-components";

import { IconTextButton } from 'Components/atoms';
import { ControlHeader } from 'Components/molecules';
import { AdminSettingContainer, HoleinoneSettingContainer } from 'Components/organisms';

import { deleteOrderMenu, deleteClient } from 'Lib/api';

const AdminSettingSide = ({ refreshMenuList, refreshClientList, pageInfo }) => {
    const [selectedRoomIndex, setSelectedRoomIndex] = useState(null);
    const [isAddOrder, setIsAddOrder] = useState(false);
    const [isAddRoom, setIsAddRoom] = useState(false);

    const addOrderHandler = () => {
        setIsAddOrder(!isAddOrder);
    };

    const addRoomHandler = () => {
        setIsAddRoom(!isAddRoom);
    };

    const roomClickHandler = (index) => {
        setSelectedRoomIndex(index);
    };

    const ininRoomIndex = () => {
        setSelectedRoomIndex(null);
    };

    const deleteOrderMenuHandler = async (data) => {
        const res = await deleteOrderMenu({ menuId: data.menu_id });
        if (res === 'Delete is Done') {
            alert('주문 삭제 완료');
            refreshMenuList();
        }
    };

    const deleteClientHandler = async (data) => {
        const res = await deleteClient({ clientId: data.user_id });
        if (res === 'Delete is Done') {
            alert('방 삭제 완료');
            refreshClientList();
        }
    };

    return(
        <Box>
            <ControlHeader height={'70px'}>
                <IconTextButton title={'알림음 관리'} />
            </ControlHeader>

            <SettingWrapper>
                <HoleinoneSettingContainer price={pageInfo.holeInOne} />

                <SettingBoxs>
                    <AdminSettingContainer
                        type={'주문관리'}
                        itemList={pageInfo.menuList}
                        refreshMenuList={refreshMenuList}
                        />
                    <AdminSettingContainer
                        type={'룸관리'}
                        itemList={pageInfo.clientList}
                        refreshClientList={refreshClientList}
                        />
                </SettingBoxs>
            </SettingWrapper>
        </Box>
    );
};

export default AdminSettingSide;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 65%;
`;

const SettingWrapper = styled.div`
    background-color: #f4f7fc;
    padding-top: 42px;
    padding: 42px 60px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    height: calc(100% - 70px);
`;

const SettingBoxs = styled.div`
    display: flex;
    gap: 30px;
    height: calc(100% - 114px);
`;