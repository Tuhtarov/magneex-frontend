/**
 * @param {string} name
 * @param {string|null} role
 * @returns {{layout: string}}
 */
export const setLayout = (name, role = null) => ({
    layout: `${name}Layout`,
    role: role ?? name
});

/**
 * @param linkInfo
 * @returns {{navLink}}
 */
export const setNavLink = linkInfo => ({
    navLink: linkInfo
});
