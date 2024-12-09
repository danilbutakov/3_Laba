// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAyXpGzASPAwCdp62LrT2QDwQBJRyxA4u0',
	authDomain: 'laba-6dbc3.firebaseapp.com',
	projectId: 'laba-6dbc3',
	storageBucket: 'laba-6dbc3.firebasestorage.app',
	messagingSenderId: '769160586932',
	appId: '1:769160586932:web:71ba65dc6ca6e6c6bfd9e1',
	measurementId: 'G-0ES781CQPS'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
