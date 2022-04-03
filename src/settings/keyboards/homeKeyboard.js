exports.homeKeyboard = {
   reply_markup: {
      inline_keyboard: [
         [
            { text: "🏢 O'quv markaz", callback_data: "markaz" },
            // courses
            { text: "📚 O'quv darslar", callback_data: "courses" },
         ],
         [
            { text: "🗒 Xizmatlar", callback_data: "service" },
            { text: "📞 Biz bilan bog'lanish", callback_data: "contact" },
         ]
      ]
   },
   parse_mode: "HTML"
}