import React, { useEffect, useState } from 'react';
import './App.css';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

const App = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});
		return () => unsubscribe();
	}, []);

	return (
		<div>{user ? <Dashboard user={user} /> : <Auth setUser={setUser} />}</div>
	);
};

export default App;
