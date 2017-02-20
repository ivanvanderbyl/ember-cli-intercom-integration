import { moduleFor, test } from 'ember-qunit';

let fakeIntercom;

moduleFor('service:intercom', 'Unit | Service | intercom', {
  beforeEach() {
    fakeIntercom = newFakeIntercom();
    this.subject().set('api', fakeIntercom);
    this.subject().boot();
  }
});

class Intercom {
  constructor() {
    this.eventHandlers = {};
  }

  onShow(cb) {
    this.eventHandlers.onShow = [cb];
  }

  onHide(cb) {
    this.eventHandlers.onHide = [cb];
  }

  onUnreadCountChange(cb) {
    this.eventHandlers.onUnreadCountChange = [cb];
  }

  show() {
    this.eventHandlers.onShow.forEach((fn) => fn());
  }

  hide() {
    this.eventHandlers.onHide.forEach((fn) => fn());
  }

  showNewMessage() {
    this.show();
  }

  showMessages() {
    this.show();
  }

  triggerUnreadChange(count) {
    this.eventHandlers.onUnreadCountChange.forEach((fn) => fn(count));
  }
}

function newFakeIntercom() {
  let intercom = new Intercom();

  return function callFakeIntercomMethod(command, ...args) {
    let action = intercom[command];
    if (action) {
      return action.apply(intercom, args);
    }
  };
}

test('showNewMessage', function(assert) {
  assert.expect(3);

  let service = this.subject();
  assert.equal(service.get('isOpen'), false, 'not open');
  return service.showNewMessage().then(() => {
    assert.ok(true, 'intercom is active');
    assert.equal(service.get('isOpen'), true, 'open');
  });
});

test('showMessages', function(assert) {
  assert.expect(3);

  let service = this.subject();
  assert.equal(service.get('isOpen'), false, 'not open');
  return service.showMessages().then(() => {
    assert.ok(true, 'intercom is active');
    assert.equal(service.get('isOpen'), true, 'open');
  });
});

test('hide', function(assert) {
  assert.expect(1);

  let service = this.subject();
  service.set('isOpen', true);

  return service.hide().then(() => {
    assert.equal(service.get('isOpen'), false, 'open');
  });
});

test('show', function(assert) {
  assert.expect(3);

  let service = this.subject();
  assert.equal(service.get('isOpen'), false, 'not open');
  return service.show().then(() => {
    assert.ok(true, 'intercom is active');
    assert.equal(service.get('isOpen'), true, 'open');
  });
});

test('show when aready showing', function(assert) {
  assert.expect(1);

  let service = this.subject();
  service.set('isOpen', true);

  return service.show().then(() => {
    assert.equal(service.get('isOpen'), true, 'open');
  });
});

test('unreadCount', function(assert) {
  let service = this.subject();
  assert.equal(service.get('unreadCount'), 0);
  fakeIntercom('triggerUnreadChange', 7);
  assert.equal(service.get('unreadCount'), 7);
});
