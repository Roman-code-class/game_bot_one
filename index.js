const { Telegraf, Markup, Context } = require("telegraf");
const { message } = require("telegraf/filters");

require("dotenv").config();
const textCommands = require("./const");

const r = {
  name: "Камень",
};
const s = {
  name: "Ножницы",
};
const p = {
  name: "Бумага",
};

const bot = new Telegraf(process.env.Bot_Token);

bot.start(
  (ctx) =>
    ctx.reply(
      `Привет, ${
        ctx.message.from.first_name ? ctx.message.from.first_name : "игрок"
      }`
    ) &&
    ctx.replyWithSticker(
      "https://tlgrm.ru/_/stickers/387/79a/38779aa2-f514-380e-a6e6-f8c6ee379528/1.webp"
    )
);

bot.help((ctx) => ctx.reply(textCommands.commands));

bot.command("round", (ctx) => {
  try {
    ctx.replyWithHTML(
      "<b>Раунд</b>",
      Markup.inlineKeyboard([
        [
          Markup.button.callback(r.name, "btn_r"),
          Markup.button.callback(s.name, "btn_p"),
          Markup.button.callback(p.name, "btn_s"),
        ],
      ])
    );
  } catch (e) {
    console.error(e);
  }
});

function addActionBtn(name, userChoice, compVoices) {
  bot.action(name, async (ctx) => {
    try {
      await ctx.answerCbQuery(); // Исчезнование часов на кнопке
      await ctx.replyWithHTML(userChoice, {
        disable_web_page_preview: true,
      });
      await ctx.replyWithHTML(compVoices, {
        disable_web_page_preview: true,
      });
    } catch (e) {
      console.error(e);
    }
  });
}

addActionBtn("btn_r", r.name, textCommands.compChoice);

bot.on("message", (ctx) => {
  const text = ctx.message.text;
  if (ctx.message.text !== textCommands.commands) {
    ctx.reply("Я тебя не понимая, поробуй выбрать что-то");
  } else {
    bot.start;
  }
});

// bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
// bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
