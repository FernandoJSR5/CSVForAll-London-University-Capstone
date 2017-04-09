var schedule = Npm.require('node-schedule');
var fiber = Npm.require('fibers');
var rule = new schedule.RecurrenceRule();

Meteor.methods({  
  parseUpload(data) {    
    check(data, Array);    
    for (var i = 0; i < data.length; i++) {      
      var item = data[i],      
      exists = Sales.findOne({_id: item._id});      
      item.state = false;
      item.status = "timer_off";
      item.owner = Meteor.userId();      
      if (!exists) {        
        Sales.insert(item);      
      } else {        
        console.warn('Rejected. This item already exists.');      
      }    
    }  
  },
  removeData(userId, data_id){
    if(! this.userId) {
        throw new Meteor.Error('not-authorized');
    }
    if(this.userId){
      check(data_id,String);
      var data = Sales.findOne({_id:data_id});
      if(data.state===true){
        throw new Meteor.Error('data is active, please turn off first.');
      }
      return Sales.remove({"_id":data_id});
    }
  },
  removeSales(userId, data_id){
    if(! this.userId) {
        throw new Meteor.Error('not-authorized');
    }
    if(this.userId){
      check(data_id,String);
      var data = Sales.findOne({establishment_owner:data_id});
      if(data.state===true){
        throw new Meteor.Error('data is active, please turn off first.');
      }
      return Sales.remove({"establishment_owner":data_id});
    }
  },
  datePicker(data_id, date_picked){
    if(! this.userId) {
        throw new Meteor.Error('not-authorized');
    }
    if(this.userId){
      check(data_id,String);
      var date = new Date(date_picked);
      var currentDate = new Date;
      if (date >= currentDate){
        Sales.update(data_id, {
          $set: {date: date_picked},
        });
      }
      else {
        throw new Meteor.Error('date invalid');
      }
    }
  },
  activateSchedule(data_id, check_value){
    if(!this.userId){
      throw new Meteor.Error('not-authorized');
    }
    if(this.userId){
      check(data_id,String);
      check(check_value,Boolean);
      if(check_value == true){
        rule.minute = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,
        20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,
        42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59];
        var user_data = Sales.findOne({_id:data_id});
        var establishment_data = Establishments.findOne({_id:user_data.establishment_owner});
        //console.log("Establishments Data", establishment_data);
        //var date = new Date(user_data.date);
        if (!user_data.date){
          throw new Meteor.Error('data is invalid');
        }
        if (user_data.pay === 0){
          throw new Meteor.Error('data is invalid');
        }
        console.log('The date', user_data.date);
        fiber(function() {
          var scheduleStatus = Sales.update(data_id, {
            $set: { status: 'schedule' },
          });
          return scheduleStatus;
        }).run(); /*END FIBER*/
        schedule.scheduleJob(data_id, user_data.date /*rule.minute*/, function(){
          console.log('Schedule Active!', data_id);
          if(user_data.pay){
            fiber(function() {
              Email.send({
                to: user_data.email,
                from: "from.address@email.com",
                subject: establishment_data.name+ ": "+user_data.activity,
                text: "Dear " + user_data.name +", we notify you that your loan with the amount of $"+user_data.pay+" on the occasion of " +user_data.activity+ " dated " +user_data.date+ " has expired, contact the telephone "+establishment_data.phone+ " or you approach the offices in the direction " +establishment_data.address+ ", " +establishment_data.name,
              });
              var scheduleStatus = Sales.update(data_id, {
                $set: {status: 'timer_off', state: false},
              });
              return scheduleStatus;
            }).run(); /*END FIBER*/
            /**/
          }
          if(user_data.state === false){
            mySchedule = schedule.scheduledJobs[data_id];
            mySchedule.cancel();
            console.log('Schedule Inactive!', data_id);
          }
        });
        Sales.update(data_id, {
          $set: { state: check_value },
        });
      }
      else {
        mySchedule = schedule.scheduledJobs[data_id];
        mySchedule.cancel();
        console.log('Schedule Inactive!', data_id);
        Sales.update(data_id, {
          $set: {status: 'timer_off', state: check_value },
        });
      }
    }
  },
});