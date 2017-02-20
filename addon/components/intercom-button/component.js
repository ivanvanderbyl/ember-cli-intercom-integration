import Ember from 'ember';
import Component from 'ember-component';
import layout from './template';

const { inject: { service }, computed } = Ember;

export default Component.extend({
  layout,

  intercom: service(),
  classNames: ['IntercomButton'],
  classNameBindings: ['isOpen:IntercomButton--open:IntercomButton--closed'],

  isOpen: computed.alias('intercom.isOpen'),
  unreadCount: computed.alias('intercom.unreadCount'),

  click() {
    this.get('intercom').toggleOpen();
  }
});
