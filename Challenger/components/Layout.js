import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from './theme-context'; // Importando o contexto de tema

export function Layout({ children }) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      {/* Conteúdo das páginas */}
      {children}

      {/* Botão para alternar entre modos */}
      <TouchableOpacity
        style={[styles.toggleButton, isDarkMode ? styles.darkToggleButton : styles.lightToggleButton]}
        onPress={toggleTheme}
      >
        <Ionicons
          name={isDarkMode ? 'moon' : 'sunny'}
          size={25}
          color={isDarkMode ? '#fff' : '#222'}
        />
      </TouchableOpacity>
    </View>
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
  toggleButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  lightToggleButton: {
    backgroundColor: '#ffcd00', // Cor de fundo no modo claro
  },
  darkToggleButton: {
    backgroundColor: '#2c2c2c', // Cor de fundo no modo escuro
  },
});
