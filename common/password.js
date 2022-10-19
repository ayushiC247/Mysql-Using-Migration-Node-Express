const bcrypt = require("bcryptjs");

/**
 * Generates Hash of a password string
 */
exports.encryptPassword = async (password) => bcrypt.hashSync(password, 10);

/**
 * Compare the password using bcryptjs algo
 */
exports.comparePassword = async (password, hash) =>
  await bcrypt.compare(password, hash);
