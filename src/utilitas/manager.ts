import intents from "./intensts";
import response from "./respon";

const { NlpManager } = require("node-nlp");

const manager = new NlpManager({ languages: ["id"], forceNER: true });

const config = () => {
  // Perguntas
  const preConfig = intents.config(manager);
  // Respostas
  const posConfig = response.config(preConfig);
  return posConfig;
};

export default { config };
