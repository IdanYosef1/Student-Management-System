const mongoose = require('mongoose');

const schema = mongoose.Schema;

const studentsSchema = new schema({
    fullName: {type:String, required:true},
    email:{type:String, required:true},
    faculty: {type:String, required:true},
    birthDate: {type:Date, required:true},
    grades : [{
        examDate: {type:Date, required:true},
        examGrade: {type:Number, min:0, max:100, required:true}
    }]
});

module.exports =  mongoose.model('students', studentsSchema)
