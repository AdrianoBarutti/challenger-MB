import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { auth } from "../services/firebaseConfig";
import { signOut } from "firebase/auth";

export default function PerfilUsuario({ navigation }: any) {
  const user = auth.currentUser;

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Home"); // volta para Home após logout
      })
      .catch((error) => {
        console.log("Erro ao deslogar:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>

      {user?.photoURL ? (
        <Image source={{ uri: user.photoURL }} style={styles.avatar} />
      ) : (
        <Image source={require("../assets/default-avatar.png")} style={styles.avatar} />
      )}

      <Text style={styles.info}>Nome: {user?.displayName || "Não definido"}</Text>
      <Text style={styles.info}>Email: {user?.email}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  info: { fontSize: 18, marginBottom: 10 },
  logoutButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 20,
  },
  logoutText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
