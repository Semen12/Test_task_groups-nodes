

import './styles/main.scss'
import {useDispatch} from "react-redux";
import {AppDispatch} from "./store";
import {fetchGroups} from "./store/slices/groupsSlice.ts";
import {fetchMetrics} from "./store/slices/metricsSlice.ts";
import {useEffect} from "react";
import StatusBlock from "./components/StatusBlock/StatusBlock.tsx";
import GroupList from "./components/GroupList/GroupList.tsx";
import NodeList from "./components/NodeList/NodeList.tsx";
import NodeDetails from "./components/ NodeDetails/ NodeDetails.tsx";



function App() {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGroups());
        dispatch(fetchMetrics());

        const interval = setInterval(() => {
            dispatch(fetchGroups());
            dispatch(fetchMetrics());
        }, 60000);

        return () => clearInterval(interval);
    }, [dispatch]);

  return (
    <>
      <div className="app-container">
        {/* Левый столбец */}
        <div className="column left-column">
            <StatusBlock/>
            <GroupList/>
        </div>

        {/* Центральный столбец */}
        <div className="column middle-column">
            <NodeList/>
        </div>

        {/* Правый столбец */}
        <div className="column right-column">
            <NodeDetails />
        </div>
      </div>
      );
    </>
  )
}

export default App
