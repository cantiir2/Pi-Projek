import trainingObject from "../config/training";
const config = (manager: any) => {
  try {
    trainingObject.forEach((item) => {
      manager.addDocument("id", item.text, item.intent);
    });
    return manager;
  } catch (error) {
    throw new Error("Terjadi Galat!");
  }
};

export default { config };
