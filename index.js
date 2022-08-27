// Declare constants which will be used throughout the bot.

const fs = require("fs");
const { Client, Collection, Intents, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

const { token, client_id, test_guild_id } = require("./config.js");

/**
 * From v13, specifying the intents is compulsory.
 * @type {import('./typings').Client}
 * @description Main Application Client */

// @ts-ignore
const client = new Client({


  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER'],
	// Please add all intents you need, more detailed information @ https://ziad87.net/intents/
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
});

client.on("warn", console.log).on("debug", console.log)

client.on("ready", async () => {
  const kaisenServer = client.guilds.cache.get('846149377180696657')
  await kaisenServer.members.fetch())
  console.log(`Ready! Logged in as ${client.user.tag}`);
    let statuses = [{
    text: 'the culling game',
    type: 'COMPETING'
  }, {
    text: 'Jujutsu Kaisen S1',
    type: 'WATCHING'
  }, {
    text: 'Jujutsu Kaisen 0',
    type: 'WATCHING'
  }]
  let index = 0
  setInterval(() => {
    if (index === statuses.length) index = 0;
    let status = statuses[index]
    client.user.setActivity(status.text, {
    type: status.type,
    })
    index++
  }, 10000)
})

client.on("interactionCreate", async (interaction) => {
  let guild = client.guilds.cache.get('846149377180696657')
  let intmember = guild.members.cache.get(interaction.user.id)
  if (interaction.isButton()) {
    if (interaction.customId === 'switchacc') {
	let accNum = 0
	if (interaction.channel.topic == '1') {
		interaction.channel.setTopic('2')
		accNum = 2
	} else {
		interaction.channel.setTopic('1')
		accNum = 1
	}
	const messageUpdateChan = interaction.channel
	interaction.update({
		embeds: [new MessageEmbed().setTitle("Bot Panel").setDescription(`> **Bot Is Currently On: Account ${accNum}**`).setColor('#ff6568')]
	})
    	messageUpdateChan.send({ content: "✅ **Message Updated**", reply: { messageReference: interaction.message.id } })
    }
    comps = [new MessageActionRow().addComponents([
          new MessageButton()
            .setLabel('What can I do at Kaisen?').setStyle('PRIMARY')
            .setCustomId('q1'),
          new MessageButton()
            .setLabel('I want to ask a mod about something.')
            .setStyle('PRIMARY')
            .setCustomId('q2')
          ]
        ), new MessageActionRow().addComponents(
          new MessageButton()
            .setLabel('Alright!')
            .setStyle('SUCCESS')
            .setCustomId('alright')
        )]
    if (interaction.customId === 'hi') {
      
      interaction.deferUpdate()
      interaction.channel.send({
        embeds: [new MessageEmbed().setDescription('Here at Kaisen, we’re continuously trying to provide you the best experience we can, so here\'s a little guide to get you going!').setColor('#ee3d54')],
        components: comps
      })}
      if (interaction.customId === 'q1') {
          interaction.update({
            embeds: [new MessageEmbed().setTitle('What you can do at Kaisen').setDescription(`<:KAISENheart3:920478647004053564> You can chat and have fun & basically chill in <#846149377180696660> or <#848671799897358366> if you want to talk in another language besides \`english\`. 

<:KAISENheart3:920478647004053564> You can study in <#846693639061372928> and join the study VC to help others & get help and simply have a good time studying.

<:KAISENheart3:920478647004053564> You can head to the __ARCADE__ category and play with some bots & have fun.

<:KAISENheart3:920478647004053564> You can head to __Boutique__ category to collect money & work and gamble with it.

<:KAISENheart3:920478647004053564> You can talk or listen to music in our VCs. 

<:KAISENheart3:920478647004053564> You can talk about anime & manga in <#846696090534150144>, leave spoilers for the <#846696110936555600> channel though!

<:KAISENheart3:920478647004053564> You can talk about games, find someone to play with or talk about e-sports in <#846696233913679892>.

<:KAISENheart3:920478647004053564> You can share your beautiful food, art and pets in their respective channels <#846699923855638587> <#846699859650281472> <#846699905623130112>.

<:KAISENheart3:920478647004053564> You can vent and watch your message disappear with your worries at <#847124415997411398>.

<:KAISENheart3:920478647004053564> Spread positivity at <#846698755536191498> & Give advice at <#846698730917068800>.

<:KAISENheart3:920478647004053564> You can share your memes or anything you find funny at <#846696065902182400>.

<:KAISENheart3:920478647004053564> You can participate in a lot of events we make such as anime trivia, movie nights, skribbl.io games and many more at <#848708166321831966>.`).setColor('#ee3d54')],
            components: comps
          })}
      if (interaction.customId === 'q2') {
          interaction.update({
            embeds: [new MessageEmbed().setTitle('I want to ask a mod about something').setDescription('Please check <#846153719351083009> to see if your question is there, if it’s not then you can open a ticket in <#846708484283301929> !').setColor('#ee3d54')],
            components: comps
          })}
      if (interaction.customId === 'alright') {
          interaction.deferUpdate()
          interaction.channel.send({
            embeds: [new MessageEmbed().setTitle('').setDescription('Alright, now I want to get to know you better! Please select your pronouns, region, and dm status.').setColor('#ee3d54')]
          })
          interaction.channel.send({
            embeds: [new MessageEmbed().setDescription('Please select your pronouns:').setColor('#ee3d54')],
            components: [new MessageActionRow().addComponents(
              new MessageButton()
                .setLabel('She/Her')
                .setStyle('PRIMARY')
                .setCustomId('she'),
              new MessageButton()
                .setLabel('He/Him')
                .setStyle('PRIMARY')
                .setCustomId('he'),
              new MessageButton()
                .setLabel('They/Them')
                .setStyle('PRIMARY')
                .setCustomId('they')
            ), new MessageActionRow().addComponents(
              new MessageButton()
                .setLabel('Continue')
                .setStyle('SUCCESS')
                .setCustomId('pronoun_continue')
            )]
          })}
        if (interaction.customId === 'she') {
              interaction.deferUpdate()
              const she = guild.roles.cache.get('846704958472060989')
              intmember.roles.add(she)
              interaction.channel.send({
                content: 'Added the **She/Her** role'
              })}
        if (interaction.customId === 'he') {
              interaction.deferUpdate()
              const he = guild.roles.cache.get('846697984656932895')
              intmember.roles.add(he)
              interaction.channel.send({
                content: 'Added the **He/Him** role'
              })
        }
        if (interaction.customId === 'they') {
              interaction.deferUpdate()
              const they = guild.roles.cache.get('847188300363464714')
              intmember.roles.add(they)
              interaction.channel.send({
                content: 'Added the **They/Them** role'
              })
        }
        if (interaction.customId === 'pronoun_continue') {
              interaction.deferUpdate()
              interaction.channel.send({
                embeds: [new MessageEmbed().setDescription('Please select your region:').setColor('#ee3d54')],
                components: [new MessageActionRow().addComponents(
                  new MessageButton()
                    .setLabel('Asia')
                    .setStyle('PRIMARY')
                    .setCustomId('asia'),
                  new MessageButton()
                    .setLabel('Europe')
                    .setStyle('PRIMARY')
                    .setCustomId('europe'),
                  new MessageButton()
                    .setLabel('Africa')
                    .setStyle('PRIMARY')
                    .setCustomId('africa')
                ), new MessageActionRow().addComponents(
                  new MessageButton()
                    .setLabel('North America')
                    .setStyle('PRIMARY')
                    .setCustomId('na'),
                  new MessageButton()
                    .setLabel('South America')
                    .setStyle('PRIMARY')
                    .setCustomId('sa'),
                  new MessageButton()
                    .setLabel('Oceania')
                    .setStyle('PRIMARY')
                    .setCustomId('oceania')
                ), new MessageActionRow().addComponents(
                  new MessageButton().setLabel('Continue').setStyle('SUCCESS').setCustomId('region_continue')
                )]
              })
            }
            if (interaction.customId === 'asia') {
              interaction.deferUpdate()
              const they = guild.roles.cache.get('848290072629739560')
              intmember.roles.add(they)
              interaction.channel.send({
                content: 'Added the **Asia** role'
              })
            }
            if (interaction.customId === 'europe') {
              interaction.deferUpdate()
              const they = guild.roles.cache.get('848289831557005343')
              intmember.roles.add(they)
              interaction.channel.send({
                content: 'Added the **Europe** role'
              })
            }
            if (interaction.customId === 'africa') {
              interaction.deferUpdate()
              const they = guild.roles.cache.get('848290091197923368')
              intmember.roles.add(they)
              interaction.channel.send({
                content: 'Added the **Africa** role'
              })
            }
            if (interaction.customId === 'na') {
              interaction.deferUpdate()
              const they = guild.roles.cache.get('848289960503148555')
              intmember.roles.add(they)
              interaction.channel.send({
                content: 'Added the **North America** role'
              })
            }
            if (interaction.customId === 'sa') {
              interaction.deferUpdate()
              const they = guild.roles.cache.get('848288698055655495')
              intmember.roles.add(they)
              interaction.channel.send({
                content: 'Added the **South America** role'
              })
            }
            if (interaction.customId === 'oceania') {
              interaction.deferUpdate()
              const they = guild.roles.cache.get('848290107840790548')
              intmember.roles.add(they)
              interaction.channel.send({
                content: 'Added the **Oceania** role'
              })
            }
            if (interaction.customId === 'region_continue') {
              interaction.deferUpdate()
              interaction.channel.send({
                embeds: [new MessageEmbed().setDescription('Please select your DM status:').setColor('#ee3d54')],
                components: [new MessageActionRow().addComponents(
                  new MessageButton()
                    .setLabel('Open')
                    .setStyle('PRIMARY')
                    .setCustomId('open'),
                  new MessageButton()
                    .setLabel('Closed')
                    .setStyle('PRIMARY')
                    .setCustomId('closed'),
                  new MessageButton()
                    .setLabel('Ask to DM')
                    .setStyle('PRIMARY')
                    .setCustomId('ask'),
                ), new MessageActionRow().addComponents(
                  new MessageButton().setLabel('Continue').setStyle('SUCCESS').setCustomId('dm_continue')
                )]
              })
            }
            if (interaction.customId === 'open') {
              interaction.deferUpdate()
              const they = guild.roles.cache.get('852973536536297542')
              intmember.roles.add(they)
              interaction.channel.send({
                content: 'Added the **DMs Open** role'
              })
            }
            if (interaction.customId === 'closed') {
              interaction.deferUpdate()
              const they = guild.roles.cache.get('852973605264556053')
              intmember.roles.add(they)
              interaction.channel.send({
                content: 'Added the **DMs Closed** role'
              })
            }
            if (interaction.customId === 'ask') {
              interaction.deferUpdate()
              const they = guild.roles.cache.get('862540436128399370')
              intmember.roles.add(they)
              interaction.channel.send({
                content: 'Added the **Ask to DM** role'
              })
            }
            if (interaction.customId === 'dm_continue') {
              interaction.deferUpdate()
              interaction.channel.send({
                embeds: [new MessageEmbed().setTitle('Role Selection Complete').setDescription('Thank you! Remember you can always add or remove any of these roles in <#846700402430181386>').setColor('#ee3d54')],
                components: [new MessageActionRow().addComponents(
                  new MessageButton()
                    .setLabel('Alright, I\'m Done')
                    .setStyle('SUCCESS')
                    .setCustomId('done')
                )]
              })
            }
            if (interaction.customId === 'done') {
              interaction.deferUpdate()
              const mero = guild.roles.cache.get('846503022682964001')
              intmember.roles.add(mero)
              interaction.channel.send({
                content: 'Have Fun!'
              })
              let chanee = guild.channels.cache.get('903770449740181554')
              chanee.permissionOverwrites.delete(intmember.id)
            }
            if (interaction.customId === 'dmsopened') {
              let is;
              const blah = await interaction.member.send({ content: "\n" }).catch(err => { 
              is = err.code === 50007 ? true : false
              })
              if (is) {
                  await interaction.reply({
                    content: 'Please open your DMs and try again.',
                    ephemeral: true
                  })
              } else {
                interaction.deferUpdate()
                interaction.member.send({
                  embeds: [new MessageEmbed().setDescription('Hi, I\'m Yuuji, welcome to Kaisen!').setColor('#ee3d54')],
                  components: [new MessageActionRow().addComponents(
                    new MessageButton()
                    .setLabel('Hi!')
                    .setStyle('PRIMARY')
                    .setCustomId('hi')
                    )]
                  })
              }
            }

          }
})

