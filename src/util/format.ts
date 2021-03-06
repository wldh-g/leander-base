/* Leander is subject to the terms of the Mozilla Public License 2.0.
 * You can obtain a copy of MPL at LICENSE.md of repository root. */

// Translate some parameters in form of '[[(_|0-9|a-Z)]]' in string

/* eslint-disable no-else-return */

type FormatDictObject = {
  [key: string]: string;
}
type FormatDictArray = string[];
type FormatDict = FormatDictObject | FormatDictArray;

/**
 * Formatter utility.
 */
const format = (message: string, dict: FormatDict, depth = 0): string => {
  const replaces = message.match(/\[\[[0-9a-zA-Z_:.]*\]\]/gm);
  let replacedCounter = 0;
  let replacedMessage = String(message);

  if (replaces) {
    for (let i = 0; i < replaces.length; i += 1) {
      if (replaces[i] === '[[]]') {
        replacedMessage = replacedMessage.replace(
          replaces[i],
          dict[replacedCounter],
        );
        replacedCounter += 1;
      } else {
        const reqArgLabel = replaces[i].substring(2, replaces[i].length - 2);
        const reqArgNo = Number(reqArgLabel);
        const reqArg = Number.isNaN(reqArgNo) ? reqArgLabel : reqArgNo;

        if (typeof dict[reqArg] !== 'undefined') {
          replacedMessage = replacedMessage.replace(
            replaces[i],
            dict[reqArg],
          );
        }
      }
    }
    if (depth > 10) {
      return replacedMessage;
    } else {
      return format(replacedMessage, dict, depth + 1);
    }
  } else {
    return replacedMessage;
  }
};

export default format;
