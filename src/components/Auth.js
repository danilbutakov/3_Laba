// src/components/Auth.js
import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from 'firebase/auth';

const Auth = ({ setUser }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLogin, setIsLogin] = useState(true); // true - login, false - register

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (isLogin) {
				const userCredential = await signInWithEmailAndPassword(
					auth,
					email,
					password
				);
				setUser(userCredential.user);
			} else {
				const userCredential = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);
				setUser(userCredential.user);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder='Email'
				/>
				<input
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Password'
				/>
				<button type='submit'>{isLogin ? 'Login' : 'Register'}</button>
			</form>
			<p onClick={() => setIsLogin(!isLogin)}>
				{isLogin ? 'Need to create an account?' : 'Already have an account?'}
			</p>
		</div>
	);
};

export default Auth;
