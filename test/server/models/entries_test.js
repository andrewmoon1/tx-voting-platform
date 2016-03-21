/* global TEST_HELPER describe it_ db TestHelper __server beforeEach beforeEach_ expect */
'use strict';
require(TEST_HELPER);
const Entries = require(`${__server}/models/entries`);
const Users = require(`${__server}/models/users`);
require('sinon-as-promised');
const db = require(`${__server}/lib/db`);

describe('The entries model', () => {
  const testUser = {
    id: 0,
    userName: 'clay',
    email: 'clay@test.com',
    isAdmin: false,
    authID: 'qgraerdfb',
  };

  const entry = {
    id: 0,
    title: 'test',
    embedID: '5',
    thumbnailURL: 'google.com',
    statistics: {
      stuff: 'test',
    },
    description: 'description',
    sortMetric: 10,
    userID: 0,
  };

  const testUser1 = {
    id: 1,
    userName: 'dylan',
    email: 'dylan@test.com',
    isAdmin: false,
    authID: 'lkjh',
  };

  const entry1 = {
    id: 1,
    title: 'test',
    embedID: '5',
    thumbnailURL: 'yahoo.com',
    statistics: {
      stuff: 'test',
    },
    description: 'description',
    sortMetric: 10,
    userID: 1,
  };

  const successTrue = {
    success: true,
  };

  beforeEach_(function * generator() {
    yield TestHelper.emptyDb(db);
    yield TestHelper.db('users').create(testUser);
  });

  it_('inserts an item into the database and reads it back', function * insert() {
    const insertResult = yield Entries.create(entry);
    expect(insertResult, 'insertResults').to.deep.equal(entry);
    const readEntries = yield Entries.read();
    expect(readEntries[0]).to.deep.equal(entry);
  });

// updates an item in the entries model given an id and an object with the fields to update
  it_('updates an item in the entries model', function * update() {
    yield Entries.create(entry);
    const updateResult = yield Entries.updateByID(0, { embedID: '10' });
    expect(updateResult).to.contain({ embedID: '10' });
  });

  it_('sends an error when an invlid user id is given', function * errorUpdate() {
    try {
      yield Entries.updateByID(20, { embedID: '10' });
    } catch (error) {
      expect(error.message).to.deep.equal('Attempted to update invalid user');
    }
  });

  it_('deletes an item in the entries model', function * remove() {
    yield TestHelper.db('users').create(testUser1);
    const insertResult = yield Entries.create(entry);
    const insertResult1 = yield Entries.create(entry1);
    expect(insertResult, 'insertResults').to.deep.equal(entry);
    const entryId = insertResult.id;
    const removeResult = yield Entries.remove(entryId);
    expect(removeResult, 'removeResult').to.deep.equal(successTrue);
    const readEntries = yield TestHelper.db('entries').read();
    expect(readEntries[0]).to.deep.equal(insertResult1);
  });

  it_('throws errors when the wrong information is passed into delete', function * remove() {
    try {
      yield Entries.remove(4);
    } catch (error) {
      expect(error.message).to.equal('Attempted to delete invalid ID');
    }
  });

  it_('returns user data with entry data', function * allData() {
    yield Entries.create(entry);
    yield Users.insert(testUser1);
    yield Entries.create(entry1);
    const entryAndUser = yield Entries.getEntriesWithUsers();
    expect(entryAndUser[0]).to.include.keys('thumbnailURL', 'embedID', 'user');
    expect(entryAndUser[0].thumbnailURL).to.equal('google.com');
    expect(entryAndUser[1]).to.include.keys('thumbnailURL', 'embedID', 'user');
    expect(entryAndUser[1].thumbnailURL).to.equal('yahoo.com');
  });
});
