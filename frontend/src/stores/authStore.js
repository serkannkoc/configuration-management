import {defineStore} from 'pinia';
import {VueCookieNext} from 'vue-cookie-next';

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            isAuthenticated: VueCookieNext.getCookie('isAuthenticated') === 'true',
            accessToken: VueCookieNext.getCookie('accessToken') || null,
        }
    },
    actions: {
        login(accessToken) {
            this.accessToken = accessToken;
            this.isAuthenticated = true;
            VueCookieNext.setCookie('accessToken', accessToken);
            VueCookieNext.setCookie('isAuthenticated', 'true');


        },
        logout() {
            this.accessToken = null;
            this.isAuthenticated = false;
            VueCookieNext.removeCookie('isAuthenticated');
            VueCookieNext.removeCookie('accessToken');

        },
    },
});

