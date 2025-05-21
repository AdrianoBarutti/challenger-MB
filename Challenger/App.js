import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import QrCodeScreen from './screens/QrCode'; // Tela para QR Code
import CadastroScreen from './screens/CadastroScreen'; // Tela de Cadastro
import LoginSucessoScreen from './screens/LoginSucessoScreen'; // Tela de Login Sucesso

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const handleCadastroPress = () => {
    navigation.navigate('Cadastro'); // Navega para a tela de Cadastro
  };

  const handleQrCodePress = () => {
    navigation.navigate('QrCode'); // Navega para a tela de QR Code
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require('./assets/mottu-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleCadastroPress}>
          <Image
            source={require('./assets/helmet.png')}
            style={styles.loginIcon}
            resizeMode="contain"
          />
          <Text style={styles.loginText}>Login/Cadastro</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        <Text style={styles.contentText}>Conteúdo da página</Text>

        {/* Botão para ir para QR Code */}
        <TouchableOpacity style={styles.button} onPress={handleQrCodePress}>
          <Text style={styles.buttonText}>Ir para QR Code</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="light" />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Tela inicial Home */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            headerShown: true,
            title: 'Página Inicial',
          }}
        />
        {/* Tela de QR Code */}
        <Stack.Screen 
          name="QrCode" 
          component={QrCodeScreen} 
          options={{
            headerShown: true,
            title: 'QR Code',
          }}
        />
        {/* Tela de Cadastro */}
        <Stack.Screen 
          name="Cadastro" 
          component={CadastroScreen} 
          options={{
            headerShown: true,
            title: 'Cadastro',
          }}
        />
        {/* Tela de Login Sucesso */}
        <Stack.Screen 
          name="LoginSucesso" 
          component={LoginSucessoScreen} 
          options={{
            headerShown: true,
            title: 'Login Efetuado',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'rgb(34, 34, 34)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  loginIcon: {
    width: 30,
    height: 30,
    marginBottom: 4,
  },
  loginText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentText: {
    fontSize: 18,
    color: '#000',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
