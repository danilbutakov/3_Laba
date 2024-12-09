// src/components/DataTable.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	doc
} from 'firebase/firestore';

const DataTable = () => {
	const [data, setData] = useState([]);
	const [newData, setNewData] = useState('');
	const [editData, setEditData] = useState({ id: '', name: '' });
	const [isEditing, setIsEditing] = useState(false); // Флаг для отслеживания режима редактирования

	// Функция для получения данных из Firestore
	const fetchData = async () => {
		const querySnapshot = await getDocs(collection(db, 'items'));
		setData(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
	};

	// Функция для добавления нового элемента
	const handleAddData = async () => {
		if (newData.trim() !== '') {
			await addDoc(collection(db, 'items'), { name: newData });
			setNewData('');
			fetchData();
		}
	};

	// Функция для обновления элемента
	const handleUpdateData = async () => {
		if (editData.name && editData.id) {
			const docRef = doc(db, 'items', editData.id);
			await updateDoc(docRef, { name: editData.name });
			setEditData({ id: '', name: '' });
			setIsEditing(false); // Сброс флага редактирования
			fetchData();
		}
	};

	// Функция для удаления элемента
	const handleDeleteData = async (id) => {
		await deleteDoc(doc(db, 'items', id));
		fetchData();
	};

	// Функция для выбора элемента для редактирования
	const handleEditChange = (item) => {
		setEditData({ id: item.id, name: item.name });
		setIsEditing(true); // Включаем режим редактирования
	};

	useEffect(() => {
		fetchData(); // Загрузка данных при монтировании компонента
	}, []);

	return (
		<div>
			<h1>Items Table</h1>
			<div>
				<h2>{isEditing ? 'Edit Item' : 'Add New Item'}</h2>
				<input
					type='text'
					value={isEditing ? editData.name : newData}
					onChange={(e) =>
						isEditing
							? setEditData({ ...editData, name: e.target.value })
							: setNewData(e.target.value)
					}
					placeholder='Item Name'
				/>
				<button onClick={isEditing ? handleUpdateData : handleAddData}>
					{isEditing ? 'Update Item' : 'Add Item'}
				</button>
			</div>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item) => (
						<tr key={item.id}>
							<td>{item.name}</td>
							<td>
								<button onClick={() => handleEditChange(item)}>Edit</button>
								<button onClick={() => handleDeleteData(item.id)}>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default DataTable;
