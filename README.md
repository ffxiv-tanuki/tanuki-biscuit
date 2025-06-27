# tanuki-biscuit


## Discord Bots vs. Apps

| Feature                        | **Bot**                                                 | **App**                                                                                          |
| ------------------------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Definition**                 | Program that connects via a bot token to automate tasks | The entire container for bots, slash commands, interactions                                      |
| **Technical Identity**         | Specific user with a bot token & permissions            | Registered entity in the [Discord Developer Portal](https://discord.com/developers/applications) |
| **Components**                 | Message handling, events, commands                      | Encompasses bots, slash commands, buttons, modals, webhooks                                      |
| **Slash Commands**             | Originally optional for bots, now standard              | Apps define slash commands globally or per guild                                                 |
| **Interactions API**           | Handled by bots that are part of apps                   | Apps own interactions like buttons, selects, modals                                              |
| **OAuth2 Scopes**              | `bot` scope gives you a bot in servers                  | `applications.commands` registers slash commands                                                 |
| **Monetization / Marketplace** | Bots can be listed in public marketplaces               | Apps themselves are the listing unit (includes bots)                                             |
| **User Perception**            | Bots are seen as the thing talking in chat              | Apps are seen in OAuth screens, settings, dev portal                                             |
