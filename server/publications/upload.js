Meteor.publish('sales', function(){
	if(this.userId){
		return Sales.find({
			$or:[
				{
					owner:this.userId,
				}
			]
		});
	}
});