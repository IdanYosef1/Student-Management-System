const model = require('../Model/studentsModel');

const getAllStudents = () => {
    return new Promise((resolve,reject) => {
        model.find({}, (err,students) => {
            if(err){
                reject(err);
            }
            else{
                resolve(students);
            }
        });
    });
}

const getStudentById = (id) => {
    return new Promise((resolve,reject) => {
        model.findById(id, (err,student) => {
            if(err){
                reject(err);
            }
            else{
                resolve(student);
            }
        });
    });
}

const addStudent = (studentObj) => {
    return new Promise((resolve,reject) => {
        const student = new model(studentObj);
        student.save((err) => {
            if(err){
                reject(err);
            }
            else{
                resolve("Added Successfully");
            }
        });
    });
}

const addGrade = (id, gradeObj) => {
    return new Promise((resolve,reject) => {
        model.findById(id, (err,student) => {
            if(err){
                reject(err);
            }
            else{
                student.grades.push(gradeObj);
                const newgrade = new model(student);
                newgrade.save((err) => {
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(student.grades[student.grades.length - 1]);
                    }  
                });
            }
        });
    });
}

const updateStudent = (id, studentObj) => {
    return new Promise((resolve,reject) => {
        model.findByIdAndUpdate(id, studentObj, (err) => {
            if(err){
                reject(err);
            }
            else{
                resolve("Updated Successfully");
            }
        });
    });
}

const updateGrade = (id, gradeId, gradeObj) => {
        return new Promise((resolve,reject) => {
            model.findById(id, (err,student) => {
                if(err){
                    reject(err);
                }
                else{
                    for(let i=0;i<student.grades.length;i++){
                        if(student.grades[i]._id == gradeId){
                            student.grades[i].examDate = gradeObj.examDate;
                            student.grades[i].examGrade = gradeObj.examGrade;
                        }
                    }
                    const update = new model(student);
                    update.save((err) => {
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(student);
                    }

                    });
                }
            });
        });
}

const deleteStudent = (id, studentObj) => {
    return new Promise((resolve,reject) => {
        model.findByIdAndRemove(id, studentObj, (err) => {
            if(err){
                reject(err);
            }
            else{
                resolve("Deleteded Successfully");
            }
        });
    });
}

module.exports = {
    getAllStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent,
    addGrade,
    updateGrade,
};