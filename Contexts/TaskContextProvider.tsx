import React, {Children, useState} from "react";
import TaskContext from "./TaskContext";

const TaskContextProvider =({children}) => {
    const [taskItems, setTaskItems] = useState([]);
    return(
        <TaskContext.Provider value = {{taskItems, setTaskItems}}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContextProvider;