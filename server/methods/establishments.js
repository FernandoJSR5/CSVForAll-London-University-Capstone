Meteor.methods({
  parseUploadEstablishment(data) {
    check(data, Array);
    for(var i = 0; i < data.length; i++){
      var item = data[i],
      exists = Establishments.findOne({_id: item._id});
      item.owner = Meteor.userId();      
      if (!exists) {
        Establishments.insert(item);
      } else {
        console.warn('Rejected. This item already exists.');
      }
    }
  },
  removeEstablishment(userId, data_id){
    if(! this.userId) {
        throw new Meteor.Error('not-authorized');
    }
    if(this.userId){
      check(data_id,String);
      return Establishments.remove({"_id":data_id});
    }
  },
});