// THEME TOGGLE

const toggleLightTheme = document.getElementById('toggleLightTheme')
const toggleDarkTheme = document.getElementById('toggleDarkTheme')

toggleLightTheme.onclick = () => setTheme('light')
toggleDarkTheme.onclick = () => setTheme('dark')

function setTheme(theme) {
    if (theme === "dark") {
        document.documentElement.setAttribute('data-theme', 'dark');
        window.localStorage.setItem('theme', 'dark');
        toggleLightTheme.classList.remove('active');
        toggleDarkTheme.classList.add('active');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        window.localStorage.setItem('theme', 'light');
        toggleDarkTheme.classList.remove('active');
        toggleLightTheme.classList.add('active');
    }
}

let theme = localStorage.getItem('theme');
theme = theme || (window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : 'light');
setTheme(theme);

function modeSwitcher() {
    let currentMode = document.documentElement.getAttribute('data-theme');
    if (currentMode === "dark") {
        setTheme('light');
    } else {
        setTheme('dark');
    }
}

// 