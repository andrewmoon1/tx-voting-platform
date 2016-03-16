/* global TEST_HELPER describe it_ db TestHelper __server beforeEach expect */
'use strict';
require(TEST_HELPER);
const Entries = require(`${__server}/models/entries`);
require('sinon-as-promised');
const db = require(`${__server}/lib/db`);

describe('The entries model', () => {
  beforeEach(() => {
    return TestHelper.emptyDb(db);
  });

  it_.only('reads an item into the entries models', function * insert() {
    const entry = {
      title: 'test',
    };
    const insertResult = yield TestHelper.db('entries').create(entry);
    expect(insertResult, 'insertResults').to.contain(entry);
    const readEntries = yield Entries.read();
    expect(readEntries[0]).to.contain(entry);
    // TestHelper.db.read();
    // read and confirm that read works
    // this will use DB read not the model
  });

  it_('inserts an item into the entries models', function * insert() {
    const entry = {
      title: 'test',
    };
    const insertResult = yield Entries.create(entry);
    expect(insertResult, 'insertResults').to.contain(entry);
    const readEntries = yield TestHelper.db('entries').read();
    expect(readEntries[0]).to.contain(entry);
  });

  it_('updates an item in the entries model', function * update() {
    const entry = {
      title: 'test',
    };
    const newLink = {
      title: 'whatever',
    };
    const insertResult = yield Entries.create(entry);
    expect(insertResult, 'insertResults').to.contain(entry);
    const updateResult = yield Entries.update(1, newLink);
    expect(updateResult, 'updateResults').to.contain(newLink);
    const readEntries = yield TestHelper.db('entries').read();
    expect(readEntries[0]).to.contain(newLink);
  });

  it_('deletes an item in the entries model', function * remove() {
    const entry = {
      title: 'test',
    };
    const insertResult = yield Entries.create(entry);
    expect(insertResult, 'insertResults').to.contain(entry);
    const removeResult = yield Entries.remove(1);
    expect(removeResult, 'removeResult').to.equal(1);
    const readEntries = yield TestHelper.db('entries').read();
    expect(readEntries).to.deep.equal([]);
  });
});
