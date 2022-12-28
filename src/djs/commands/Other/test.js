const { SlashCommandBuilder } = require("@discordjs/builders");
const message = `The Command Works!`;
const commandName = "test";
const commandDescription = "Test command";

// FUNCTION TEST STATION Config.
// Currently testing the cLog() function
// Make Sure To change BOTH funcName AND the Import to the relevant function being tested
let funcName = 'cLog()';
const { cLog } = require('../../functions/scripts/scripts.js');

// making the funcName bold in the success and fail messages
funcName = `**${funcName}**`;
module.exports = {
  data: new SlashCommandBuilder()
    .setName(`${commandName}`)
    .setDescription(`${commandDescription}}`),
  async execute(interaction) {

    // Success and Fail Messages
    // Change the content into embeds
    const success = {
      content: `✅ The Command Works! - Tested Function: ${funcName} ✅`,
      ephemeral: true,
    }
    const fail = {
      content: `❌ The Command Failed! - Tested Function: ${funcName} ❌`,
      ephemeral: true,
    }
    

    // Test Station
    // What are we testing?
    // cLog function
    try {
      cLog("Testing!!!");
      await interaction.reply(success);
      console.log(`Test Command Successfully Executed: ✅\n- Tested Function: ${funcName}`);
    } catch (error) {
      await interaction.reply(fail);
      console.log(`Test Command Failed to Execute: ❌\n- Tested Function: ${funcName}\nERROR:`, error);
    }  


    console.log(`Test Command Complete: ✅`);
  }
};


// Embed Object for createEmbed() function parameter
const embedObj = {
  title: 'Title',
  /*
   * { description } Type: String
   * The description of the embed
   */
  description: 'Description',
  /*
   * { color } Type: String
   * The color of the embed, represented as a hex code
   */
  color: '#FF0000',
  /*
   * { footer } Type: Object
   * An object containing the text and icon for the footer of the embed
   * - { text } Type: String
   *   The text for the footer
   * - { iconURL } Type: String
   *   The URL for the icon to display in the footer
   */
  footer: {
      // string: the text for the footer
      text: 'Footer text',
      // string: the URL for the icon to display in the footer
      iconURL: 'https://example.com/image.png'
  },
  /*
   * { thumbnail } Type: String
   * The URL for the thumbnail image to display in the embed
   */
  thumbnail: 'https://example.com/image.png',
  /*
   * { image } Type: String
   * The URL for the main image to display in the embed
   */
  image: 'https://example.com/image.png',
  /*
   * { author } Type: Object
   * An object containing information about the author of the embed
   * - { name } Type: String
   *   The name of the author
   * - { iconURL } Type: String
   *   The URL for the icon to display next to the author's name
   * - { url } Type: String
   *   The URL for the author's name to link to
   */
  author: {
      // string: the name of the author
      name: 'Author name',
      // string: the URL for the icon to display next to the author's name
      iconURL: 'https://example.com/image.png',
      // string: the URL for the author's name to link to
      url: 'https://example.com'
  },
  /*
   * { fields } Type: Array
   * An array of objects representing the fields to display in the embed
   * - { name } Type: String
   *   The name of the field
   * - { value } Type: String
   *   The value of the field
   * - { inline } Type: Boolean
   *   Whether the field should be displayed inline with other fields (true) or on a new line (false)
   */
  fields: [
      // object: a field to display in the embed
      {
          // string: the name of the field
          name: 'Field 1',
          // string: the value of the field
          value: 'Field 1 value',
          // boolean: whether the field should be displayed inline with other fields (true) or on a new line (false)
          inline: true
      },
      // object: a field to display in the embed
      {
          // string: the name of the field
          name: 'Field 2',
          // string: the value of the field
          value: 'Field 2 value',
          // boolean: whether the field should be displayed inline with other fields (true) or on a new line (false)
          inline: true
      },
      /// ... more fields ... [ up to 5 ]
  ]
}
