import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

export default function CadastrarUsuario({ navigation }: any) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const cadastrar = () => {
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      setErro("Preencha todos os campos!");
      return;
    }

    setLoading(true);
    setErro("");

    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        console.log("Usuário criado:", userCredential.user);
        // após cadastro, volta para Home (ou para Login, se preferir)
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log("Erro cadastro:", error);
        let mensagem = "Erro ao cadastrar usuário.";
        if (error.code === "auth/email-already-in-use") mensagem = "Este email já está em uso.";
        else if (error.code === "auth/invalid-email") mensagem = "Email inválido.";
        else if (error.code === "auth/weak-password") mensagem = "Senha muito fraca, use ao menos 6 caracteres.";
        setErro(mensagem);
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Usuário</Text>

      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" style={styles.input} />
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry style={styles.input} />

      {erro ? <Text style={styles.erroText}>{erro}</Text> : null}

      <TouchableOpacity style={[styles.button, loading && { backgroundColor: "#999" }]} onPress={cadastrar} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Cadastrando..." : "Cadastrar"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("LoginUsuario")}>
        <Text style={styles.voltarText}>Já possui conta? Fazer login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 30, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#999", borderRadius: 8, paddingHorizontal: 15, paddingVertical: 14, marginBottom: 20, fontSize: 16 },
  button: { backgroundColor: "#28a745", paddingVertical: 15, borderRadius: 30, alignItems: "center", marginBottom: 15 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 18 },
  erroText: { color: "#dc3545", fontSize: 16, marginBottom: 15, textAlign: "center" },
  voltarText: { color: "#007bff", fontSize: 16, textAlign: "center", marginTop: 10 },
});
