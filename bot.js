const { Client, GatewayIntentBits, PermissionFlagsBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.channel.name !== 'honey') return;

  try {
    await message.delete();
    await message.guild.members.ban(message.author.id, {
      reason: 'Typed in #honey. Should have known better.'
    });
    console.log(`Banned ${message.author.tag}`);
  } catch (err) {
    console.error('Could not ban:', err);
  }
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.TOKEN);
