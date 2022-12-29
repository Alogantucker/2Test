// IMPORTS ...
const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
const scripts = require('../scripts/scripts.js');

//   // Example Modal Object that gets passed in below
//   let modalObj = {
//     customID: "newCustomModal",
//     title: "Create Your own CUSTOM Announcement",
//     rows: [
//     {
//         customID: "title",
//         label: "What is the title of the announcement?",
//         style: "TextInputStyle.Short",
//         placeholder: "Placeholder",
//         required: true
//     },
//     {
//         customID: "description",
//         label: "What is the title of the announcement?",
//         style: "TextInputStyle.Short",
//         placeholder: "Placeholder",
//         required: true
//     }
// ]
//   }


/**
 * Creates a new modal using the provided modal object.
 * @param {Object} modalObj - The modal object containing the modal properties.
 * @param {string} modalObj.customID - The custom ID of the modal.
 * @param {string} modalObj.title - The title of the modal.
 * @param {Array} modalObj.rows - An array of rows to be added to the modal.
 */
async function createModal(modalObj) {
  // destructure the modalObj
  const { customID, title, rows } = modalObj;
  // make sure each property is defined with isDefined(), which returns true if the property is defined
  if (!scripts.isDefined(customID) || !scripts.isDefined(title) || !scripts.isDefined(rows)) {
    scripts.logError(
      new Error("One or more modal properties are not defined"),
      `Error creating modal`
    );
  }

  let newCustomModal;
  // put try catch blocks around newCustomModal variable declaration and ModalBuilder() instantiation, use logError() to log the error
  try {
    newCustomModal = new ModalBuilder().setCustomId(customID).setTitle(title);
  } catch (error) {
    scripts.logError(error, `Error creating modal`);
  }

  rows.forEach((row) => {
    // put try catch blocks around newCustomModal.addComponents() and createRow() function calls, catch error and continue, but make the error message custom like "Error adding row "blank" to modal ${error.line}"
    try {
      newCustomModal.addComponents(createRow(row));
    } catch (error) {
      scripts.logError(error, `Error adding row ${row.customID} to modal`);
    }
  });

  return newCustomModal;
}

/**
 * Creates a new row using the provided text input object.
 * @param {Object} textInputObj - The text input object containing the text input properties.
 * @param {string} textInputObj.customID - The custom ID of the text input.
 * @param {string} textInputObj.label - The label of the text input.
 * @param {string} textInputObj.style - The style of the text input.
 * @param {string} textInputObj.placeholder - The placeholder text of the text input.
 * @param {boolean} textInputObj.required - Indicates whether the text input is required.
 */
const createRow = (textInputObj) => {
  // destructure the textInputObj
  const {
    customID,
    label,
    style = `TextInputStyle.Short`,
    placeholder,
    required = false,
  } = textInputObj;

  let textInputField = new TextInputBuilder();

  // make sure each property is defined with isDefined(), which returns true if the property is defined
  if (!scripts.isDefined(customID)) {
    try {
      throw new Error("customID is not defined");
    } catch (error) {
      scripts.logError(error, "customID is not defined in createRow()");
    }
  } else {
    // DO
    // check to make sure it is a string that is within the character limit for a customID
    // check to make sure custom id is less than or equal to 100 characters
    // if its not throw an error and log with logError()
    if (customID.length > 100) {
      try {
        throw new Error("customID is too long");
      } catch (error) {
        scripts.logError(error, "customID is too long: MAX 100 characters");
      }
    }
    try {
      textInputField.setCustomId(customID);
    } catch (error) {
      scripts.logError(error, "error w customID");
    }
  }
  if (!scripts.isDefined(label)) {
    try {
      throw new Error("label is not defined");
    } catch (error) {
      scripts.logError(error, "label is not defined");
    }
  } else {
    if (label.length > 45) {
      try {
        throw new Error("label is too long");
      } catch (error) {
        scripts.logError(error, "label is too long: MAX 45 characters");
      }
    }
    textInputField.setLabel(label);
  }
  if (scripts.isDefined(style)) {
    // DO
    // check to make sure it is a string that is one of the TextInputStyle options
    if (
      style !== "TextInputStyle.Short" &&
      style !== "TextInputStyle.Paragraph"
    ) {
      try {
        scripts.cLog(
          "style is not a valid TextInputStyle\nAuto Assigning TextInputStyle.Short"
        );
        style = "TextInputStyle.Short";
      } catch (error) {
        scripts.logError(error, "style is not a valid TextInputStyle");
      }
    }
    textInputField.setStyle(style);
  }
  if (scripts.isDefined(placeholder)) {
    if (placeholder.length > 100) {
      try {
        throw new Error("placeholder is too long");
      } catch (error) {
        scripts.logError(error, "placeholder is too long: MAX 100 characters");
      }
    }
    textInputField.setPlaceholder(placeholder);
  }
  if (scripts.isDefined(required)) {
    if (typeof required !== "boolean") {      try {
        scripts.cLog("required is not a boolean\nAuto Assigning required to false");
        required = false;
      } catch (error) {
        scripts.logError(error, "required is not a boolean");
      }
      textInputField.setRequired(required);
    }
  } else {
    textInputField.setRequired(false);
  }

  return new ActionRowBuilder().addComponents(textInputField);
};

module.exports = { createModal, createRow };
