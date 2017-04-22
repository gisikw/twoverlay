import test from 'tape';

test('Twoverlay can be loaded', (assert) => {
  global.document = {
    createElement: () => ({
      getContext: () => ({
        fillRect() {},
        getImageData: () => ({ data: [] }),
        putImageData() {},
        drawImage() {},
      }),
    }),
  };
  global.Image = () => ({});
  global.window = {};
  global.addEventListener = () => {};
  global.WebSocket = () => {};

  require('../src/components/Twoverlay');
  assert.pass('Twoverlay loads');

  delete global.document;
  delete global.Image;
  delete global.window;
  delete global.addEventListener;
  assert.end();
});
