import { createContext, useState } from "react";

export const LoggedInTeacherContext = createContext();
export const LoggedInTeacherProvider = ({ children }) => {
    const [loggedInTeacherData, setLoggedInTeacherData] = useState(null);
    const updateTeacherData = newTeacherData => {
        setLoggedInTeacherData(newTeacherData);
    }
    return(
        <LoggedInTeacherContext.Provider value={{ loggedInTeacherData, updateTeacherData }}>{children}</LoggedInTeacherContext.Provider>
    )
}