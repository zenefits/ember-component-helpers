import Ember from 'ember';

export default Ember.Controller.extend({
  ctrlHash: {'class':'x-append'},
  actions: {
    changeHashValue () {
      this.set('ctrlHash.class', 'new-class');
    }
  }
});
