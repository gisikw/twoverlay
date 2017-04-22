const listeners = [
  require('./chatListener'),
  require('./processListener'),
];

function register(store) {
  listeners.forEach(listener => listener.register(store));
}

module.exports = { register }
