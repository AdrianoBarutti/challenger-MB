import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native'; // Para controle de tema
import Ionicons from 'react-native-vector-icons/Ionicons'; // Para usar ícones vetoriais

import QrCodeScreen from './App/QrCode';
import CadastroScreen from './App/CadastroScreen';
import LoginSucessoScreen from './App/LoginSucessoScreen';
import FormularioScreen from './App/FormularioScreen'; // Import da nova tela

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado para o tema
  const scheme = useColorScheme(); // Detecta o tema atual (light ou dark)
  
  useEffect(() => {
    setIsDarkMode(scheme === 'dark');
  }, [scheme]); // Atualiza o tema sempre que o esquema de cores mudar
  
  const handleCadastroPress = () => {
    navigation.navigate('Cadastro');
  };

  const handleQrCodePress = () => {
    navigation.navigate('QrCode');
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev); // Alterna entre claro e escuro
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('./assets/mottu-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleCadastroPress}>
          <Text style={styles.loginText}>Login / Cadastro</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo principal */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#222' }]}>
          Precisa de um Help?
        </Text>
        <Text style={[styles.subtitle, { color: isDarkMode ? '#fff' : '#555' }]}>
          Clique logo abaixo para abrir um formulário com o suporte!
        </Text>

        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => navigation.navigate('Formulario')}
        >
          <Text style={styles.helpButtonText}>Suporte</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#222' }]}>
          Onde deixo minha moto?
        </Text>
        <Text style={[styles.subtitle, { color: isDarkMode ? '#fff' : '#555' }]}>
          Clique no botão e vamos te ajudar com isto!
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleQrCodePress}>
          <Text style={styles.buttonText}>Escanei Aqui</Text>
        </TouchableOpacity>
      </View>

      {/* Botão para alternar entre modos claro e escuro, agora na parte inferior */}
      <TouchableOpacity
        style={[styles.toggleButton, isDarkMode ? styles.darkToggleButton : styles.lightToggleButton]}
        onPress={toggleTheme}
      >
        <Ionicons
          name={isDarkMode ? 'moon' : 'sunny'} // Ícones de Lua ou Sol
          size={25}
          color={isDarkMode ? '#fff' : '#222'} // Cor do ícone
        />
      </TouchableOpacity>

      <StatusBar style={isDarkMode ? "light" : "dark"} />
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
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#222',
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
  loginText: {
    color: '#fff',
    fontSize: 14,
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
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
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
  toggleButton: {
    position: 'absolute',
    bottom: 20, // Agora está na parte inferior
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Sombra para o botão
  },
  lightToggleButton: {
    backgroundColor: '#28a745', // Cor de fundo no modo claro
  },
  darkToggleButton: {
    backgroundColor: '#2c2c2c', // Cor de fundo no modo escuro
  },
});
