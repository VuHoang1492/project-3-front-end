

const themes = ['light', 'dark']

export const setTheme = (theme) => {
    localStorage.setItem('theme', theme)
}

export const getTheme = () => {
    const theme = localStorage.getItem('theme');
    if (themes.includes(theme))
        return theme
    else
        return 'light'
}