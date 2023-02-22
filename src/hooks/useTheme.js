import { useState } from "react";
import { createTheme } from "@mui/material/styles"


export const useTheme = () => {
    
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    })
    const lightTheme = createTheme({
        palette: {
            mode: "light",
        },
    })
    const [theme, setTheme] = useState('dark')

    const changeTheme = () => {
        if (theme === 'light') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    return { theme, changeTheme, darkTheme, lightTheme }
}