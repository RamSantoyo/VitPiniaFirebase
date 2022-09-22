import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, 
        signOut, onAuthStateChanged} from 'firebase/auth';
import { auth } from '../firebase/firebaseconfig';
import router from '../router/index';
import { useBasedatosStore } from './basedatos';


export const userStore = defineStore('usuario', {
    state: () => ({
        userData: null,
        loadingbtn : false,
        session: false,
    }),
    actions: {
        async registerUser(email, password) { // Registro de usuario
            this.loadingbtn = true;
            try {
                const { user } = await createUserWithEmailAndPassword(auth, email, password);
                console.log(user);
                this.userData = { email: user.email, uid: user.uid };                
                router.push('/');
            } catch (error) {
                console.log(error);
            }finally{
                this.loadingbtn = false;
            }
        },
        async loginUser(email, password) { // Login de usuario
            this.loadingbtn = true;
            try {
                const { user } = await signInWithEmailAndPassword(auth, email, password);
                console.log(user);
                this.userData = { email: user.email, uid: user.uid };
                router.push('/');
            } catch (error) {
                console.log(error);
            }finally{
                this.loadingbtn = false;
            }
        },
        async signOut() { // Cerrar sesión
            const bd = useBasedatosStore();
            bd.$reset();
            try {
                await signOut(auth);
                this.userData = null;
                router.push('/login');                
            } catch (error) {
                console.log(error);
            }
        },
        detectUser() { // Detectar si hay un usuario logueado
            return new Promise((existe, noexiste) => {
                const unsuscribe = onAuthStateChanged(auth, (user) => {// user
                    if (user) {
                        this.userData = { email: user.email, uid: user.uid };
                    } else {
                        this.userData = null;
                    }
                    existe(user);// Si existe un usuario logueado
                }, (error) => noexiste(error));// Si no existe un usuario logueado
                unsuscribe();//
            });
        }


    }
})
