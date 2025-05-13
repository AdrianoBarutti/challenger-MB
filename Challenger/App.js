import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const handleLoginPress = () => {
    Alert.alert("Botão de Login", "Você clicou no botão de login!");
  };

  const handleHomePress = () => {
    navigation.navigate('Home');
  };

  const handleQrCodePress = () => {
    navigation.navigate('QrCode');
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
        <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
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
      </View>

      {/* Barra inferior fixa */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomButton} onPress={handleHomePress}>
          <View style={styles.iconWrapper}>
            <Image
              source={require('./assets/home.png')}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomButton} onPress={handleQrCodePress}>
          <Image
            source={require('./assets/qr-code.png')}
            style={styles.qrIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <StatusBar style="light" />
    </View>
  );
}

function QrCodeScreen() {
  return (
    <View style={styles.container}>
      <Text>Escaneador de QR Code</Text>
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
          options={{ headerShown: false }} // Removendo a barra de título
        />
        <Stack.Screen 
          name="QrCode" 
          component={QrCodeScreen} 
          options={{ headerShown: false }} // Removendo a barra de título
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
    marginBottom: 60,
  },
  contentText: {
    fontSize: 18,
    color: '#000',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgb(34, 34, 34)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#333',
  },
  bottomButton: {
    alignItems: 'center',
    padding: 10,
  },
  bottomButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  qrIcon: {
    width: 32,
    height: 32,
  },
  iconWrapper: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  icon: {
    width: 28,
    height: 28,
    marginBottom: 4,
  },
});
