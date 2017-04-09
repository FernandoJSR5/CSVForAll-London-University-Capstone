Template.list.onCreated(function(){
	var self = this;
	self.list = new ReactiveDict();
	self.list.setDefault( 'valueToFilter' , null);
});

Template.list.onRendered(function(){
  $(document).ready(function() {
    $('select').material_select();
  });
});

Template.bodyTable.onRendered(function(){
	this.$('.datepicker').pickadate({autoclose: false,});
  $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });
});

Template.picker.onRendered(function(){
	this.$('.datepicker').pickadate({autoclose: false,});
});

Meteor.subscribe("sales", function(){
	return Sales.find().fetch();
});

Meteor.subscribe("establishments", function(){
	return Establishments.find().fetch();
});

Template.list.helpers({
	sales:function(){
		var instance = Template.instance();
		if(!instance.list.get('valueToFilter', null)){
			console.log('hello!' +instance.list.get('valueToFilter'));
			return null;
		}
		else if(instance.list.get('valueToFilter') === "all"){
			return Sales.find({}).fetch();
		}
		else {
			console.log('hello!' +instance.list.get('valueToFilter'));
			return Sales.find({establishment_owner:instance.list.get('valueToFilter')}).fetch();
		}
	},
	establishments:function(){
		return Establishments.find().fetch();
	},
	// return true if I am allowed to edit the current account, false otherwise
	userCanEdit : function(doc,Collection) {
		// can edit if the current account is owned by me.
		doc = Sales.findOne({owner:Meteor.userId()});
		if (doc){
			return true;
		}
		else {
			return false;
		}
	}
});

Template.list.events({
	'click .js-delete-data':function(event){
		event.preventDefault();
		var data_id = this._id;
		console.log(data_id);
		Meteor.call('removeData', Meteor.userId(), data_id, function(err,res){
			if(err){
				console.log("Error "+err);
				Materialize.toast('Data is active, please turn off the state first!', 3000, 'red rounded');
			}else{
				console.log("Success "+res);
				Materialize.toast('The data was deleted successfully!', 3000, 'green rounded');
			}
		});
	},
	'change .js-switch':function(event){
		event.preventDefault();
		if(Meteor.user()){
			var data_id= this._id;
			var changeCheckbox = document.querySelector("#s"+data_id);
			var check_value = changeCheckbox.checked;
			console.log(check_value);
			Meteor.call("activateSchedule",data_id, check_value, function(err, res){
				if(err){
					$("#s"+data_id).removeAttr('checked');
					Materialize.toast('Switch cannot change!', 3000, 'red rounded');
				}
				else {
					Materialize.toast('The schedule  was switched!', 3000, 'green rounded');
				}
			});
		}
	},
	'change .datepicker':function(event){
		event.preventDefault();
		var data_id = this._id;
		var date_picked = $("#dp"+data_id).val();
		Meteor.call("datePicker", data_id, date_picked, function(err, res){
			if(err){
				Materialize.toast('The date cannot change, is invalid!', 3000, 'red rounded');
			}
			else {
				Materialize.toast('The date was switched!', 3000, 'green rounded');
			}
		});
	},
	'change select':function(event, template){
		event.preventDefault();
		var instance = Template.instance();
		//instance.list.set( 'valueToFilter' $("select").val() );
		instance.list.set( 'valueToFilter', event.target.value );
		console.log(event.target.value);
	},
});