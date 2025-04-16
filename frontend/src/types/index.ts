export interface Status {
    color: string;
    description: string;
}

export interface Interface {
    id: number | null;
    caption: string | null;
    status: Status;
}

export interface Application {
    id: number;
    caption: string;
}

export interface Administrator {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
}

export interface Node {
    node_id: number;
    node_caption: string;
    node_status: Status;
    interface: Interface;
    applications: Application[];
    administrator: Administrator;
    // Дополнительно: метрики, если будете их кэшировать прямо в нодах
}

export interface Group {
    group_id: number;
    group_caption: string;
    nodes: Node[];
}

export interface Metric {
    metric_id: number;
    datetime: string;
    cpu_utilization: number;
    memory_utilization: number;
    disk_utilization: number;
    node_info: {
        id: number;
        caption: string;
        status: Status;
    };
}
