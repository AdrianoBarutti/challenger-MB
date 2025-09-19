import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CadastroScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [emailCadastro, setEmailCadastro] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');

  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');

  const [usuarioCadastro, setUsuarioCadastro] = useState(null);

  // Função para salvar os dados do usuário no AsyncStorage
  const saveUserData = async (user) => {
    try {
      await AsyncStorage.setItem('usuarioCadastro', JSON.stringify(user));
    } catch (error) {
      console.log('Erro ao salvar os dados do usuário:', error);
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('usuarioCadastro');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUsuarioCadastro(parsedUser);
        }
      } catch (error) {
        console.log('Erro ao carregar os dados do AsyncStorage:', error);
      }
    };

    loadUserData();
  }, []);

  const handleCadastro = async () => {
    if (!nome || !emailCadastro || !senhaCadastro) {
      Alert.alert('Erro', 'Preencha todos os campos de cadastro.');
      return;
    }

    const newUser = {
      nome,
      email: emailCadastro,
      senha: senhaCadastro,
    };

    await saveUserData(newUser);
    setUsuarioCadastro(newUser);

    setNome('');
    setEmailCadastro('');
    setSenhaCadastro('');

    Alert.alert('Cadastro realizado', 'Seu cadastro foi realizado com sucesso!');
  };

  const handleLogin = () => {
    if (!usuarioCadastro) {
      Alert.alert('Erro', 'Nenhum usuário cadastrado.');
      return;
    }

    if (emailLogin === usuarioCadastro.email && senhaLogin === usuarioCadastro.senha) {
      navigation.navigate('LoginSucesso');
    } else {
      Alert.alert('Erro', 'Email ou senha inválidos.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        {/* Seção de Cadastro */}
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

        {/* Seção de Login */}
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
    backgroundColor: 'rgb(34, 34, 34)',
  },
  container: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: 'rgb(34, 34, 34)',
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
    color: '#28a745',
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
    backgroundColor: '#28a745',
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