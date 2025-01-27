const fs = require("fs");
const { tiny } = require("@viper-x/fancytext");
const config = require("../config.js");
const prefix = config.prefix;

module.exports = {
  name: 'alive',
  alias: ['bot'],
  description: 'To check the bot alive or off',
  category: 'Mics',
  async client(vorterx, m, { text, connect}) {
    await connect('🧘');

    const image = {
      url: "https://i.ibb.co/grM9VLh/091e4657090fdaa14cb3fb9f69cfa7e6.jpg",
      mimetype: "image/jpeg",
    };

    let aliveMsg = ` 
╭––『 *CHAT ON* 』 
┆ ${m.pushName}
╰–❖ __
╭–––––––––––––––༓ 
┆✑  Alive now🌷
╰–––––––––––––––༓ 
╭–– 『 *Bot Status* 』      
┆ *Name* : ${process.env.BOTNAME}
┆ *Owner* : ${process.env.OWNER_NAME}
┆ *Prefix* :  ${prefix}
┆ *Time* : ${new Date().toLocaleTimeString()}
╰–––––––––––––––༓ 
`;
    const messageOptions = {
      image: image,
      caption: tiny(aliveMsg),
      contextInfo: {
        externalAdReply: {
          title: "vorterx",
          body: "vorterx",
          thumbnail: image,
          mediaType: 1,
          mediaUrl: "",
          sourceUrl: "",
          ShowAdAttribution: true,
        },
      },
    };

    await vorterx.sendMessage(m.from, messageOptions, { quoted: m });
  }
}
