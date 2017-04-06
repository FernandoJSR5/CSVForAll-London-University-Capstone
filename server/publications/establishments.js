Meteor.publish('establishments', function(){
	if(this.userId){
		return Establishments.find({
			$or:[
				{
					owner:this.userId,
				}
			]
		});
	}
});