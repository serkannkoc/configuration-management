import {useAuthStore} from '../stores/authStore.js';
import {initializeApp} from "firebase/app";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

const app = initializeApp(JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG));
const AuthService = {
    async login(email, password) {
        const auth = getAuth(app);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const idToken = await user.getIdToken();
            console.log(idToken)
            useAuthStore().login(idToken);
        } catch (error) {
            throw error.message;
        }
    },
};

export default AuthService;
