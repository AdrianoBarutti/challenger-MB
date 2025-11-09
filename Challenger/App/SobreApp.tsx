import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import commitInfo from "../commit.json";

export default function SobreApp() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.title}>Sobre o App</Text>

        <Text style={styles.text}>
          O aplicativo <Text style={{ fontWeight: "bold" }}>Challenger</Text> foi desenvolvido como parte de um projeto voltado à{"\n"}
          organização e otimização do pátio de motos da Mottu.{"\n\n"}

          O sistema utiliza <Text style={{ fontWeight: "bold" }}>QR Codes exclusivos</Text> para cada moto, permitindo{"\n"}
          identificar rapidamente o local de estacionamento correto e o{"\n"}
          status das vagas.{"\n\n"}

          Com isso, o <Text style={{ fontWeight: "bold" }}>Challenger</Text> busca reduzir erros operacionais, aumentar a{"\n"}
          eficiência na gestão das motos e facilitar o dia a dia dos{"\n"}
          colaboradores, tornando o processo mais simples, rápido e{"\n"}
          intuitivo.{"\n\n"}

          Este projeto representa um <Text style={{ fontWeight: "bold" }}>protótipo funcional</Text>, criado com foco em{"\n"}
          inovação, tecnologia e melhoria operacional dentro da Mottu.
        </Text>

        {/* Linha separadora */}
        <View style={styles.separator} />

        <Text style={styles.text}>Versão: 1.0.0</Text>

        <Text style={styles.text}>
          Commit de referência:{" "}
          <Text style={styles.hash}>{commitInfo.commitHash}</Text>
        </Text>

        <Text style={styles.text}>
          Data do commit:{" "}
          <Text style={styles.hash}>{commitInfo.commitDate}</Text>
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#222",
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
    lineHeight: 22,
  },
  hash: {
    fontFamily: "monospace",
    color: "#2b6cb0",
  },
  separator: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 16,
  },
});
