const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

const BAN_DURATION_MINUTES = 1; // Ban time in minutes, change this number to whatever you want

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.channel.name !== 'honey') return;

  const userId = message.author.id;
  const guild = message.guild;

  try {
    await message.delete();
    await guild.members.ban(userId, {
      reason: 'Typed in #honey.'
    });
    console.log(`Banned ${message.author.tag}`);

    setTimeout(async () => {
      try {
        await guild.bans.remove(userId);
        console.log(`Unbanned ${userId} after ${BAN_DURATION_MINUTES} minutes`);
      } catch (err) {
        console.error('Could not unban:', err);
      }
    }, BAN_DURATION_MINUTES * 60 * 1000);

  } catch (err) {
    console.error('Could not ban:', err);
  }
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.TOKEN);
