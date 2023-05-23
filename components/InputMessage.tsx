import React, { useState, useContext } from 'react';
import uuid from 'react-uuid';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';


import { DataContext } from '../context/DataProvider';

const InputMessage = () => {

	const { textInput, setTextInput, waiting, setWaiting } = useContext<any>(DataContext);
	const [text, setText] = useState<string>('');

	const handleSendMessage = () => {

		if (!text.trim()) return;

		setTextInput({
			id: uuid(),
			create: new Date().getTime(),
			text: text.trim(),
			user: {
				name: 'User',
				avatar: 'https://i.pravatar.cc/100?u=A08',
			},
		});
		setText('');
	};
	return (
		<KeyboardAvoidingView keyboardVerticalOffset={130} enabled behavior='padding' style={styles.keyboardAvoiding}>
			<View style={styles.inputMessage}>
				<TextInput
					onFocus={() => setText("")}
					style={styles.input}
					onChangeText={(text) => setText(text)}
					value={text}
				/>
				<TouchableOpacity disabled={waiting} style={waiting ? styles.buttonDisabled : styles.button} onPress={() => handleSendMessage()}>
					<FontAwesome name="send" size={24} color="white" />
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

export default InputMessage;

const styles = StyleSheet.create({
	keyboardAvoiding: {
		height: 60, marginBottom: 25, justifyContent: "space-between", marginTop: 20
	},
	inputMessage: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		width: '75%',
		height: 50,
		padding: 10,
		fontSize: 14,
		textAlign: 'left',
		color: '#ffffff',
		borderColor: '#10ac84',
		borderWidth: 1,
		borderRadius: 5,
		backgroundColor: '#222f3e',
	},
	button: {
		flex: 0,
		justifyContent: 'center',
		alignItems: 'center',
		width: '15%',
		height: 50,
		marginLeft: 10,
		textAlign: 'center',
		borderColor: '#10ac84',
		borderWidth: 1,
		borderRadius: 5,
		backgroundColor: '#10ac84',
	},
	buttonDisabled: {
		flex: 0,
		justifyContent: 'center',
		alignItems: 'center',
		width: '15%',
		height: 50,
		marginLeft: 10,
		textAlign: 'center',
		borderColor: '#10ac84',
		borderWidth: 1,
		borderRadius: 5,
		backgroundColor: '#10ac84',
		opacity: 0.3
	}
});
