import { useSelector } from 'react-redux';
import MetricsChart from './MetricsChart/MetricsChart';
import './styles.scss';
function NodeDetails() {
    const selectedNode = useSelector(state => state.groups.selectedNode);
    const metrics = useSelector(state => state.metrics.metrics);

    const groups = useSelector((state: RootState) => state.groups.groups);
    if(groups.length === 0) return <div className="node-details-empty"><p>Детальная информация о нодах отсутствует </p></div>;
    if (!selectedNode) {
        return <div className="node-details-empty"><h3>Выберите ноду</h3></div>;
    }

    // Фильтруем метрики по выбранной ноде
    const nodeMetrics = metrics.filter(m => m.node_info.id === selectedNode.node_id);

    return (
        <div className="node-details">
            <h3 className={'node-details-title'}>Детали ноды: {selectedNode.node_caption}</h3>

            {/* Блок Метрики */}
            <div className="node-details-metrics metrics-block">
                <h4>Метрики</h4>
                <MetricsChart metrics={nodeMetrics} />
            </div>

            {/* Блок Интерфейс */}
            <div className="node-details-interface interface-block">
                <h4>Интерфейс</h4>
                {selectedNode.interface && selectedNode.interface.caption ? (
                    <>
                        <p className={'node-details-interface-name'}>Название: <span>{selectedNode.interface.caption}</span>  </p>
                        <p className={'node-details-interface-status'}>Статус: {selectedNode.interface.status.description}  <span style={{ backgroundColor: selectedNode.interface.status.color, width: '10px', height: '10px' , borderRadius: '50%'}}></span> </p>
                    </>
                ) : <p>Нет данных</p>}
            </div>

            {/* Блок Администратор */}
            <div className="node-details-admin admin-block">
                <h4>Администратор</h4>
                {selectedNode.administrator ? (
                    <p>
                        {selectedNode.administrator.firstname} {selectedNode.administrator.lastname}<br/>
                        {selectedNode.administrator.email}
                    </p>
                ) : <p>Нет данных</p>}
            </div>

            {/* Блок Приложения */}
            <div className="node-details-applications applications-block">
                <h4>Приложения</h4>
                {selectedNode.applications && selectedNode.applications.length > 0 ? (
                    <ul >
                        {selectedNode.applications.map(app => (
                            <li  key={app.id}>{app.caption}</li>
                        ))}
                    </ul>
                ) : <p>Нет данных</p>}
            </div>
        </div>
    );
}

export default NodeDetails;
