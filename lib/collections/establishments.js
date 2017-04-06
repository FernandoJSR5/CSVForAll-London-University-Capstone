Establishments = new Mongo.Collection("establishments");

 Establishments.attachSchema(new SimpleSchema({
	name:{
		type:String,
		label:"name",
		max:50,
		optional:false
	},
	email:{
		type:String,
		label:"email",
		max:30,
		optional:false
	},
	phone:{
		type:String,
		label:"phone",
		max:20,
		optional:true
	},
	activity:{
		type: String,
		label: "activity",
		max:100,
		optional:false
	},
	address:{
		type: String,
		label: "address",
		max:100,
		optional:false
	},
	state:{
		type:Boolean,
		label:"state",
		optional:true
	},
	status:{
		type:String,
		label:"status",
		optional:true
	},
	owner:{
		type:String,
		label:"owner",
		optional:false
	},
 }));