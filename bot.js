const { Telegraf } = require('telegraf')
const dotenv = require('dotenv')
const { homeKeyboard } = require('./src/settings/keyboards/homeKeyboard')
const { backKeyboard } = require('./src/settings/keyboards/backKeyboard')
const { getAllCourses, getCourseById } = require('./src/settings/controllers/courseController')
dotenv.config()

const TOKEN = process.env.BOT_TOKEN

const bot = new Telegraf(TOKEN)

bot.start(ctx => {
   const first_name = ctx.from.first_name
   ctx.reply(`Assalomu alaykum <b>${first_name}</b>! Botga xush kelibsiz!`, homeKeyboard)
})

bot.on('callback_query', async ctx => {
   const first_name = ctx.from.first_name
   const { data } = ctx.callbackQuery
   const id = ctx.callbackQuery.from.id
   const chatId = ctx.callbackQuery.message.chat.id
   const inlineMessageId = ctx.callbackQuery.inline_message_id
   const message_id = ctx.callbackQuery.message.message_id
   const text = `
   Assalomu alaykum azizlar

   Bu kanal "<a href="https://t.me/serius_academy">Serius academy</a>"ni xalqqa tanitish maqsadida ochildi.
   
   "Serius academy" oʻzi nima?
   
   "Serius academy" bu — oziga xos qadriyatlarga ega, tadbirkor va dasturchi yoshlar guruhi tomonidan tashkil qilingan IT-markazi.
   
   "<a href="https://t.me/serius_academy">Serius academy</a>"ning oliy maqsadlari:
   
   📌 Har qanday biznesni dasturiy taʼminotlar bilan taʼminlab, ularning ishlarini avtomatlashtirish orqali amaliyotlarni tezlashtirish va bizneslarning o'zlariga va xalqqa boʻlgan foydasini yanada oshirish;
   
   📌 Xalqqa dasturiy va marketingga oid bilimlarni ulashgan holda, ularni zamonaviy kasblarni egallashi, ogʻir mehnat emas, balki, aqliy mehnat evaziga daromad topishlariga koʻmaklashish.
   
   🤗 Biz yoshlarning boshlagan ishimiz sizlarga maʼqul boʻlsa, kanalda qolishingiz va kanalni kuzatishingiz mumkin. 
   
   <a href="https://t.me/serius_academy">Kanalda</a> sizga kerak boʻlgan dasturlash va marketing kasblariga oid bilim va tajribalar, turli xildagi qiziqarli faktlar va IT-markazimizning siz kutgan takliflarini ulashib boramiz.
   
   <a href="https://www.google.com/maps/@38.8514241,65.7965314,85m/data=!3m1!1e3!5m2!1e1!1e4)">Manzil</a>: Qarshi shahri, O'zbekiston ko'chasi, Marmaris Restorani yonida (mo'ljal Mediapark Qarshi).
   
   📞+998990149998
   `
   

   if (data === 'markaz'){
      ctx.deleteMessage()
      bot.telegram.sendMessage(id, text, backKeyboard)
   } else if(data === 'courses' || data === 'back1') { 
      const courses = await getAllCourses()
      courses.push({
         id: 'back',
         title: '🔙 Ortga'
      })

      ctx.deleteMessage()

      if(courses.length > 1) {
         bot.telegram.sendPhoto(id, "https://t.me/youngproger/311", {
            reply_markup: {
               inline_keyboard: courses.map(course => {
                  return [{
                     text: course.title,
                     callback_data: course.id
                  }]
               })
            },
            parse_mode: 'HTML'
         })
      } else {
         bot.telegram.sendMessage(id, '<b>Xato!</b>', homeKeyboard)
      }
   } else if(data === 'contact') {
      ctx.deleteMessage()
      bot.telegram.sendMessage(id, '<b>📞 Telefon: +998990149998</b>', backKeyboard)
   } else if(data === 'back') {
      ctx.deleteMessage()
      bot.telegram.sendMessage(id, `<b>${first_name}</b>, botga xush kelibsiz!`, homeKeyboard)
   } else {
      const course = await getCourseById(data)
      ctx.deleteMessage()
      bot.telegram.sendPhoto(id, { source: `./public${course.image}` }, {
         caption: `${course.description}`,
         reply_markup: {
            inline_keyboard: [
               [{
                  text: '🔙 Ortga',
                  callback_data: 'back1'
               }]
            ]
         },
         parse_mode: 'HTML'
      })
   }
})

bot.launch()