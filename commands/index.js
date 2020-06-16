const EventsService = require('./events.service');
const constants = require('./constants');

module.exports = (function() {
  const eventsService = new EventsService();
  const { HELP_COMMAND, EVENTS_COMMAND } = constants;
  const commandArray = [ HELP_COMMAND, EVENTS_COMMAND ];

  function getHelpReply() {
    let text = 'There are the available commands: \n';
    commandArray.forEach(command => {
      text += `${command.text} \n`
    });

    return text;
  }

  function getEventsReply(params, username) {
    const arg1 = params ? params[0] : '';
    let searchUsername = null;
    let legend = 'The next team';

    if (arg1 === 'me') {
      searchUsername = username;
      legend = 'Your next';
    }

    const eventsArray = eventsService.getEvents(searchUsername);

    if (eventsArray.length === 0) {
      return 'No events finded.';
    }

    let eventStringList = '';
    eventsArray.forEach(element => {
      const { description, date } = element;
      eventStringList += `- ${description} [${date}]\n`;
    });

    return `${legend} events of the month:\n${eventStringList}`;
  }

  const getCommandReply = function(tag, params, username) {
    switch (tag) {
      case HELP_COMMAND.tag:
        return getHelpReply();
        case EVENTS_COMMAND.tag:
          return getEventsReply(params, username);
      default:
        return `${tag} command not available.`;
    }
  }

  const getReply = function(tag, params = null, username) {
    const cleanParams = (typeof params === 'string') ? params.toLowerCase().split(' ') : null;
    return getCommandReply(tag, params, username);
  }

  return {
    getReply: getReply
  }

})();
