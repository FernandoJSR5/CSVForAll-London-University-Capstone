Sales = new Mongo.Collection("sales");

 Sales.attachSchema(new SimpleSchema({
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
	gender:{
		type: String,
		label: "gender",
		max:10,
		optional:true
	},
	pay: {
		type:Number,
		label:"pay",
		optional:true
	},
	establishment_owner:{
		type:String,
		label:"EstablishmentOwner",
		optional:false
	},
	date:{
		type:Date,
		label:"date",
		optional:true
	},
	state:{
		type:Boolean,
		label:"state",
		optional:false
	},
	status:{
		type:String,
		label:"status",
		optional:false
	},
	owner:{
		type:String,
		label:"owner",
		optional:false
	},
 }));