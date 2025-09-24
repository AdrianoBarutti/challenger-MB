import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { auth } from "../services/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

type RootStackParamList = {
  LoginUsuario: { mensagem?: string } | undefined;
};

export default function CadastrarUsuario() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      await updateProfile(userCredential.user, { displayName: nome });

      // Navega para LoginUsuario passando a mensagem
      navigation.navigate("LoginUsuario", { mensagem: "Cadastro criado com sucesso!" });

    } catch (error: any) {
      let mensagem = "Erro ao criar cadastro.";
      if (error.code === "auth/email-already-in-use") mensagem = "Este email já está em uso.";
      else if (error.code === "auth/invalid-email") mensagem = "Email inválido.";
      else if (error.code === "auth/weak-password") mensagem = "Senha muito fraca.";
      Alert.alert("Erro", mensagem);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Usuário</Text>

      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        style={[styles.button, loading && { backgroundColor: "#999" }]}
        onPress={handleCadastro}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Cadastrando..." : "Cadastrar"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 30, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 14,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#28a745",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 18 },
});
