import { defineStore } from 'pinia'
import { query, collection, getDocs, getDoc, where, addDoc, doc, deleteDoc, updateDoc} from 'firebase/firestore/lite';
import { db } from '../firebase/firebaseconfig';
import { auth } from '../firebase/firebaseconfig';
import { nanoid } from 'nanoid';
import router from '../router';

export const useBasedatosStore = defineStore('basedatos', {
    state: () => ({
        documents: [],
        loading : false,
    }),
    actions: {
        async getbd() {
            this.loading = true;
            try {
                const q = query(collection(db, "urls"),where("user", "==", auth.currentUser.uid));
                const querySnapshot = await getDocs(q);
                if(this.documents.length <= 0) {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    this.documents.push({id: doc.id, ...doc.data() });
                  })
                }
            } catch (error) {
                return error;
            }finally{
                this.loading = false;
            }
        },
        async addurl(url) {
            try{
                const object = {
                    name: url,
                    short: nanoid(5),//genera un id de 5 caracteres aleatorios
                    user: auth.currentUser.uid
                }
                const docRef = await addDoc(collection(db, "urls"), object);
                this.documents.push({...object, id: docRef.id});
            }catch (error){
                return error;
            }finally{

            }
        },
        async deleteurl(id) {
            try{
                const docRef = doc(db, "urls", id);
                const document = await getDoc(docRef);
                if (!document.exists() || document.data().user !== auth.currentUser.uid) {
                    throw new Error("No such document!");
                }
                await deleteDoc(docRef);
                this.documents = this.documents.filter((doc) => doc.id !== id);

            }catch (error){
                return error;
            }finally{

            }
        },
        async leerurl(id) {
            try{
                const docRef = doc(db, "urls", id);
                const document = await getDoc(docRef);
                if (!document.exists() || document.data().user !== auth.currentUser.uid) {
                    throw new Error("No such document!");
                }
                return document.data().name;

            }catch (error){
                return error;
            }finally{

            }
        },
        async update(id, name) {
            try{
                const docRef = doc(db, "urls", id);
                const document = await getDoc(docRef);
                if (!document.exists() || document.data().user !== auth.currentUser.uid) {
                    throw new Error("No such document!");
                }
                await updateDoc(docRef, {
                name: name
                });
                this.documents = this.documents.map((doc) => doc.id === id ? ({...doc, name: name}) : doc);
                router.push('/');
            }catch (error){
                return error;
            }finally{

            }
        },
    },
})
