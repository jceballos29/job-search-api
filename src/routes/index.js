/** @format */

const express = require('express');
const fs = require('fs');
const router = express.Router();

/**
 * Remove the extension from a file name.
 * @param file - The file name to be processed.
 * @returns The file name without the extension.
 */
const removeExtension = (file) => {
  return file.split('.').shift();
};

/* Reading the directory and filtering out the files that are not index.js. */
fs.readdirSync(__dirname).filter((file) => {
  const filename = removeExtension(file);
  if (filename !== 'index') {
    console.log(`Route: /${filename}`);
    router.use(`/${filename}`, require(`./${filename}`));
  }
});

module.exports = router;
