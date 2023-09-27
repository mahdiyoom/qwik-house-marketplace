import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyA8MQkR6BHMgzCeOj8D-X2QLTuC3eRt9s0",
    authDomain: "fir-course-b5553.firebaseapp.com",
    projectId: "fir-course-b5553",
    storageBucket: "fir-course-b5553.appspot.com",
    messagingSenderId: "1063321566493",
    appId: "1:1063321566493:web:8cb0ba24ccfcaad39775f4",
    measurementId: "G-20QMP28WET"
};

const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const storage = getStorage(app);
