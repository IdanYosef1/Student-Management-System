const express = require('express');
const bll = require('../BLL/studentsBLL');
const router = express.Router();

router.get('/', async (req,res) => {
    try{
        const students = await bll.getAllStudents();
        res.send(students);
    }
    catch(err){
        res.send(err);
    }
})

router.get('/:id', async (req,res) => {
    try{
        const student = await bll.getStudentById(req.params.id);
        res.send(student);
    }
    catch(err){
        res.send(err);
    }
})

router.post('/', async (req,res) => {
    try{
        const data = await bll.addStudent(req.body);
        res.send(data);
    }
    catch(err){
        res.send(err);
    }
})

router.post('/:id', async (req,res) => {
    try{
        const grade = await bll.addGrade(req.params.id, req.body);
        res.send(grade);
    }
    catch(err){
        res.send(err);
    }
})

router.put('/:id', async (req,res) => {
    try{
        const data = await bll.updateStudent(req.params.id, req.body);
        res.send(data);
    }
    catch(err){
        res.send(err);
    }
})

router.put('/:id/:gradeId', async (req,res) => {
    try{
        const student = await bll.updateGrade(req.params.id, req.params.gradeId, req.body);
        res.send(student);
    }
    catch(err){
        res.send(err);
    }
})

router.delete('/:id', async (req,res) => {
    try{
        const data = await bll.deleteStudent(req.params.id);
        res.send(data);
    }
    catch(err){
        res.send(err);
    }
})

module.exports = router;