client.on("messageCreate", async (message) => {
  if (message.content === "k!bot") {
	const hasOwnerRole = (member) => {
		if (member.roles.cache.find(x => x.id === "846150312188444742")) {
			return true
		} else {
			return false
		}
  	}  
  	if (message.author.id === '648660848868589599' || hasRole(message.member)) {
		message.channel.send({
			embeds: [new MessageEmbed().setTitle("Bot Panel").setDescription(`> **Bot Is Currently On: Account ${message.channel.topic}**`).setColor('#ff6568')],
			components: [new MessageActionRow().addComponents(new MessageButton().setLabel('Switch Accounts').setStyle('PRIMARY').setCustomId('switchacc'), new MessageButton().setLabel('Heroku').setStyle('LINK').setURL('https://dashboard.heroku.com/'), new MessageButton().setLabel('Github').setStyle('LINK').setURL('https://github.com/'))]
		})
	}
  }
  if (message.content.startsWith('k!eval')) {
    if (message.author.id === '648660848868589599') {
      const argseee = message.content.split(' ');
      const commandeee = argseee.shift().toLowerCase();
      await eval(argseee.join(' '))
    }
  }
  if (message.content.startsWith('dothemessagepls')) {
    message.channel.send({
      embeds: [new MessageEmbed()
               .setImage("https://media.discordapp.net/attachments/847284732953100338/1003157996580388924/DFA4B7DC-1D15-46BE-9F6A-AA2BA0D5D3DD.png")
                .setColor("#ff6568"),
              new MessageEmbed()
                .setColor('#ff6568')
                .setDescription("**Welcome to our community**, we’re so glad you joined! We hope you can feel happy & comfortable at Kaisen! <:MiwaLove:948621000193507338>\n\n**Click the button below to gain access to the rest of the server!**\n`note:` *please remember to keep your direct messages open, as Yuuji will be dm’ing you asking for your pronouns and such to give you roles!*")
              .setFooter({
                text: "Kaisen",
                iconURL: "https://media.discordapp.net/attachments/847284732953100338/1002662033663205416/image1.png"
              })],
      components: [new MessageActionRow().addComponents(
        new MessageButton().setLabel("Let's go!").setCustomId('dmsopened').setStyle('SUCCESS')
      )]
    })
  }
  // MAIN THREE PACK
  if (message.content.startsWith('k!packreroll main three')) {
    if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.roles.cache.find(x => x.id == "1002625240247042188")) {
      message.channel.send({ content: 'You need admin permissions to use this command' })
    } else {
    let member = message.mentions.members.first()
    if (!member) { message.channel.send({ content: 'Mention someone' }) } else {
    if (member.roles.cache.find(x => x.id == '846512728599298058') && member.roles.cache.find(x => x.id == '846512895213961236') && member.roles.cache.find(x => x.id == '846513631603982336')) { message.channel.send({ content: 'They already have all of the roles in that pack!' }) } else {
      let role
      let chance = (Math.floor(Math.random() * 100) + 1)
      let option
      if (chance <= 33) {
        option = '846512728599298058'
      } else if (chance > 33 && chance <= 66) {
        option = '846512895213961236'
      } else if (chance > 66) {
        option = '846513631603982336'
      }
      role = option

      while (member.roles.cache.find(x => x.id == role)) {
        let chance = (Math.floor(Math.random() * 100) + 1)
      let option
      if (chance <= 33) {
        option = '846512728599298058'
      } else if (chance > 33 && chance <= 66) {
        option = '846512895213961236'
      } else if (chance > 66) {
        option = '846513631603982336'
      }
      role = option
      }
      message.channel.send({ content: `Congratulations ${member.user.username}, you got <@&${message.guild.roles.cache.find(x => x.id == role).id}>` })
      member.roles.add(message.guild.roles.cache.find(x => x.id == role))
    }
    }
      if (message.member.roles.cache.find(x => x.id == "1002625240247042188")) {
        message.member.roles.remove(member.roles.cache.find(x => x.id == "1002625240247042188"))
      }
    }
  }
  // MAIN THREE PACK

  // TITLES PACK
  if (message.content.startsWith('k!packreroll titles')) {
    if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.roles.cache.find(x => x.id == "1002625240247042188")) {
      message.channel.send({ content: 'You need admin permissions to use this command' })
    } else {
    let member = message.mentions.members.first()
    if (!member) { message.channel.send({ content: 'Mention someone' }) } else {
    if (member.roles.cache.find(x => x.name == '黒閃 | Black Flash Record Holder') && member.roles.cache.find(x => x.name == '呪いの王 | King of the Curses') && member.roles.cache.find(x => x.name == "スクナの器 | Sukuna's Vessel") && member.roles.cache.find(x => x.name == '術師殺し | Sorcerer Killer') && member.roles.cache.find(x => x.name == '最強の呪術師 | The Strongest Sorcerer') && member.roles.cache.find(x => x.name == '十種影法術 | Ten Shadows User') && member.roles.cache.find(x => x.name == '呪胎九相図 | Womb: Death Painting') && member.roles.cache.find(x => x.name == '体術 | Taijutsu Master') && member.roles.cache.find(x => x.name == '絶大呪力 | Immense Cursed Energy')) { message.channel.send({ content: 'They already have all of the roles in that pack!' }) } else {
      let role
      let chance = (Math.floor(Math.random() * 100) + 1)
      let option
      if (chance <= 2) {
        option = '黒閃 | Black Flash Record Holder'
      } else if (chance > 2 && chance <= 4) {
        option = '呪いの王 | King of the Curses'
      } else if (chance > 4 && chance <= 6) {
        option = "スクナの器 | Sukuna's Vessel"
      } else if (chance > 6 && chance <= 8) {
        option = '術師殺し | Sorcerer Killer'
      } else if (chance > 8 && chance <= 10) {
        option = '最強の呪術師 | The Strongest Sorcerer'
      } else if (chance > 10 && chance <= 22) {
        option = '十種影法術 | Ten Shadows User'
      } else if (chance > 22 && chance <= 34) {
        option = '呪胎九相図 | Womb: Death Painting'
      } else if (chance > 34 && chance <= 67) {
        option = '体術 | Taijutsu Master'
      } else if (chance > 67) {
        option = '絶大呪力 | Immense Cursed Energy'
      }
      role = option

      while (member.roles.cache.find(x => x.name == role)) {
        let chance = (Math.floor(Math.random() * 100) + 1)
      let option
      if (chance <= 2) {
        option = '黒閃 | Black Flash Record Holder'
      } else if (chance > 2 && chance <= 4) {
        option = '呪いの王 | King of the Curses'
      } else if (chance > 4 && chance <= 6) {
        option = "スクナの器 | Sukuna's Vessel"
      } else if (chance > 6 && chance <= 8) {
        option = '術師殺し | Sorcerer Killer'
      } else if (chance > 8 && chance <= 10) {
        option = '最強の呪術師 | The Strongest Sorcerer'
      } else if (chance > 10 && chance <= 22) {
        option = '十種影法術 | Ten Shadows User'
      } else if (chance > 22 && chance <= 34) {
        option = '呪胎九相図 | Womb: Death Painting'
      } else if (chance > 34 && chance <= 67) {
        option = '体術 | Taijutsu Master'
      } else if (chance > 67) {
        option = '絶大呪力 | Immense Cursed Energy'
      }
      role = option
      }
      message.channel.send({ content: `Congratulations ${member.user.username}, you got <@&${message.guild.roles.cache.find(x => x.name == role).id}>` })
      member.roles.add(message.guild.roles.cache.find(x => x.name == role))
    }
    }
      if (message.member.roles.cache.find(x => x.id == "1002625240247042188")) {
        message.member.roles.remove(member.roles.cache.find(x => x.id == "1002625240247042188"))
      }
    }
  }

  if (message.content.startsWith('k!packreroll jj tech')) {
    if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.roles.cache.find(x => x.id == "1002625240247042188")) {
      message.channel.send({ content: 'You need admin permissions to use this command' })
    } else {
    let member = message.mentions.members.first()
    if (!member) { message.channel.send({ content: 'Mention someone' }) } else {
    if (member.roles.cache.find(x => x.id == '846518499324592179') && member.roles.cache.find(x => x.id == '846515680017645578') && member.roles.cache.find(x => x.id == "846516519097729055") && member.roles.cache.find(x => x.id == '849827789997867058') && member.roles.cache.find(x => x.id == '850158770247696425') && member.roles.cache.find(x => x.id == '850159238771638315') && member.roles.cache.find(x => x.id == '850159976089124897') && member.roles.cache.find(x => x.id == '850159553956806726') && member.roles.cache.find(x => x.id == '850159194543620097')) { message.channel.send({ content: 'They already have all of the roles in that pack!' }) } else {
      let role
      let chance = (Math.floor(Math.random() * 100) + 1)
      let option
      if (chance <= 4) {
        option = '846518499324592179'
      } else if (chance > 4 && chance <= 10) {
        option = '846515680017645578'
      } else if (chance > 10 && chance <= 16) {
        option = '846516519097729055'
      } else if (chance > 16 && chance <= 22) {
        option = '849827789997867058'
      } else if (chance > 22 && chance <= 34) {
        option = '850158770247696425'
      } else if (chance > 34 && chance <= 46) {
        option = '850159238771638315'
      } else if (chance > 46 && chance <= 58) {
        option = '850159976089124897'
      } else if (chance > 58 && chance <= 79) {
        option = '850159553956806726'
      } else if (chance > 79) {
        option = '850159194543620097'
      }
      role = option

      while (member.roles.cache.find(x => x.id == role)) {
        let chance = (Math.floor(Math.random() * 100) + 1)
      let option
      if (chance <= 4) {
        option = '846518499324592179'
      } else if (chance > 4 && chance <= 10) {
        option = '846515680017645578'
      } else if (chance > 10 && chance <= 16) {
        option = '846516519097729055'
      } else if (chance > 16 && chance <= 22) {
        option = '849827789997867058'
      } else if (chance > 22 && chance <= 34) {
        option = '850158770247696425'
      } else if (chance > 34 && chance <= 46) {
        option = '850159238771638315'
      } else if (chance > 46 && chance <= 58) {
        option = '850159976089124897'
      } else if (chance > 58 && chance <= 79) {
        option = '850159553956806726'
      } else if (chance > 79) {
        option = '850159194543620097'
      }
      role = option
      }
      message.channel.send({ content: `Congratulations ${member.user.username}, you got <@&${message.guild.roles.cache.find(x => x.id == role).id}>` })
      member.roles.add(message.guild.roles.cache.find(x => x.id == role))
    }
    }
      if (message.member.roles.cache.find(x => x.id == "1002625240247042188")) {
        message.member.roles.remove(member.roles.cache.find(x => x.id == "1002625240247042188"))
      }
    }
  }

  if (message.content.startsWith('k!packreroll villains')) {
    if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.roles.cache.find(x => x.id == "1002625240247042188")) {
      message.channel.send({ content: 'You need admin permissions to use this command' })
    } else {
    let member = message.mentions.members.first()
    if (!member) { message.channel.send({ content: 'Mention someone' }) } else {
    if (member.roles.cache.find(x => x.id == '846514452287062056') && member.roles.cache.find(x => x.id == '846515427870113843') && member.roles.cache.find(x => x.id == "846516447748554803") && member.roles.cache.find(x => x.id == '846553185233272852') && member.roles.cache.find(x => x.id == '846514968437719041')) { message.channel.send({ content: 'They already have all of the roles in that pack!' }) } else {
      let role
      let chance = (Math.floor(Math.random() * 100) + 1)
      let option
      if (chance <= 4) {
        option = '846514452287062056'
      } else if (chance > 4 && chance <= 28) {
        option = '846515427870113843'
      } else if (chance > 28 && chance <= 52) {
        option = '846516447748554803'
      } else if (chance > 52 && chance <= 76) {
        option = '846553185233272852'
      } else if (chance > 76) {
        option = '846514968437719041'
      }
      role = option

      while (member.roles.cache.find(x => x.id == role)) {
        let chance = (Math.floor(Math.random() * 100) + 1)
      let option
      if (chance <= 4) {
        option = '846514452287062056'
      } else if (chance > 4 && chance <= 28) {
        option = '846515427870113843'
      } else if (chance > 28 && chance <= 52) {
        option = '846516447748554803'
      } else if (chance > 52 && chance <= 76) {
        option = '846553185233272852'
      } else if (chance > 76) {
        option = '846514968437719041'
      }
      role = option
      }
      message.channel.send({ content: `Congratulations ${member.user.username}, you got <@&${message.guild.roles.cache.find(x => x.id == role).id}>` })
      member.roles.add(message.guild.roles.cache.find(x => x.id == role))
    }
    }
      if (message.member.roles.cache.find(x => x.id == "1002625240247042188")) {
        message.member.roles.remove(member.roles.cache.find(x => x.id == "1002625240247042188"))
      }
    }
  }

  if (message.content.startsWith('k!packreroll riceball ingredients')) {
    if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.roles.cache.find(x => x.id == "1002625240247042188")) {
      message.channel.send({ content: 'You need admin permissions to use this command' })
    } else {
    let member = message.mentions.members.first()
    if (!member) { message.channel.send({ content: 'Mention someone' }) } else {
    if (member.roles.cache.find(x => x.name == 'Salmon') && member.roles.cache.find(x => x.name == 'Mentaiko') && member.roles.cache.find(x => x.name == "Roe") && member.roles.cache.find(x => x.name == 'Tuna') && member.roles.cache.find(x => x.name == 'Bonito Flakes') && member.roles.cache.find(x => x.name == 'Tuna Mayo') && member.roles.cache.find(x => x.name == 'Mustard Leaf') && member.roles.cache.find(x => x.name == 'Seaweed') && member.roles.cache.find(x => x.name == 'Caviar')) { message.channel.send({ content: 'They already have all of the roles in that pack!' }) } else {
      let role
      let chance = (Math.floor(Math.random() * 100) + 1)
      let option
      if (chance != 1) {
      if (chance <= 11) {
        option = 'Salmon'
      } else if (chance > 11 && chance <= 22) {
        option = 'Mentaiko'
      } else if (chance > 22 && chance <= 33) {
        option = 'Roe'
      } else if (chance > 33 && chance <= 44) {
        option = 'Tuna'
      } else if (chance > 44 && chance <= 55) {
        option = 'Bonito Flakes'
      } else if (chance > 55 && chance <= 66) {
        option = 'Tuna Mayo'
      } else if (chance > 66 && chance <= 77) {
        option = 'Mustard Leaf'
      } else if (chance > 77 && chance <= 88) {
        option = 'Seaweed'
      } else if (chance > 88 && chance <= 99) {
        option = 'Caviar'
      }
      role = option

      while (member.roles.cache.find(x => x.name == role)) {
        let chance = (Math.floor(Math.random() * 100) + 1)
      let option
      if (chance <= 11) {
        option = 'Salmon'
      } else if (chance > 11 && chance <= 22) {
        option = 'Mentaiko'
      } else if (chance > 22 && chance <= 33) {
        option = 'Roe'
      } else if (chance > 33 && chance <= 44) {
        option = 'Tuna'
      } else if (chance > 44 && chance <= 55) {
        option = 'Bonito Flakes'
      } else if (chance > 55 && chance <= 66) {
        option = 'Tuna Mayo'
      } else if (chance > 66 && chance <= 77) {
        option = 'Mustard Leaf'
      } else if (chance > 77 && chance <= 88) {
        option = 'Seaweed'
      } else if (chance > 88 && chance <= 99) {
        option = 'Caviar'
      }
      role = option
      }
      message.channel.send({ content: `Congratulations ${member.user.username}, you got <@&${message.guild.roles.cache.find(x => x.name == role).id}>` })
      member.roles.add(message.guild.roles.cache.find(x => x.name == role))
    } else { message.channel.send({ content: `Congratulations, you won an extra reroll!` })}
    }
    }
      if (message.member.roles.cache.find(x => x.id == "1002625240247042188")) {
        message.member.roles.remove(member.roles.cache.find(x => x.id == "1002625240247042188"))
      }
    }
  }

  if (message.content.startsWith('k!packreroll side characters')) {
    if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.roles.cache.find(x => x.id == "1002625240247042188")) {
      message.channel.send({ content: 'You need admin permissions to use this command' })
    } else {
    let member = message.mentions.members.first()
    if (!member) { message.channel.send({ content: 'Mention someone' }) } else {
    if (member.roles.cache.find(x => x.id == '846517467270086668') && member.roles.cache.find(x => x.id == '846518637069991957') && member.roles.cache.find(x => x.id == "850160219949367306") && member.roles.cache.find(x => x.id == '846516868193845249') && member.roles.cache.find(x => x.id == '846553703309901835')) { message.channel.send({ content: 'They already have all of the roles in that pack!' }) } else {
      let role
      let chance = (Math.floor(Math.random() * 100) + 1)
      let option
      if (chance <= 1) {
        option = '846517467270086668'
      } else if (chance > 1 && chance <= 11) {
        option = '846518637069991957'
      } else if (chance > 11 && chance <= 36) {
        option = '850160219949367306'
      } else if (chance > 36 && chance <= 61) {
        option = '846516868193845249'
      } else if (chance > 61) {
        option = '846553703309901835'
      }
      role = option

      while (member.roles.cache.find(x => x.id == role)) {
        let chance = (Math.floor(Math.random() * 100) + 1)
      let option
      if (chance <= 1) {
        option = '846517467270086668'
      } else if (chance > 1 && chance <= 11) {
        option = '846518637069991957'
      } else if (chance > 11 && chance <= 36) {
        option = '850160219949367306'
      } else if (chance > 36 && chance <= 61) {
        option = '846516868193845249'
      } else if (chance > 61) {
        option = '846553703309901835'
      }
      role = option
      }
      message.channel.send({ content: `Congratulations ${member.user.username}, you got <@&${message.guild.roles.cache.find(x => x.id == role).id}>` })
      member.roles.add(message.guild.roles.cache.find(x => x.id == role))
    }
    }
      if (message.member.roles.cache.find(x => x.id == "1002625240247042188")) {
        message.member.roles.remove(member.roles.cache.find(x => x.id == "1002625240247042188"))
      }
    }
  }
})

