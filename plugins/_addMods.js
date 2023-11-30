const config = require('../config');

module.exports = {
  name: '(admod|setsudo)',
  category: 'Owner',
  description: 'To add the user as a mod to the bot',
  async xstart(vorterx, m, { text, args, quoted, mentionByTag, xReact }) {

    if (!config.mods) {
      await xReact('❌');
      return m.reply(`\`\`\`This command is for my owner only\`\`\``);
    }
    const sender = m.sender;
    const tag = quoted ? quoted.text : '';
    const isMod = config.mods.includes(sender);

    if (isMod) {
      await xReact('✔️');
      const mods = quoted ? quoted.sender.replace('@net.whatsapp', '') : mentionByTag[0];
      if (mods) {
        config.mods.push(mods);
        vorterx.sendMessage(m.from, { text: `*User ${mods} has been promoted to moderator*` });
      } else {
        m.reply(`\`\`\`Please reply with the number you want to add to mods\`\`\``);
      }
    }
  }
};