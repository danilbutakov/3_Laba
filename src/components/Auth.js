import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from 'firebase/auth';

const Auth = ({ setUser }) => {
	// Определяем состояния для email, password и isLogin
	const [email, setEmail] = useState(''); // Состояние для хранения email
	const [password, setPassword] = useState(''); // Состояние для хранения пароля
	const [isLogin, setIsLogin] = useState(true); // Состояние, указывающее, находится ли форма в режиме входа (true) или регистрации (false)

	// Обработчик отправки формы
	const handleSubmit = async (e) => {
		e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы
		try {
			// Проверяем, в каком режиме мы находимся (вход или регистрация)
			if (isLogin) {
				// Если режим входа, используем функцию signInWithEmailAndPassword
				const userCredential = await signInWithEmailAndPassword(
					auth, // Передаем экземпляр аутентификации
					email, // Email пользователя
					password // Пароль пользователя
				);
				// Устанавливаем пользователя в родительском компоненте
				setUser(userCredential.user); // userCredential.user содержит информацию о пользователе
			} else {
				// Если режим регистрации, используем функцию createUserWithEmailAndPassword
				const userCredential = await createUserWithEmailAndPassword(
					auth, // Передаем экземпляр аутентификации
					email, // Email пользователя
					password // Пароль пользователя
				);
				// Устанавливаем пользователя в родительском компоненте
				setUser(userCredential.user); // userCredential.user содержит информацию о пользователе
			}
		} catch (error) {
			// Обрабатываем ошибки, возникшие во время аутентификации
			console.error(error); // Выводим ошибку в консоль для отладки
		}
	};

	// Возвращаем разметку формы для входа и регистрации
	return (
		<div>
			<form onSubmit={handleSubmit}>
				{' '}
				{/* Вызываем handleSubmit при отправке формы */}
				<input
					type='email' // Поле ввода для email
					value={email} // Значение поля соответствует состоянию email
					onChange={(e) => setEmail(e.target.value)} // Обновляем состояние email при изменении
					placeholder='Email' // Плейсхолдер, показывающий, что вводить в поле
				/>
				<input
					type='password' // Поле ввода для пароля
					value={password} // Значение поля соответствует состоянию password
					onChange={(e) => setPassword(e.target.value)} // Обновляем состояние password при изменении
					placeholder='Password'
				/>
				<button type='submit'>{isLogin ? 'Login' : 'Register'}</button>{' '}
			</form>
			<p onClick={() => setIsLogin(!isLogin)}>
				{' '}
				{/* При клике переключаем режим входа/регистрации */}
				{isLogin ? 'Need to create an account?' : 'Already have an account?'}
			</p>
		</div>
	);
};

// Экспортируем компонент Auth, чтобы его можно было использовать в других частях приложения
export default Auth;
