import fs from "fs/promises";
import logger from "./logging";

/**
 * Creates a random alphanumeric string of a specified length.
 * @param len number of characters to output
 * @returns string with a length of the input parameter
 */
export function getRandomAlphanumeric(len: number) {
  const alphaNumericChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomIndex = Math.floor(Math.random() * alphaNumericChars.length);
  const randomString: string[] = [];
  for (let i = 0; i < len; i++) {
    randomString.push(alphaNumericChars.charAt(randomIndex));
  }
  return randomString.join("");
}

/**
 * Saves a JSON object to a file.
 * @param data json object
 * @returns whether or not the operation was successful
 */
export async function saveData(fileName: string, data: { "message": string }): Promise<boolean> {
  try {
    await fs.writeFile(fileName, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    logger("Error saving data: " + error, "error");
    return false;
  }
}