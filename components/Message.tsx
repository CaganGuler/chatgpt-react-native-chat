import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import * as Clipboard from 'expo-clipboard';

import { MessageType } from '../types/types';

type MessageProps = {
	message: MessageType;
};

const Message = ({ message }: MessageProps) => {

	const getUserName = (role: string) => {
		return role === "user" ? "User" : "AI"
	}
	const getImageUrl = (role: string) => {
		return message.role == "user" ? "https://i.pravatar.cc/100?img=2" : "https://styles.redditmedia.com/t5_7hqomg/styles/communityIcon_lnxlhix84tja1.png"
	}

	const copyToClipboard = async () => {
		await Clipboard.setStringAsync(message.content);
		ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
	};
	return (
		<View style={message.role === 'user' ? styles.messageyou : styles.messagechatgpt}>
			<View style={styles.profile}>
				<Image style={styles.Image} source={{ uri: getImageUrl(message.role) }} />
				<Text style={styles.author}>{getUserName(message.role)}</Text>
			</View>
			<TouchableOpacity onPress={() => copyToClipboard()}>
				<Text style={styles.text}>{message.content}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Message;

const styles = StyleSheet.create({
	messagechatgpt: {
		backgroundColor: '#122f3e',
		padding: 10,
		margin: 10,
		borderRadius: 10,
		alignSelf: 'flex-start',

	},
	messageyou: {
		backgroundColor: '#285B7A',
		padding: 10,
		margin: 10,
		borderRadius: 10,
		alignSelf: 'flex-end',
	},
	text: {
		color: '#fff',
		fontSize: 16,
		alignSelf: 'flex-start',
	},
	profile: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 5,
	},
	author: {
		color: '#fff',
		fontSize: 12,
		marginLeft: 8,
	},
	Image: {
		width: 25,
		height: 25,
		borderRadius: 8,
	},
});
