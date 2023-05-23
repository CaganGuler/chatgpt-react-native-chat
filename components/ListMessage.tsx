import React, { useState, useContext, useEffect, useRef } from 'react';
import { StyleSheet, FlatList, RefreshControl, Keyboard } from 'react-native';
import { API_URL } from '../constants/constants';

import Message from './Message';
import { DataContext } from '../context/DataProvider';
import { MessageType } from '../types/types';
import axios from 'axios';


const ListMessage = () => {
	const flatListRef = useRef<any>(null);

	const [messages, setMessages] = useState<MessageType[]>([]);

	const { textInput, setTextInput, waiting, setWaiting } = useContext<any>(DataContext);


	useEffect(() => {
		if (messages.length && messages[messages.length - 1].role == "user") {

			setWaiting(true);
			axios.post(`${API_URL}/api/chat`, {
				messages
			})
				.then(function (response) {
					setMessages((messages) => [...messages, response.data.data])
					setWaiting(false)
					setTimeout(() => {
						flatListRef.current.scrollToIndex({ viewPosition: 0.5, index: messages.length - 1 })
					}, 1000);
				})
				.catch(function (error) {
					console.log(error);
					setWaiting(false)
				});
		}
	}, [messages.length])

	useEffect(() => {
		if (textInput?.text) {
			let msg = {
				id: textInput.id,
				role: "user",
				content: textInput.text
			}
			setMessages((messages) => [...messages, msg])
			Keyboard.dismiss()
			setTimeout(() => {
				flatListRef.current.scrollToIndex({ viewPosition: 0.5, index: messages.length == 0 ? 0 : messages.length - 1 })
			}, 1000);
		}
	}, [textInput.text]);


	return (
		<FlatList
			ref={flatListRef}
			style={styles.listContainer}
			data={messages}
			renderItem={({ item }) => <Message message={item} />}
			keyExtractor={(item) => item.id.toString()}
			refreshControl={
				<RefreshControl
					refreshing={false}
					onRefresh={() => {
						setMessages([])
						setWaiting(false)
					}}
				/>
			}
		/>
	);
};

export default ListMessage;

const styles = StyleSheet.create({
	listContainer: {
		flex: 1,
		width: '100%',
		backgroundColor: '#222f3e',
	},
});
