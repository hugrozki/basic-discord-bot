module.exports = class EventsService {
  constructor() {
    this.events = [];
    this.isFetched = false;
  }

  fetchEvents() {
    console.log('fetching events ...');
    this.events = [
      {
        id: 1,
        description: 'Counter Strike match against Rhyno Team',
        date: '2020-06-15',
        participants: ['milex', 'rilee', 'hub234']
      },
      {
        id: 2,
        description: 'League of Legends match against Domynos Team',
        date: '2020-06-18',
        participants: ['hugrozki', 'milex']
      },
      {
        id: 3,
        description: 'Counter Strike match against Panthers Team',
        date: '2020-06-20',
        participants: ['hub234', 'hugrozki']
      }
    ];

    this.isFetched = true;
  }

  getUserEvents(username) {
    return this.events.filter((item) => {
      return item.participants.includes(username);
    });
  }

  getEvents(username = null) {
    if (!this.isFetched) {
      this.fetchEvents();
    }

    if (!username) {
      return this.events;
    }

    return this.getUserEvents(username);
  }
}