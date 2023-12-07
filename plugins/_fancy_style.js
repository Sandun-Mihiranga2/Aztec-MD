const axios = require('axios');

module.exports = {
  name: 'fancy',
  category: 'Convert',
  async client(vorterx, m, { text, args, quoted, connect }) {
    if (args.length < 2) {
      if (args.length === 1 && text.toLowerCase() === 'fancy') {
        args.push('VORTERX');
      } else {
        await connect('❌');
        return m.reply('Please use the command in the following format: fancy [1-20] [text]');
      }
    }
    let userStyle = parseInt(args[0]);
    if (isNaN(userStyle) || userStyle < 1 || userStyle > 20) {
      return m.reply('Please provide a number of fancy levels between 1 and 20.');
    }
    const vorterxTXT = args.slice(1).join(' ');
    try {
      await connect('📇');
      const response = await axios.get(`https://api.botcahx.live/api/tools/styletext?text=${encodeURIComponent(vorterxTXT)}&apikey=29y8XIYL`);
      if (response.data.success) {
        let sendFancy = response.data.result;
        for (let i = 0; i < userStyle; i++) {
          sendFancy = `*${sendFancy}*`;
        }
        m.reply(sendFancy);
      } else {
        m.reply('_Failed to style the text. Please try again later.');
      }
    } catch (error) {
      console.error('An error occurred while styling the text:', error);
      m.reply('_An error occurred. Please try again later.');
    }
  }
};
