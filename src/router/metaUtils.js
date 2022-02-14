/**
 * @param {string} name
 * @returns {{layout: string}}
 */
export const setLayout = name => ({
    layout: `${name}Layout`
});

/**
 * @param linkInfo
 * @returns {{navLink}}
 */
export const setNavLink = linkInfo => ({
    navLink: linkInfo
});