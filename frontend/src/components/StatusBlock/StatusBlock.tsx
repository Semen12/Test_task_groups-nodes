import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from "../../store";
import './styles.scss';

const priority: Record<string, number> = {
    lightgreen: 1,
    yellow: 2,
    red: 3,
    darkred: 4,
    grey: 5,
};

const StatusBlock: React.FC = () => {
    const { groups, selectedGroupId } = useSelector((state: RootState) => state.groups);

    const nodes = selectedGroupId
        ? groups.find(g => g.group_id === selectedGroupId)?.nodes || []
        : groups.flatMap(g => g.nodes);

    let worstColor = 'lightgreen';
    let worstDescription = 'UP';

    nodes.forEach(node => {
        const nodeStatus = node.node_status;
        if (nodeStatus && nodeStatus.color) {
            // Обновляем статус, если приоритет статуса ноды выше, чем у текущего worstColor
            if ((priority[nodeStatus.color] || 0) > (priority[worstColor] || 0)) {
                worstColor = nodeStatus.color;
                worstDescription = nodeStatus.description;
            }
        }
    });


    return (

        (groups.length !== 0 || nodes.length !== 0) ? <div className="status">
            <h3 className="status-title">Статус сервиса</h3>
            <div
                className="status-description"
                style={{ backgroundColor: worstColor, color: '#fff', padding: '10px' }}
            >
                {worstDescription}
            </div>
        </div> : <p style={{textAlign: 'center'}}>Нет данных</p>


    );
};

export default StatusBlock;
