import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setSelectedNode } from '../../store/slices/groupsSlice';
import { Node } from '../../types';
import './styles.scss';

const getMetricColor = (value: number, defaultColor: string): string => {
    if (value > 95) return 'red';
    if (value > 85) return 'yellow';
    return defaultColor;
};

const NodeList: React.FC = () => {
    const dispatch = useDispatch();
    const { groups, selectedGroupId } = useSelector((state: RootState) => state.groups);
    const { metrics } = useSelector((state: RootState) => state.metrics);

    // 1) Если совсем нет групп
    if (groups.length === 0) {
        return (
            <div className="node-list">

                <p className="node-list-no-data">Нет данных о нодах группы</p>
            </div>
        );
    }

    // 2) Если группа не выбрана
    if (!selectedGroupId) {
        return (
            <div className="node-list">
                <h3 className="node-list-title">Ноды</h3>
                <p className="node-list-no-data">Выберите группу для отображения нод</p>
            </div>
        );
    }

    // Получаем ноды выбранной группы
    const nodes: Node[] = groups.find(g => g.group_id === selectedGroupId)?.nodes || [];

    // 3) Если нод нет
    if (nodes.length === 0) {
        return (
            <div className="node-list">
                <h3 className="node-list-title">Ноды</h3>
                <p className="node-list-no-data">Нет нод в выбранной группе</p>
            </div>
        );
    }

    // Вспомогательная функция для получения последней метрики
    const getLastMetricsForNode = (nodeId: number) => {
        const nodeMetrics = metrics
            .filter(m => m.node_info.id === nodeId)
            .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
        return nodeMetrics[nodeMetrics.length - 1] || null;
    };

    // 4) Отображаем список нод с метриками
    return (
        <div className="node-list">
            <h3 className="node-list-title">Ноды</h3>
            <ul className="node-list-list" style={{ listStyleType: 'none', padding: 0 }}>
                {nodes.map(node => {
                    const lastMetrics = getLastMetricsForNode(node.node_id);
                    const cpu = lastMetrics?.cpu_utilization ?? null;
                    const memory = lastMetrics?.memory_utilization ?? null;
                    const disk = lastMetrics?.disk_utilization ?? null;
                    const defaultColor = node.node_status?.color || 'black';

                    return (
                        <li
                            key={node.node_id}
                            onClick={() => dispatch(setSelectedNode(node))}
                            className="node-list-item"
                            style={{
                                cursor: 'pointer',
                                padding: '10px',
                                borderBottom: '1px solid #ddd'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div
                                    style={{
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        backgroundColor: defaultColor,
                                        marginRight: '8px'
                                    }}
                                />
                                <strong>{node.node_caption}</strong>
                                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '8px' }}>
                                    <div
                                        style={{
                                            width: '10px',
                                            height: '10px',
                                            borderRadius: '50%',
                                            backgroundColor: defaultColor,
                                            marginRight: '4px'
                                        }}
                                    />
                                    <span style={{ fontSize: '12px', color: defaultColor }}>
                    {node.node_status?.description}
                  </span>
                                </div>
                            </div>
                            {lastMetrics ? (
                                <div className="node-metrics" style={{ fontSize: '14px', marginTop: '5px' }}>
                                    CPU:&nbsp;
                                    <span style={{ color: getMetricColor(cpu!, defaultColor) }}>{cpu}%</span>
                                    &nbsp; | Memory:&nbsp;
                                    <span style={{ color: getMetricColor(memory!, defaultColor) }}>{memory}%</span>
                                    &nbsp; | Disk:&nbsp;
                                    <span style={{ color: getMetricColor(disk!, defaultColor) }}>{disk}%</span>
                                </div>
                            ) : (
                                <div style={{ fontSize: '14px', marginTop: '5px', color: 'gray' }}>
                                    Нет данных метрик
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default NodeList;
