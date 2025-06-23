function getRandomAlphanumeric(len: number) {
  const alphaNumericChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomIndex = Math.floor(Math.random() * alphaNumericChars.length);
  const randomString: string[] = [];
  for (let i = 0; i < len; i++) {
    randomString.push(alphaNumericChars.charAt(randomIndex));
  }
  return randomString.join("");
}

module.exports = {
  getRandomAlphanumeric,
};
