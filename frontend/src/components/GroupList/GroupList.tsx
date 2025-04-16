import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from "../../store";
import {setSelectedGroup} from "../../store/slices/groupsSlice.ts";
import './styles.scss';
const GroupList: React.FC = () => {
    const dispatch = useDispatch();
    const { groups, selectedGroupId } = useSelector((state: RootState) => state.groups);

    return (
        (groups.length !== 0) &&
        <div className={'groups'}>
            <h3 className={'groups-title'}>Группы</h3>


           <ul className={'groups-list'}>
                {groups.map(group => (
                    <li
                        key={group.group_id}
                        onClick={() => dispatch(setSelectedGroup(group.group_id))}
                        style={{
                            fontWeight: group.group_id === selectedGroupId ? 'bold' : 'normal',
                            cursor: 'pointer',
                            listStyleType: 'none',
                        }} className={'groups-list-item'}
                    >
                        {group.group_caption}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GroupList;
