'use strict';
/**
 * Module dependencies.
 */
const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const client = new Discord.Client();
/** Core class of the module. */
class MusicBot {
	/**
	 * DiscordToken attributes are mandatory.
	 *
	 * @param {Object} options
	 */
	constructor(options) {
		if (!options || !options.Token ) {
			throw new Error('Erro: Por favor bote o token ou vai dar erro!');
		}
		this.Token = options.Token;
		this.prefix = options.prefix || '?';
		this.queue = new Map();
		this.setup_();
	}
	/**
	 * Starts bot.
	 *
	 * @api public
	 */
	start() {
		this.client.login(this.Token);
	}
	/**
	 * Setup bot.
	 *
	 * @api private
	 */
	setup_() {
		
		this.client = new Discord.Client();
		this.client.commands = new Discord.Collection();
              
		const commandFiles = fs.readdirSync(path.join(__dirname, '/commands')).filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const command = require(`./commands/${file}`);
			this.client.commands.set(command.name, command);
		}
		this.client.once('ready', () => {
			console.log('Bot online!');
			console.log('---------------------------------------')
			console.log('by Guilherme Duarte Fonseca')
          		console.log('youtube: https://www.youtube.com/channel/UCHsDj4zK86cnUVXJ8YS9nyw')
			console.log('---------------------------------------')

    
			this.client.user.setActivity(`${this.prefix}help`);
		});
		this.client.on('message', message => {
			if (message.author.bot || !message.content.startsWith(this.prefix)) {
				return;
			}
			const args = message.content.slice(this.prefix.length).split(/ +/);
			const command = args.shift().toLowerCase();
			const arg = args.join(' ');
			if (!this.client.commands.has(command)) {
				return;
			}
			try {
				this.client.commands.get(command).execute(client, message, arg, this);
			} catch (error) {
				console.error(error);
			}
		});
	}
}
/**
 * Module exports.
 */
module.exports = Bot.index;
