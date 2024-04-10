import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const SignUpPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Handle sign-up logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#003f5c"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#003f5c"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#003f5c"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.loginText}>
        <Text>Already a user?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginButton}>Login in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#5d0a0a',
    },
    input: {
        width: '95%',
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 25, // Update border radius to 25 to match sign-in page
      paddingHorizontal: 20, // Update horizontal padding to 20 to match sign-in page
      marginBottom: 20, // Update marginBottom to 20 to match sign-in page
      backgroundColor: '#f3f3f3',
    },
    button: {
        width: '95%',
      height: 50,
      backgroundColor: '#5d0a0a',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
      marginTop: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    loginText: {
      flexDirection: 'row',
      marginTop: 20,
    },
    loginButton: {
      marginLeft: 5,
      color: '#5d0a0a',
      textDecorationLine: 'underline',
    },
  });
  

export default SignUpPage;
