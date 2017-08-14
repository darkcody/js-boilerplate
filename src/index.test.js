import {
  expect
} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

describe('Our first test', () => {
  it('should match true', () => {
    expect(true).to.equal(true);
  });
});

describe('index.html', () => {
  it('should have a header h1 that says Node.js Starter Kit', (done) => {
    const index = fs.readFileSync('./src/index.html', "utf-8");
    jsdom.env(index, function (err, window) {
      const h1 = window.document.getElementsByTagName('h1')[0];
      // console.log(h1);
      expect(h1.innerHTML).to.equal("Node.js Starter Kit");
      done();
      window.close();
    });
  })
});
