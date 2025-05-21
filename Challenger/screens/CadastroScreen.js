import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';

const CadastroScreen = () => {
  const [nome, setNome] = useState('');
  const [emailCadastro, setEmailCadastro] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');

  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');

  const handleCadastro = () => {
    Alert.alert('Cadastro', `Nome: ${nome}\nEmail: ${emailCadastro}`);
  };

  const handleLogin = () => {
    Alert.alert('Login', `Email: ${emailLogin}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        {/* Coluna de Cadastro */}
        <View style={styles.column}>
          <Text style={styles.title}>Cadastro</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={emailCadastro}
            onChangeText={setEmailCadastro}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senhaCadastro}
            onChangeText={setSenhaCadastro}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleCadastro}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

        {/* Coluna de Login */}
        <View style={styles.column}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={emailLogin}
            onChangeText={setEmailLogin}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senhaLogin}
            onChangeText={setSenhaLogin}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: '#121212',
  },
  container: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#121212',
  },
  column: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#00FF00',
  },
  input: {
    height: 45,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: '#333',
    color: '#fff',
    fontFamily: 'Barlow-Regular',
  },
  button: {
    backgroundColor: '#00FF00',
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 8,
  },
  buttonText: {
    color: '#121212',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Barlow-Bold',
  },
});

export default CadastroScreen;
