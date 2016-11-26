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
  require('../src/Twoverlay');
  delete global.document;
  delete global.Image;
  delete global.window;

  assert.pass('Twoverlay loads');
  assert.end();
});
