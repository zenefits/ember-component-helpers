import Ember from 'ember';

export default Ember.Controller.extend({
  ctrlHash: {'class':'x-append'},
  actions: {
    changeHash () {
      this.set('ctrlHash.class', 'new-class');
    }
  }
});
