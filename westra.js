
const Discord = require('discord.js')
const db = require('quick.db') 
const client = new Discord.Client({ disableEveryone: true })
const fetch = require('node-fetch')
const fs = require('fs')
require('express')().listen(1343)
const moment = require('moment')
require('moment-duration-format')
const prefix = '!'

setInterval(() => {
const Linkler = db.get('Linkler')
if(!Linkler) return;
const Aventadoria = Linkler.map(Revenge => Revenge.url)
Aventadoria.forEach(Link => {
try {
fetch(Link)
} catch(e) {
console.error(e)
}
})
console.log(`Proje : ${db.get('Proje') || 1} Başarıyla Hostandı`)
}, 70000)

client.on('ready', () => {
console.log(`${client.user.username} Aktif!`)
if(!Array.isArray(db.get('Linkler'))) {
db.set('Linkler', [])
}
})
client.on('message', async message => {
  if(message.author.bot) return;
  var Split = message.content.split(' ')


  if(Split[0] == prefix+'ekle') {
  var Link = Split[1]
  fetch(Link).then(() => {
    const Revenge = new Discord.RichEmbed()
    .setColor('#ff0000')
    .setDescription(`    **Link Sistemde Zaten Bulunuyor.** \<a:hayr:803651689168502794>
    `)
    .setTimestamp()
    if(db.get('Linkler').map(Revenge => Revenge.url).includes(Link)) return message.channel.send(Revenge)
    const Emrecan = new Discord.RichEmbed()
    .setColor('#ff0000')
    .setDescription(`** Yazdığınız URL Eklenmiştir.** \<a:evet:803651989640708120>   `)
    .addField(prefix+'linkler','Komutunu Kullanarak Ekledigin Linklere Erisebilirsin')
    .setTimestamp()
.setImage('https://cdn.discordapp.com/attachments/807962704479649803/808753376363413555/standard.gif')
    message.channel.send(Emrecan)
    db.push('Linkler', { url: Link, owner: message.author.id, owner2: message.author.tag})
    db.add(`Sahiplik_${message.author.id}`,1)
    db.push(`Projesi_${message.author.id}`,Link)
    db.add(`Proje`,1)
  }).catch(Hata => {
  const UpTime = new Discord.RichEmbed()
  .setColor('#ff0000')
  .setDescription(`**Sistem İçin Lütfen URL'nizi Girin:** \<a:evet:803651989640708120>`)
.setImage('https://cdn.discordapp.com/attachments/807962704479649803/808753376363413555/standard.gif')
  .setTimestamp()
  message.channel.send(UpTime)
  })
  }

  if(Split[0] == prefix+'davet') {
  const Revo = new Discord.RichEmbed()
  .setColor('#ff0000')
  .setDescription(`**Beni Sunucuna Eklemek Istemen Beni Sevindiriyor Hemen Altta Linkimi Bula Bilirsin Sen Olmassan 1 kisi eksik**

[Ekleme Linkim](https://discord.com/api/oauth2/authorize?client_id=803637536442417202&permissions=8&scope=bot)

[Destek Sunucum](https://discord.gg/FYRWdKJprr)
`)
  .setThumbnail(message.author.avatarURL)
.setImage('https://cdn.discordapp.com/attachments/807962704479649803/808753376363413555/standard.gif')
  message.channel.send(Revo)
  }

  if(Split[0] == prefix+'i') {
  const Istatistik = new Discord.RichEmbed()
  .setColor('#ff0000')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .setDescription(`** \<a:uptim:807972385721679952> Isim -** __${client.user.username}__
** \<a:uptim:807972385721679952> Kanal Sayısı -** __${client.channels.size}__
** \<a:uptim:807972385721679952> Sunucu Sayısı -** __${client.guilds.size}__
** \<a:uptim:807972385721679952> Kullanıcı Sayısı -** __${client.guilds.reduce((a,b) => a + b.memberCount,0).toLocaleString()}__
** \<a:uptim:807972385721679952> Link Sayısı -** __${await db.fetch('Proje') || 1}__
** \<a:uptim:807972385721679952> Geliştirici -** <@800052450479439923>
** \<a:uptim:807972385721679952> Aktiflik Suresi -** __${moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]")}__`)

message.channel.send(Istatistik)
  }
  if(Split[0] == prefix+'istatistik') {
  const Istatistik = new Discord.RichEmbed()
  .setColor('#ff0000')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .setDescription(`
** \<a:uptim:807972385721679952> Isim -** __${client.user.username}__
** \<a:uptim:807972385721679952> Kanal Sayısı -** __${client.channels.size}__
** \<a:uptim:807972385721679952> Sunucu Sayısı -** __${client.guilds.size}__
** \<a:uptim:807972385721679952> Kullanıcı Sayısı -** __${client.guilds.reduce((a,b) => a + b.memberCount,0).toLocaleString()}__
** \<a:uptim:807972385721679952> Link Sayısı -** __${await db.fetch('Proje') || 1}__
** \<a:uptim:807972385721679952> Aktiflik Suresi -** __${moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]")}__
** \<a:uptim:807972385721679952> Geliştirici -** <@800052450479439923>

`)
message.channel.send(Istatistik)
  }

  if(Split[0] == prefix+'s') {
  const Revoş = new Discord.RichEmbed()
  .setColor('#ff0000')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .setDescription(`
**» Şuanda Toplam \`${db.get('Proje')}\` URL Uptime Ediliyor** \<a:evet:803651989640708120>

**» Bunlardan Sadece \`${db.fetch(`Sahiplik_${message.author.id}`) || null}\` Tanesi Senin.** \<a:evet:803651989640708120>
`)
  message.channel.send(Revoş)
  }
  if(Split[0] == prefix+'say') {
  const Revoş = new Discord.RichEmbed()
  .setColor('#ff0000')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .setDescription(`
**» Şuanda Toplam \`${db.get('Proje')}\` URL Uptime Ediliyor.** \<a:evet:803651989640708120>

**» Bunlardan Sadece \`${db.fetch(`Sahiplik_${message.author.id}`) || null}\` Tanesi Senin** \<a:evet:803651989640708120>
`)
  message.channel.send(Revoş)
  }

  if(Split[0] == prefix+'yardım') {
  const HugoMugo = new Discord.RichEmbed()
  .setColor('#ff0000')
  .setThumbnail(message.author.avatarURL)
  .setTimestamp()
  .setAuthor(client.user.username,client.user.avatarURL)
  .setDescription(`
**Botumuz Uptime Ile Alakalı Bir Botdur**

\<a:aktf:803651783280033813> » Prefixim: **${prefix}**
\<a:aktf:803651783280033813> » Dil: **TR**
`)
  .addField('**» Uptime Bot Komutlari**',`
\<a:sys:809108151710122086> » **!link-kaldır** - Link Kaldırmanıza Yarar.
\<a:alev:803650421159231499> » **!ekle** - Link Eklemenize Yarar.
\<a:bsrl:803708955930132550> » **!erişim-kontrol** - Erişim Kontrol.
\<a:dimnd:807971147353817108> » **!linkler** - Liklerinizi Gösterir.
`)
  .addField('**» Genel Komutlar**',`
\<a:uptim:807972385721679952> » **!dil** - Botun Dlini Ayarlar
\<a:tass:808290945711079434> » **!davet** - Botun Davet Linkini Atar
\<a:bakm:803709033747316736> » **!istatistik** - Bot Istatistigini Atar
\<a:lnkler:803651720734834756> » **!say** - Total Ve Senin Link Sayini Atar
`)
.addField('**» Destek Sunucum**','[Destek Sunucum](https://discord.gg/FYRWdKJprr)')
.addField('**» Davet Linkim**','[Beni Davet Et](https://discord.com/api/oauth2/authorize?client_id=803637536442417202&permissions=8&scope=bot)')
.setImage('https://cdn.discordapp.com/attachments/807962704479649803/808753376363413555/standard.gif')
  message.channel.send(HugoMugo)
  }

    if(Split[0] == prefix+'linkler') {
    const Linkleri = db.fetch(`Projesi_${message.author.id}`)
    if (!db.get('Linkler').map(Revenge => Revenge.owner).includes(message.author.id)) return message.channel.send(new Discord.RichEmbed().setColor('#ff0000').setDescription(`**Hiç link eklememişsin. Link Eklemek İçin \`${prefix}ekle\` yazman yeterli**`))
    message.channel.send(new Discord.RichEmbed().setColor('#ff0000').setDescription(`**Uptime Etmekte Olduğun Linkler Direkt Mesajlarına Gönderildi . Direkt mesajlarını kontrol et.  ${message.author}**`).setThumbnail(message.author.avatarURL))
    message.author.send(new Discord.RichEmbed().setColor('#ff0000').setDescription(`**» Normal Linklerin:** \n\n\``+Linkleri.join('\n')+`\``).setThumbnail(message.author.avatarURL))
    }

    if(Split[0] == prefix+'dil') {
    const Dil = Split[1]
    if (!Dil) return message.channel.send(`${message.author}, Geçerli bir dil belirtmelisin. 

 **Örnek:** \`${prefix}dil TR\` 

 **DİLLER** 
 \`EN,TR\``)
const Mevenge = new Discord.RichEmbed()
.setColor('#ff0000')
.setTitle('Dil Değiştirildi.')
.setDescription('Botun dili başarıyla **TÜRKÇE** olarak kaydedildi.')
message.channel.send(Mevenge).then(x => x.react('\<a:evet:803651989640708120>'))
   }

    if(Split[0] == prefix+'erişim-kontrol') {
const Megenge = new Discord.RichEmbed()
.setColor('#ff0000')
.setThumbnail(message.author.avatarURL)
.setTimestamp()
.setTitle('\<a:uptim:807972385721679952> Erişim Kontrol')
.setDescription('**» Erişiminiz Aktif**')
message.channel.send(Megenge)
}
})


 client.on("ready", async () => {
console.log ("Bot Durumu Yayında Olarak Ayarlandı!")
      client.user.setActivity("💦 !yardım 💦 !ekle", 
        { url: 'https://twitch.tv/.',
        type: 'STREAMING' }); 
})


