import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import QrCodeScreen from './screens/QrCode';
import CadastroScreen from './screens/CadastroScreen';
import LoginSucessoScreen from './screens/LoginSucessoScreen';
import FormularioScreen from './screens/FormularioScreen'; // Import da nova tela

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const handleCadastroPress = () => {
    navigation.navigate('Cadastro');
  };

  const handleQrCodePress = () => {
    navigation.navigate('QrCode');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('./assets/mottu-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleCadastroPress}>
          <Image
            source={require('./assets/helmet.png')}
            style={styles.loginIcon}
            resizeMode="contain"
          />
          <Text style={styles.loginText}>Login / Cadastro</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo principal */}
      <View style={styles.content}>
        <Text style={styles.title}>Precisa de um Help?</Text>
        <Text style={styles.subtitle}>
          clique logo a baixo para abrir um formulario com o suporte!
        </Text>

        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => navigation.navigate('Formulario')}
        >
          <Text style={styles.helpButtonText}>Suporte</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Onde deixo minha moto?</Text>
        <Text style={styles.subtitle}>
          Clique no botão e vamos de ajudar com isto!
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleQrCodePress}>
          <Text style={styles.buttonText}>Escanei Aqui</Text>
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
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: true,
            title: 'Página Inicial',
          }}
        />
        <Stack.Screen
          name="QrCode"
          component={QrCodeScreen}
          options={{
            headerShown: true,
            title: 'QR Code',
          }}
        />
        <Stack.Screen
          name="Cadastro"
          component={CadastroScreen}
          options={{
            headerShown: true,
            title: 'Cadastro',
          }}
        />
        <Stack.Screen
          name="LoginSucesso"
          component={LoginSucessoScreen}
          options={{
            headerShown: true,
            title: 'Login Efetuado',
          }}
        />
        <Stack.Screen
          name="Formulario"
          component={FormularioScreen}
          options={{
            headerShown: true,
            title: 'Formulário de Suporte',
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
  logo: {
    width: 60,
    height: 60,
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
    paddingHorizontal: 30,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  helpButton: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 30,
    width: '100%',
    marginBottom: 10,
  },
  helpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 30,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
