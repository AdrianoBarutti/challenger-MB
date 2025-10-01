import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from "react-i18next";

export default function FormularioScreen() {
  const { t } = useTranslation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [chamados, setChamados] = useState([]);
  const [mostrarChamados, setMostrarChamados] = useState(false);

  const handleSalvar = async () => {
    if (!nome.trim() || !email.trim() || !mensagem.trim()) {
      Alert.alert(t('errorTitle'), t('fillAllFields'));
      return;
    }

    try {
      const chamado = {
        id: Date.now().toString(),
        nome,
        email,
        mensagem,
      };

      const chamadosString = await AsyncStorage.getItem('@form_chamados');
      const chamadosSalvos = chamadosString ? JSON.parse(chamadosString) : [];

      chamadosSalvos.push(chamado);

      await AsyncStorage.setItem('@form_chamados', JSON.stringify(chamadosSalvos));

      Alert.alert(t('successTitle'), t('ticketSavedSuccess'));

      limparCampos();

      if (mostrarChamados) {
        setChamados(chamadosSalvos);
      }
    } catch (error) {
      Alert.alert(t('errorTitle'), t('ticketSaveError'));
      console.error(error);
    }
  };

  const limparCampos = () => {
    setNome('');
    setEmail('');
    setMensagem('');
  };

  const carregarChamados = async () => {
    try {
      const chamadosString = await AsyncStorage.getItem('@form_chamados');
      const chamadosSalvos = chamadosString ? JSON.parse(chamadosString) : [];
      setChamados(chamadosSalvos);
      setMostrarChamados(true);
    } catch (error) {
      Alert.alert(t('errorTitle'), t('ticketLoadError'));
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t('supportTitle')}</Text>
      <Text style={styles.label}>{t('nameLabel')}</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder={t('namePlaceholder')}
        placeholderTextColor="#999"
      />
      <Text style={styles.label}>{t('emailLabel')}</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder={t('emailPlaceholder')}
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.label}>{t('messageLabel')}</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        value={mensagem}
        onChangeText={setMensagem}
        placeholder={t('messagePlaceholder')}
        placeholderTextColor="#999"
        multiline
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSalvar}>
          <Text style={styles.buttonText}>{t('saveButton')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={limparCampos}>
          <Text style={styles.buttonText}>{t('clearButton')}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.button, styles.showButton]} onPress={carregarChamados}>
        <Text style={styles.buttonText}>{t('showTicketsButton')}</Text>
      </TouchableOpacity>

      <View style={styles.previewContainer}>
        <Text style={styles.previewTitle}>{t('inputDataTitle')}</Text>
        <Text style={styles.previewText}><Text style={styles.previewLabel}>{t('nameLabel')} </Text>{nome || '(vazio)'}</Text>
        <Text style={styles.previewText}><Text style={styles.previewLabel}>{t('emailLabel')} </Text>{email || '(vazio)'}</Text>
        <Text style={styles.previewText}><Text style={styles.previewLabel}>{t('messageLabel')} </Text>{mensagem || '(vazio)'}</Text>
      </View>

      {mostrarChamados && (
        <View style={styles.chamadosContainer}>
          <Text style={styles.chamadosTitle}>{t('savedTicketsTitle')}</Text>
          {chamados.length === 0 ? (
            <Text style={{ textAlign: 'center', color: '#555' }}>{t('noTicketsSaved')}</Text>
          ) : (
            <FlatList
              data={chamados}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.chamadoItem}>
                  <Text style={styles.chamadoNome}>{item.nome}</Text>
                  <Text style={styles.chamadoEmail}>{item.email}</Text>
                  <Text style={styles.chamadoMensagem}>{item.mensagem}</Text>
                </View>
              )}
            />
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 30,
    textAlign: 'center',
    color: '#222',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#28a745',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    fontSize: 16,
    color: '#222',
    backgroundColor: '#f9f9f9',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 0.48,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#28a745',
  },
  clearButton: {
    backgroundColor: '#dc3545',
  },
  showButton: {
    backgroundColor: '#222',
    marginTop: 25,
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  previewContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#e6f4ea',
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#28a745',
    textAlign: 'center',
  },
  previewText: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },
  previewLabel: {
    fontWeight: '700',
  },
  chamadosContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f0f7ff',
    borderRadius: 12,
  },
  chamadosTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    color: '#004085',
    textAlign: 'center',
  },
  chamadoItem: {
    backgroundColor: '#cfe2ff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  chamadoNome: {
    fontWeight: '700',
    fontSize: 17,
    marginBottom: 6,
    color: '#0b2e6e',
  },
  chamadoEmail: {
    fontStyle: 'italic',
    marginBottom: 6,
    color: '#1a3d7c',
  },
  chamadoMensagem: {
    color: '#222',
  },
});