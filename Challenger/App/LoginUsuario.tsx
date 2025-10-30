import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../src/services/firebaseConfig";
import { useTranslation } from "react-i18next";
import { MotiView } from "moti";


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
      
      {/* 2. TÍTULO - Animação de entrada rápida (delay 100ms) */}
      <MotiView
        from={{ opacity: 0, translateY: -15 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 100 }}
      >
        <Text style={[styles.title, styles.darkText]}>{t("loginTitle")}</Text>
      </MotiView>

      {/* 3. INPUT EMAIL - Animação de entrada (delay 200ms) */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 200 }}
      >
        <TextInput
          placeholder={t("emailPlaceholder")}
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={[styles.input, styles.darkInput]}
        />
      </MotiView>
      
      {/* 4. INPUT SENHA - Animação de entrada (delay 300ms) */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 300 }}
      >
        <TextInput
          placeholder={t("passwordPlaceholder")}
          placeholderTextColor="#aaa"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={[styles.input, styles.darkInput]}
        />
      </MotiView>

      {/* Mensagem de Erro - Aparece sem delay para feedback imediato, mas usa Moti */}
      {erro ? (
        <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 300, delay: 400 }}
        >
            <Text style={styles.erroText}>{erro}</Text>
        </MotiView>
      ) : null}
      
      {/* 5. BOTÃO DE LOGIN - Animação de entrada com Spring (delay 500ms) */}
      <MotiView
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', delay: 500 }}
      >
        <TouchableOpacity
          // Botão agora usa a cor primária verde de outros botões (#28a745)
          style={[styles.button, { backgroundColor: '#28a745' }, loading && { backgroundColor: "#999" }]} 
          onPress={login}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? t("loggingIn") : t("loginButton")}</Text>
        </TouchableOpacity>
      </MotiView>
      
      {/* 6. BOTÃO DE CADASTRO - Animação de entrada (delay 600ms) */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 600 }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("CadastrarUsuario")}>
          <Text style={styles.cadastroText}>{t("noAccountText")}</Text>
        </TouchableOpacity>
      </MotiView>
      
    </View>
  );
}


const styles = StyleSheet.create({
  // MUDANÇA PRINCIPAL AQUI: Fundo escuro
  container: { 
    flex: 1, 
    padding: 24, 
    justifyContent: "center",
    backgroundColor: "rgb(34, 34, 34)" // Fundo Escuro
  },
  // NOVO ESTILO: Texto branco para o fundo escuro
  darkText: {
    color: "#fff", 
  },
  // NOVO ESTILO: Input customizado para o fundo escuro
  darkInput: {
    backgroundColor: "#333", // Fundo do input ligeiramente mais claro que o container
    color: "#fff", // Texto digitado em branco
    borderColor: "#555", // Borda em cinza escuro
  },
  title: { 
    fontSize: 26, 
    fontWeight: "700", 
    marginBottom: 30, 
    textAlign: "center" 
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 14,
    marginBottom: 20,
    fontSize: 16,
    // Estilos padrão do input removidos em favor de darkInput
  },
  button: {
    // A cor de fundo será definida diretamente no componente para usar o verde (#28a745)
    backgroundColor: "#007bff", // Mantido no styles, mas sobrescrito no componente
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 18 },
  erroText: { color: "#dc3545", fontSize: 16, marginBottom: 15, textAlign: "center" },
  cadastroText: { color: "#28a745", fontSize: 16, textAlign: "center", marginTop: 10 },
});