client.on("guildMemberUpdate", async (oldMember, newMember) => {
  const hasRole = (member) => {
  	if (member.roles.cache.find(x => x.id === "846503022682964001")) {
		return true
	} else {
		return false
	}
  }
  const oldHas = hasRole(oldMember)
  const newHas = hasRole(newMember)
  if (!oldHas && newHas) {
    try {
	const channel = client.channels.cache.get('897871534130090055')
	let messages = await channel.messages.fetch().then(messages => messages.filter(x => x.content == `${newMember.user.username}#${newMember.user.discriminator}`))
	let image = messages.first().attachments.first().url
	let embed = new MessageEmbed()
	  .setDescription(`**Welcome to Kaisen**, we hope you enjoy your time with us! <:EggYuuji:846830987295457310>\n\n ꕤ <#846520914094850070>\n\n ꕤ <#846520939772772392>\n\n ꕤ <#846153719351083009>\n\n ꕤ <#846700402430181386>\n\n ꕤ <#1001421106755936256> \n\n\n**ALSO! don’t forget to open your pack at <#1004888849903788032>!**`)
	  .setImage(image)
	  .setColor('#386DAE')
	  .setTitle(`Welcome, ${newMember.user.username}!`)
	const welc = client.channels.cache.get('906088560422166528')
	welc.send({ content: '<@&852975435704959025>', embeds: [embed] })
    } catch(err) {
        console.log(err)
    }
  }
})

