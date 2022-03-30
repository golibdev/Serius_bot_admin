exports.backKeyboard = {
   reply_markup: {
      inline_keyboard: [
         [
            { text: "🔙 Orqaga", callback_data: "back" },
         ],
      ],
   },
   parse_mode: "HTML",
};