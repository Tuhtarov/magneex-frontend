import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#00a7ff',
                secondary: '#b0bec5',
                accent: '#8c9eff',
                error: '#b71c1c',
            },
            dark: {
                primary: '#a558f4',
                // secondary: '#ff0000',
                // accent: '#82B1FF',
                // error: '#FF5252',
                // info: '#2196F3',
                // success: '#4CAF50',
                // warning: '#FFC107',
            }
        }
    },
});
