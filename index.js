const TelegramApi = require("node-telegram-bot-api");

const {
  gameOptions,
  againOptions,
  classOptions,
  subjects5Options,
  subjects6Options,
  subjects7Options,
  subjects8Options,
  subjects9Options,
  subjects10Options,
} = require("./options.js");

const token = "6027757240:AAFX4qAMn4TqRWUO6uR3PYLiOMYLWlfS90o";

const bot = new TelegramApi(token, { polling: true });

const chats = {};

const startGame = async (chatId) => {
  await bot.sendMessage(
    chatId,
    "Сейчас я загадаю число от 0 до 9 и тебе надо его отгадать"
  );
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, "Отгадывай", gameOptions);
};

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Начальное приветствие" },
    { command: "/info", description: "Информация о пользователе" },
    { command: "/class", description: "Выбор класса" },
    { command: "/game", description: "Игра угадай число" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === "/start") {
      await bot.sendMessage(
        chatId,
        "Добро пожаловать в телеграм бот Урок Истории. Надеюсь ты узнаешь много нового!"
      );
      return bot.sendSticker(
        chatId,
        "https://tlgrm.eu/_/stickers/638/bf0/638bf0c2-237c-3928-ae17-abf81b166c59/11.webp"
      );
    }
    if (text === "/info") {
      return bot.sendMessage(
        chatId,
        `Тебя зовут ${msg.chat.first_name} ${msg.chat.last_name}`
      );
    }
    if (text === "/game") {
      return startGame(chatId);
    }
    if (text === "/class") {
      return bot.sendMessage(chatId, "Выбери свой класс", classOptions);
    }
    return bot.sendMessage(chatId, "Я тебя не понимаю");
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    const text = msg.message.text;
    if (data === "/again") {
      return startGame(chatId);
    }
    if (text === "Выбери свой класс") {
      if (data === "5") {
        bot.sendMessage(chatId, "Выбери свой предмет", subjects5Options);
        bot.on("callback_query", async (mssg) => {
          bot.sendMessage(chatId, mssg.data);
        });
      }
      if (data === "6") {
        bot.sendMessage(chatId, "Выбери свой предмет", subjects6Options);
        bot.on("callback_query", async (mssg) => {
          bot.sendMessage(chatId, mssg.data);
        });
      }
      if (data === "7") {
        bot.sendMessage(chatId, "Выбери свой предмет", subjects7Options);
        bot.on("callback_query", async (mssg) => {
          bot.sendMessage(chatId, mssg.data);
        });
      }
      if (data === "8") {
        bot.sendMessage(chatId, "Выбери свой предмет", subjects8Options);
        bot.on("callback_query", async (mssg) => {
          bot.sendMessage(chatId, mssg.data);
        });
      }
      if (data === "9") {
        bot.sendMessage(chatId, "Выбери свой предмет", subjects9Options);
        bot.on("callback_query", async (mssg) => {
          bot.sendMessage(chatId, mssg.data);
        });
      }
      if (data === "10") {
        bot.sendMessage(chatId, "Выбери свой предмет", subjects10Options);
        bot.on("callback_query", async (mssg) => {
          bot.sendMessage(chatId, mssg.data);
        });
      }
    }
    if (text === "Отгадывай") {
      if (data === chats[chatId]) {
        return bot.sendMessage(
          chatId,
          `Поздравляем, ты отгадал цифру ${chats[chatId]}`,
          againOptions
        );
      } else {
        return bot.sendMessage(
          chatId,
          `Не повезло. Правильное число ${chats[chatId]}`,
          againOptions
        );
      }
    }
  });
};

start();
