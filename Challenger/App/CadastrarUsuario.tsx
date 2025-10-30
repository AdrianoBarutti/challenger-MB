import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { auth } from "../src/services/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { MotiView } from "moti";

type RootStackParamList = {
  LoginUsuario: { mensagem?: string } | undefined;
};

export default function CadastrarUsuario() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      Alert.alert(t("errorTitle"), t("fillAllFields"));
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      await updateProfile(userCredential.user, { displayName: nome });

      navigation.navigate("LoginUsuario", { mensagem: t("ticketSavedSuccess") });
    } catch (error: any) {
      let mensagem = t("registrationError");
      if (error.code === "auth/email-already-in-use") mensagem = t("emailInUse");
      else if (error.code === "auth/invalid-email") mensagem = t("invalidEmail");
      else if (error.code === "auth/weak-password") mensagem = t("weakPassword");
      Alert.alert(t("errorTitle"), mensagem);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* TÍTULO - Cor do texto ajustada para branco */}
      <MotiView
        from={{ opacity: 0, translateY: -15 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 100 }}
      >
        <Text style={[styles.title, styles.darkText]}>{t("registerUserTitle")}</Text>
      </MotiView>

      {/* INPUT NOME - Estilo ajustado para modo escuro */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 200 }}
      >
        <TextInput 
          placeholder={t("namePlaceholder")} 
          placeholderTextColor="#aaa" // Placeholder visível no fundo escuro
          value={nome} 
          onChangeText={setNome} 
          style={[styles.input, styles.darkInput]} 
        />
      </MotiView>

      {/* INPUT EMAIL - Estilo ajustado para modo escuro */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 300 }}
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

      {/* INPUT SENHA - Estilo ajustado para modo escuro */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 400 }}
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

      {/* BOTÃO */}
      <MotiView
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', delay: 500 }}
      >
        <TouchableOpacity
          style={[styles.button, loading && { backgroundColor: "#999" }]}
          onPress={handleCadastro}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? t("registering") : t("registerButton")}
          </Text>
        </TouchableOpacity>
      </MotiView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  // MUDANÇA PRINCIPAL AQUI: Fundo escuro
  container: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 20, 
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
    fontSize: 24, 
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
    // Estilos padrão removidos pois darkInput os sobrescreve
  },
  button: {
    backgroundColor: "#28a745",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 18 },
});