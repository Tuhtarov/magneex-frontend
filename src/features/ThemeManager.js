const THEME_KEY = 'dark'

export function themeIsDark() {
    return localStorage.getItem(THEME_KEY) === 'true'
}

export function switchTheme(isDark) {
    let isDarkFormatted = (isDark === true);
    localStorage.setItem(THEME_KEY, isDarkFormatted.toString())

    this.$vuetify.theme.dark = isDarkFormatted;
}

export function initTheme() {
    this.$vuetify.theme.dark = themeIsDark();
}