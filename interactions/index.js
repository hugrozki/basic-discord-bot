const constants = require('./constants');
const { HELLO_STRING } = require('./constants');

module.exports = (function() {
  const { HELLO_STRING, HELLO_REPLY } = constants;

  function getHello() {
    return HELLO_REPLY;
  }

  function getReply(message) {
    const content =  message.content.toLowerCase();

    if (content.includes(HELLO_STRING)) {
      return getHello();
    }

    return null;
  }

  return {
    getReply: getReply
  }
})();

