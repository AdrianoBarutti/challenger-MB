import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../src/services/firebaseConfig";
import { useTranslation } from "react-i18next";

export default function LoginUsuario({ navigation }: any) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const login = () => {
    if (!email.trim() || !senha.trim()) {
      setErro(t("fillAllFields"));
      return;
    }

    setLoading(true);
    setErro("");

    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        console.log("Login efetuado:", userCredential.user);
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log("Erro login:", error);
        let mensagem = t("invalidCredentials");
        if (error.code === "auth/user-not-found") mensagem = t("userNotFound");
        else if (error.code === "auth/wrong-password") mensagem = t("wrongPassword");
        else if (error.code === "auth/invalid-email") mensagem = t("invalidEmail");

        setErro(mensagem);
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("loginTitle")}</Text>
      <TextInput
        placeholder={t("emailPlaceholder")}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder={t("passwordPlaceholder")}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />
      {erro ? <Text style={styles.erroText}>{erro}</Text> : null}
      <TouchableOpacity
        style={[styles.button, loading && { backgroundColor: "#999" }]}
        onPress={login}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? t("loggingIn") : t("loginButton")}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("CadastrarUsuario")}>
        <Text style={styles.cadastroText}>{t("noAccountText")}</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 30, textAlign: "center" },
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
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 18 },
  erroText: { color: "#dc3545", fontSize: 16, marginBottom: 15, textAlign: "center" },
  cadastroText: { color: "#28a745", fontSize: 16, textAlign: "center", marginTop: 10 },
});
