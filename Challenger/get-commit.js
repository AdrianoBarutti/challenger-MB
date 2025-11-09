const { execSync } = require("child_process");
const fs = require("fs");

try {
  // Pega o hash do commit atual
  const commitHash = execSync("git rev-parse HEAD").toString().trim();

  // Pega a data e hora do commit atual
  const commitDate = execSync("git log -1 --format=%cd --date=iso").toString().trim();

  // Cria o objeto com as informações
  const data = {
    commitHash,
    commitDate,
  };

  // Salva no arquivo commit.json
  fs.writeFileSync("./commit.json", JSON.stringify(data, null, 2), "utf8");
  console.log("informações do commit salvas em commit.json:", data);
} catch (err) {
  console.error("Erro ao obter informações do commit:", err);
  process.exit(1);
}
