const TelegramApi = require("node-telegram-bot-api");

const {
  classOptions,
  subjects5Options,
  subjects6Options,
  subjects7Options,
  subjects8Options,
  subjects9Options,
  subjects10Options,
} = require("./options.js");
const keepAlive = require("./server.js");
const { token } = require("./token.js");


const bot = new TelegramApi(token, { polling: true });

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Начальное приветствие" },
    { command: "/info", description: "Информация о пользователе" },
    { command: "/class", description: "Выбор класса" },
    { command: "/journal", description: "Журнал класса" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === "/start") {
      return bot.sendMessage(
        chatId,
        "Добро пожаловать в телеграм бот Урок Истории. Надеюсь ты узнаешь много нового!"
      );
    }
    if (text === "/info") {
      return bot.sendMessage(
        chatId,
        `Тебя зовут ${msg.chat.first_name} ${msg.chat.last_name}`
      );
    }
    if (text === "/class") {
      return bot.sendMessage(chatId, "Выбери свой класс", classOptions);
    }
    if (text === "/journal") {
      return bot.sendMessage(
        chatId,
        "https://docs.google.com/spreadsheets/d/1If8KumACO_U1HkmMP31E9HFGGYoWD4W36QeAxpugZTc/edit#gid=20315437"
      );
    }
    return bot.sendMessage(chatId, "Я тебя не понимаю");
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    const messageId = msg.message.message_id;
    switch (data) {
      case "5":
        bot.editMessageText("Выбери свой предмет", {
          chat_id: chatId,
          message_id: messageId,
          reply_markup: JSON.parse(subjects5Options.reply_markup),
        });
        break;
      case "6":
        bot.editMessageText("Выбери свой предмет", {
          chat_id: chatId,
          message_id: messageId,
          reply_markup: JSON.parse(subjects6Options.reply_markup),
        });
        break;

      case "7":
        bot.editMessageText("Выбери свой предмет", {
          chat_id: chatId,
          message_id: messageId,
          reply_markup: JSON.parse(subjects7Options.reply_markup),
        });
        break;

      case "8":
        bot.editMessageText("Выбери свой предмет", {
          chat_id: chatId,
          message_id: messageId,
          reply_markup: JSON.parse(subjects8Options.reply_markup),
        });
        break;

      case "9":
        bot.editMessageText("Выбери свой предмет", {
          chat_id: chatId,
          message_id: messageId,
          reply_markup: JSON.parse(subjects9Options.reply_markup),
        });
        break;

      case "10":
        bot.editMessageText("Выбери свой предмет", {
          chat_id: chatId,
          message_id: messageId,
          reply_markup: JSON.parse(subjects10Options.reply_markup),
        });
        break;

      default:
        break;
    }
    if (msg.data.includes("https://")) {
      bot.editMessageText(msg.data, {
        chat_id: chatId,
        message_id: messageId,
      });
    }

    bot.answerCallbackQuery(msg.id);
  });
};

keepAlive();
start();