client.on("guildMemberAdd", async (member) => {
  const channel = client.channels.cache.get('903770449740181554')
  channel.permissionOverwrites.create(member.user.id, {
    'VIEW_CHANNEL': true
  })
  const eemessage = await channel.send({
    content: `<@${member.user.id}>`
  })
  setTimeout(() => {
    eemessage.delete()
  }, 10000)
})

/**********************************************************************/
// Below we will be making an event handler!

/**
 * @description All event files of the event handler.
 * @type {String[]}
 */
/*
const eventFiles = fs
	.readdirSync("./events")
	.filter((file) => file.endsWith(".js"));

// Loop through all files and execute the event when it is actually emmited.
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(
			event.name,
			async (...args) => await event.execute(...args, client)
		);
	}
}
*/
/*

client.commands = new Collection();
client.slashCommands = new Collection();
client.buttonCommands = new Collection();
client.selectCommands = new Collection();
client.contextCommands = new Collection();
client.modalCommands = new Collection();
client.cooldowns = new Collection();
client.triggers = new Collection();


const commandFolders = fs.readdirSync("./commands");


for (const folder of commandFolders) {
	const commandFiles = fs
		.readdirSync(`./commands/${folder}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}


const slashCommands = fs.readdirSync("./interactions/slash");


for (const module of slashCommands) {
	const commandFiles = fs
		.readdirSync(`./interactions/slash/${module}`)
		.filter((file) => file.endsWith(".js"));

	for (const commandFile of commandFiles) {
		const command = require(`./interactions/slash/${module}/${commandFile}`);
		client.slashCommands.set(command.data.name, command);
	}
}

const contextMenus = fs.readdirSync("./interactions/context-menus");

for (const folder of contextMenus) {
	const files = fs
		.readdirSync(`./interactions/context-menus/${folder}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of files) {
		const menu = require(`./interactions/context-menus/${folder}/${file}`);
		const keyName = `${folder.toUpperCase()} ${menu.data.name}`;
		client.contextCommands.set(keyName, menu);
	}
}

const buttonCommands = fs.readdirSync("./interactions/buttons");

for (const module of buttonCommands) {
	const commandFiles = fs
		.readdirSync(`./interactions/buttons/${module}`)
		.filter((file) => file.endsWith(".js"));

	for (const commandFile of commandFiles) {
		const command = require(`./interactions/buttons/${module}/${commandFile}`);
		client.buttonCommands.set(command.id, command);
	}
}

const modalCommands = fs.readdirSync("./interactions/modals");

for (const module of modalCommands) {
	const commandFiles = fs
		.readdirSync(`./interactions/modals/${module}`)
		.filter((file) => file.endsWith(".js"));

	for (const commandFile of commandFiles) {
		const command = require(`./interactions/modals/${module}/${commandFile}`);
		client.modalCommands.set(command.id, command);
	}
}

const selectMenus = fs.readdirSync("./interactions/select-menus");

for (const module of selectMenus) {
	const commandFiles = fs
		.readdirSync(`./interactions/select-menus/${module}`)
		.filter((file) => file.endsWith(".js"));
	for (const commandFile of commandFiles) {
		const command = require(`./interactions/select-menus/${module}/${commandFile}`);
		client.selectCommands.set(command.id, command);
	}
}



//const rest = new REST({ version: "9" }).setToken(token);

const commandJsonData = [
	...Array.from(client.slashCommands.values()).map((c) => c.data),
	...Array.from(client.contextCommands.values()).map((c) => c.data),
];

(async () => {
	try {
		console.log("Started refreshing application (/) commands.");

		await rest.put(
	

			Routes.applicationGuildCommands(client_id, test_guild_id),



			// Routes.applicationGuildCommands(client_id)

			{ body: commandJsonData }
		);

		console.log("Successfully reloaded application (/) commands.");
	} catch (error) {
		console.error(error);
	}
})();

const triggerFolders = fs.readdirSync("./triggers");

for (const folder of triggerFolders) {
	const triggerFiles = fs
		.readdirSync(`./triggers/${folder}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of triggerFiles) {
		const trigger = require(`./triggers/${folder}/${file}`);
		client.triggers.set(trigger.name, trigger);
	}
}
*/

client.login(token);
