import { REST, Routes } from 'discord.js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname } from 'path';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));  // for file-resolution (windows-friendly)

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const testServerId = process.env.TEST_SERVER_ID; // Optional, for testing in a specific server

if (!token || !clientId) {
  throw new Error('Missing DISCORD_TOKEN or CLIENT_ID in environment variables.');
}

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const fileUrl = pathToFileURL(filePath).href;
  const command = await import(fileUrl);

  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON());
  } else {
    console.warn(`The command at ${filePath} is missing "data" or "execute".`);
  }
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Registering slash commands...');

    /*
    // Global Command Registration, takes 1 hour to refresh with discord
    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands }
    );
    */

    if (testServerId) {
      await rest.put(
        Routes.applicationGuildCommands(clientId, testServerId),
        { body: commands }
      );
      console.log(`Slash commands registered to test server: ${testServerId}`);
    } else {
      await rest.put(
        Routes.applicationCommands(clientId),
        { body: commands }
      );
      console.log('Slash commands registered globally (may take up to 1 hour to appear).');
    }

  } catch (error) {
    console.error(error);
  }
})();