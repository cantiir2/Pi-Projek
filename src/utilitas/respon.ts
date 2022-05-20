import responseObject from "../config/respon";

const config = (manager: any) => {
  try {
    responseObject.forEach((item) => {
      manager.addAnswer("id", item.intent, item.text);
    });
    return manager;
  } catch (error) {
    throw new Error("Terjadi Galat!");
  }
};

export default { config };
