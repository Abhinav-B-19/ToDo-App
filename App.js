// App.js
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import AppNavigator from "./AppNavigator";
import TaskContextProvider from "./Contexts/TaskContextProvider";

const App = () => {
  return (
    <TaskContextProvider>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </TaskContextProvider>
  );
};

export default App;

// import React from 'react';
// import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// export default function App({ navigation }) {
//   const handleLogin = () => {
//     navigation.navigate('Login');
//   };

//   const handleRegister = () => {
//     navigation.navigate('Register');
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={handleRegister}>
//         <Text style={styles.buttonText}>Register</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   button: {
//     backgroundColor: '#007bff',
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
// });
