const axios = require('axios');
const fs = require("fs");
const path = require("path");

const pluginDir = path.join(__dirname);
const pluginFiles = fs.readdirSync(pluginDir);
const commandsByCategory = {};

for (const file of pluginFiles) {
  if (!file.endsWith('.js') || file === 'menu.js') {
    continue;
  }
  
  const plugin = require(path.join(pluginDir, file));
  const category = plugin.category;

  if (!commandsByCategory[category]) {
    commandsByCategory[category] = [];
  }
  
  commandsByCategory[category].push(plugin);
}

module.exports = {
  name: 'menu',
  alias: ['h', 'help'],
  category: 'General',
  description: 'Reveals menu categories commands',

  async client(vorterx, m, { args, connect }) {
    await connect('Ⓜ️');
    let getCommands = '';

    for (const category in commandsByCategory) {
      getCommands += `┌──『 ${category} 』──❖\n`;
      getCommands += commandsByCategory[category].map(plugin => `| ${plugin.name}`).join('\n');
      getCommands += '\n└─────────◉\n';
    }

    let up_up, up_mid, up_btm;
    up_up = `┏━━⟪ *${tiny(process.env.BOTNAME)}* ⟫━━⦿`;
    up_mid = `┃ ✗`;
    up_btm = `┗━━━━━━━━━━━━━━⦿`;

    let amarok = `${up_up}
${up_mid} User: ${tiny(m.pushname)}
${up_mid} Botname: ${tiny(process.env.BOTNAME)}
${up_mid} Prefix: ${tiny(process.env.PREFIX)}
${up_mid} Runtime: ${tiny(process.uptime())} seconds
${up_mid} Time: ${tiny(new Date().toLocaleTimeString())}
${up_mid} Date: ${tiny(new Date().toLocaleDateString())}
${up_btm}\n\n${getCommands}`;

    await vorterx.sendMessage(m.from, { image: { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8IoKEDdsbryDr8GQr6gqFjgQh0APPLZsmnLuK-2_GnA&s" }, caption: tiny(amarok) }, { quoted: m });
  }
};
