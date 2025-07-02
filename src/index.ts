import * as Discord from 'discord.js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname } from 'path';

import type { Interaction } from 'discord.js';

dotenv.config();

const { Client, Collection, GatewayIntentBits } = Discord;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// extend client to include commands collection
interface Command {
  data: {
    name: string;
    description: string;
    [key: string]: any;
  };
  execute: (interaction: Interaction) => Promise<void>;
}

(client as any).commands = new Collection<string, Command>();

// dynamically load commands from the /commands directory
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const fileUrl = pathToFileURL(filePath).href;
  import(fileUrl).then((commandModule) => {
    if ('data' in commandModule && 'execute' in commandModule) {
      (client as any).commands.set(commandModule.data.name, commandModule);
      console.log(`Loaded command: ${commandModule.data.name}`);
    } else {
      console.warn(`The command at ${filePath} is missing "data" or "execute".`);
    }
  });
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

// handle interactions
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = (client as any).commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Error executing ${interaction.commandName}`, error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'There was an error executing that command.',
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: 'There was an error executing that command.',
        ephemeral: true,
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);