import Ember from 'ember';
import intercom from 'intercom';

const {
  Evented,
  run,
  run: { scheduleOnce },
  Service,
  RSVP: { Promise }
} = Ember;

export default Service.extend(Evented, {
  api: intercom,

  /**
   * Indicates the open state of the Intercom panel
   *
   * @public
   * @type {Boolean}
   */
  isOpen: false,

  /**
   * Reports the number of unread messages
   *
   * @public
   * @type {Number}
   */
  unreadCount: 0,

  boot(config = {}) {
    this._addEventHandlers();
    this.get('api')('boot', config);
  },

  update(config = {}) {
    this.get('api')('update', config);
  },

  shutdown() {
    this.get('api')('shutdown');
  },

  show() {
    return this._wrapIntercomCallInPromise('show', 'show');
  },

  hide() {
    return this._wrapIntercomCallInPromise('hide', 'hide');
  },

  toggleOpen() {
    this.get('isOpen') ? this.hide() : this.show();
  },

  /**
   * Opens the message window with the message list visible.
   *
   * @public
   * @return {Promise}
   */
  showMessages() {
    return this._wrapIntercomCallInPromise('showMessages', 'show');
  },

  /**
   * Opens the message window with the new message view.
   *
   * @public
   * @return {Promise}
   */
  showNewMessage(initialText) {
    return this._wrapIntercomCallInPromise('showNewMessage', 'show', initialText);
  },

  /**
   * You can submit an event using the trackEvent method.
   * This will associate the event with the currently logged in user and
   * send it to Intercom.
   *
   * The final parameter is a map that can be used to send optional
   * metadata about the event.
   *
   * @param {String} eventName
   * @param {Object} metadata
   * @public
   */
  trackEvent() {
    this.get('api')('trackEvent', ...arguments);
  },

  /**
   * A visitor is someone who goes to your site but does not use the messenger.
   * You can track these visitors via the visitor user_id. This user_id
   * can be used to retrieve the visitor or lead through the REST API.
   *
   * @public
   * @return {String} The visitor ID
   */
  getVisitorId() {
    return this.get('api')('getVisitorId');
  },

  _onHide() {
    this.set('isOpen', false);
    this.trigger('hide');
  },

  _onShow() {
    this.set('isOpen', true);
    this.trigger('show');
  },

  _onUnreadCountChange(count) {
    this.set('unreadCount', parseInt(count, 10));
  },

  _addEventHandlers() {
    if (this._hasEventHandlers) {
      return;
    }
    this.get('api')('onHide', () => run(this, this._onHide));
    this.get('api')('onShow', () => run(this, this._onShow));
    this.get('api')('onUnreadCountChange', (count) => run(this, this._onUnreadCountChange, count));
    this._hasEventHandlers = true;
  },

  _wrapIntercomCallInPromise(intercomMethod, eventName, ...args) {
    return new Promise((resolve) => {
      let isOpen = this.get('isOpen');
      if (eventName === 'show' && isOpen
          || eventName === 'hide' && !isOpen) {
        run.next(this, resolve);
      } else {
        this.one(eventName, resolve);
      }
      this.get('api')(intercomMethod, ...args);
    });
  }
});
