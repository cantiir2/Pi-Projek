import { create, Whatsapp } from "@wppconnect-team/wppconnect";
import manager from "./utilitas/manager";
import axios from "axios";
//import SendImages from "./utils/image";

const Ninonakano = require("winston");

const logger = Ninonakano.createLogger({
  level: "info",
  format: Ninonakano.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new Ninonakano.transports.File({ filename: "error.log", level: "error" }),
    new Ninonakano.transports.File({ filename: "combined.log" }),
  ],
});

const Main = async () => {
  const nlpManager = manager.config();
  await nlpManager.train();
  nlpManager.save();
  create({
    session: "Ai-Ssistent", //Pass the name of the client you want to start the bot
    logger: logger,
    catchQR: (base64Qrimg, asciiQR, attempts, urlCode) => {
      console.log("Number of attempts to read the qrcode: ", attempts);
      console.log("Terminal qrcode: ", asciiQR);
      // console.log("base64 image string qrcode: ", base64Qrimg);
      // console.log("urlCode (data-ref): ", urlCode);
    },
    statusFind: (statusSession, session) => {
      console.log("Status Session: ", statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken
      //Create session wss return "serverClose" case server for close
      console.log("Session name: ", session);
    },
    headless: false, // Headless chrome
    devtools: false, // Open devtools by default
    useChrome: true, // If false will use Chromium instance
    debug: false, // Opens a debug session
    logQR: true, // Logs QR automatically in terminal
    browserWS: "", // If u want to use browserWSEndpoint
    browserArgs: [""], // Parameters to be added into the chrome browser instance
    puppeteerOptions: {}, // Will be passed to puppeteer.launch
    disableWelcome: false, // Option to disable the welcoming message which appears in the beginning
    updatesLog: true, // Logs info updates automatically in terminal
    // autoClose: 60000, // Automatically closes the wppconnect only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
    tokenStore: "file", // Define how work with tokens, that can be a custom interface
    folderNameToken: "./tokens", //folder name when saving tokens
  })
    .then(async (client) => {
      try {
        client.onMessage(async (message) => {
          if (message.isGroupMsg === false) {
            const response = await nlpManager.process("id", message.body);
            switch (response.intent) {
              case "None":
                await client.sendText(message.from, 'p');
                break;
              case "menu":
                await client.sendText(message.from, response.answer);
                break;
              case "promocao":
               // await sendImage(client, message);
                break;
              case "lokasi":
                await client.sendLocation(
                  message.from,
                  "-6.2843561",
                  "107.0018172",
                  "Keredit Home"
                );
                break;
              default:
                if (response.answer != undefined) {
                  const formatedResponse = response.answer.replace(message.sender.verifiedName);
                  await client.sendText(message.from, formatedResponse);
                }
                break;
            }
          }
        });
      } catch (error: any) {
        console.error(error);
      }
    })
    .catch((erro) => {
      console.error(erro);
    });
};

Main();
