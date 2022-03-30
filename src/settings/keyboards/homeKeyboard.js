exports.homeKeyboard = {
   reply_markup: {
      inline_keyboard: [
         [
            { text: "🏢 O'quv markaz", callback_data: "markaz" },
            // courses
            { text: "📚 O'quv darslar", callback_data: "courses" },
         ],
         [
            // contact
            { text: "📞 Biz bilan bog'lanish", callback_data: "contact" },
         ]
      ]
   },
   parse_mode: "HTML"
}