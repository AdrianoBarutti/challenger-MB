// App.js
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const handleLoginPress = () => {
    Alert.alert("Botão de Login", "Você clicou no botão de login!");
  };

  return (
    <View style={styles.container}>
      {/* Header com fundo "rgb(16,20,15)" */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require('./assets/mottu-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>Bem-vindo à Mottu</Text>
        </View>
        <TouchableOpacity style={styles.headerButton} onPress={handleLoginPress}>
          <Text style={styles.headerButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
      {/* Conteúdo da página */}
      <View style={styles.content}>
        <Text style={styles.contentText}>Conteúdo da página</Text>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Tela branca
  },
  header: {
    backgroundColor: 'rgb(16, 20, 15)', // Fundo do header na cor solicitada
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Espaça o conteúdo: logo/título à esquerda e botão à direita
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 40,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerButton: {
    backgroundColor: '#006400', // Verde escuro para o botão
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 16,
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
});
