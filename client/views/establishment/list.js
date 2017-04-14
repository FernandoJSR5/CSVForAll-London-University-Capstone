Template.establishmentsList.onRendered(function(){
});

Meteor.subscribe("establishments", function(){
	return Establishments.find().fetch();
});

Template.establishmentsList.helpers({
	establishments:function(){
		return Establishments.find().fetch();
	},
	// return true if I am allowed to edit the current account, false otherwise
	userCanEdit : function(doc,Collection) {
		// can edit if the current account is owned by me.
		doc = Establishments.findOne({owner:Meteor.userId()});
		if (doc){
			return true;
		}
		else {
			return false;
		}
	}
});

Template.establishmentsList.events({
	'click .js-delete-stablishment':function(event){
		event.preventDefault();
		var data_id = this._id;
		console.log("Establishment", Establishments.find().count());
		if (Establishments.find().count() === 0){
			Meteor.call('removeEstablishment', Meteor.userId(), data_id, function(err,res){
				if(err){
					console.log("Error "+err);
					Materialize.toast('The establishment was not deleted!', 3000, 'red rounded');
				}else{
					console.log("Success "+res);
					Materialize.toast('The establishment was deleted successfully!', 3000, 'green rounded');
				}
			});
		}
		else {
			Meteor.call('removeSales', Meteor.userId(), data_id, function(err,res){
				if(err){
					console.log("Error "+err);
					Materialize.toast('Any Data of this Establishment is active, please turn off the state first!', 3000, 'red rounded');
				} else{
						console.log("Success "+res);
						Meteor.call('removeEstablishment', Meteor.userId(), data_id, function(err,res){
						if(err){
							console.log("Error "+err);
							Materialize.toast('The establishment was not deleted!', 3000, 'red rounded');
						}else{
							console.log("Success "+res);
							Materialize.toast('The establishment was deleted successfully!', 3000, 'green rounded');
						}
					});
				}
			});
		}
	},
});