

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

export const setAccessToken = (token) => {
    localStorage.setItem('access_token', token)
}


export const getAccessToken = () => {
    return localStorage.getItem('access_token')
}

export const removeAccessToken = () => {
    localStorage.removeItem('access_token')
}