client.on("message", async message => {

  if(!message.content.startsWith("eval")) return;
  if(!["eval kullanıcı id","eval kullanıcı id"].includes(message.author.id)) return;
  var args = message.content.split("eval")[1]
  if(!args) return message.channel.send(":x: ..")
  
      const code = args
    
    
      function clean(text) {
          if (typeof text !== 'string')
              text = require('util').inspect(text, { depth: 3 })
          text = text
              .replace(/`/g, '`' + String.fromCharCode(8203))
              .replace(/@/g, '@' + String.fromCharCode(8203))
          return text;
      };
  
      var evalEmbed = ""
      try {
          var evaled = await clean(await eval(await code));
          if (evaled.constructor.name === 'Promise') evalEmbed = `\`\`\`\n${evaled}\n\`\`\``
          else evalEmbed = `\`\`\`js\n${evaled}\n\`\`\``
          
  if(evaled.length < 1900) { 
     message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
  } else {
    var hast = await require("hastebin-gen")(evaled, { url: "https://hasteb.in" } )
  message.channel.send(hast)
  }
      } catch (err) {
          message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
      }
  })

const Log = message => {
console.log(`${message}`)
}


client.on('guildCreate', guild => {

  let channel = guild.channels.cache.filter(c => c.type === "text").random()

  channel.send("> **Selam Görünüşe Göre Yeni Bir Sunucudayım ,!yardım Yazarak Komutlarımı Göre bilirsiniz.**");

});


client.login(process.env.token)



