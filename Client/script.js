const urlStudents = "https://student-management-idan.herokuapp.com/api/students";
const urlUsers = "https://jsonplaceholder.typicode.com/users";

/* The function saves in session storage the false value that corresponds to the islogged key and 
   redirects the user to the login page. */
function logout(){
    window.location.href = 'index.html';
}

/* Clicking on button "Login" in Login page activates the function.
   The function checks if the user's information is in the api,
   if so then the function redirects the browser to the Students page 
   and otherwise a message is displayed to the user and keeps in session storage the value true for the key islogged.
   If an error occurred in request to get all users then an error message is printed to the console.*/
   async function login(){
    const userName = document.getElementById("username").value;
    const userEmail = document.getElementById("useremail").value;
    const response = await fetch(urlUsers);
    if(response.ok){
        const arr = await response.json();
        const bool = arr.some(element => {
            return(element.username === userName && element.email === userEmail)});
        if(bool){
            window.location.href = "main.html";
        }
        else{
            alert("The Username or Email you entered is not registered on the site.");
            document.getElementById("username").value = "";
            document.getElementById("useremail").value = "";
        }
    }
    else{
        console.log("Error");
    }
}
 
/* The function is activated when the main page is loaded.
   The function receives an array of students from the server and creates a table.
   If an error occurred in request to get all students then an error message is printed to the console. */
async function allStudents(){
    const response = await fetch(urlStudents); 
    if(response.ok){
        const arrStudents = await response.json();
        const table = document.getElementById("Table");
        table.innerHTML = `
        <tr id="tr1">
            <td>Full Name</td>
            <td>Faculty</td>
            <td>Grades</td>
            <td>Edit</td>
            <td>Delete</td>
        </tr>`;
        tableAllStudents(arrStudents,table);    
    }
    else{
        console.log("Error");
    }
}

// Create a table in main.html .
function tableAllStudents(arr,table){
    arr.forEach((student,index) => { 
        const row = document.createElement('tr'); 
        row.style.backgroundColor =  rowBackground(index);
        row.id = `tr${student._id}`;
        table.append(rowInnerHtml(row,student));
    });
}

// Returns the background color of the row according to the evenness of the student's index in the array.
function rowBackground(index){
    if(index % 2 === 1){
        return "rgba(124, 224, 255, 0.8)";                
    }
    else{
        return "rgba(255, 255, 255,0.7)";
    }
}

// Defines the innerHtml of the row and returns it.
function rowInnerHtml(row,student){
    row.innerHTML = `
        <td>
            <button id="${student._id}" onclick="studentName(id)">
                ${student.fullName}
            </button>
        </td>
        <td>
            ${student.faculty}
        </td>
        <td>
            <button id="${student._id}" onclick="grades(id)">
                <img src="icon_grades.png" alt="undefined">
            </button>
        </td>
        <td>
            <button id="${student._id}" onclick="edit(id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" 
                class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 
                    2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 
                    0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 
                    0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </button>
        </td>
        <td>
            <button id="${student._id}" onclick="deleteStudent(id)">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" 
                class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 
                    0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 
                    0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 
                    0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </button>
        </td>`;
    return row;    
}

// Clicking on one of the Full Name in main page.
/* Clicking on one of the Full Name in main page activates the function.
   The function saves the ID of the student in session storage and redirects the browser to the data page. */
function studentName(id){
    sessionStorage.setItem("studentId",id);
    window.location.href = 'data.html';
}

/* Clicking on one of the icons of the grades in main page activates the function.
   The function saves the ID of the student in session storage and redirects the browser to the GradesPage. */
function grades(id){
    sessionStorage.setItem("studentId",id);
    window.location.href = 'grades.html';
}

/* Clicking on one of the button "Edit" in main page activates the function.
   The function saves the ID of the student in session storage and redirects the browser to the edit page. */
function edit(id){
    sessionStorage.setItem("studentId",id);
    window.location.href = 'edit.html';
}


// Clicking on button "Add Student" in main page activates the function and redirects the browser to the edit page. 
function addStudent(){
    window.location.href = 'create.html';
}

/* Clicking on one of the button "Delete" in main page activates the function.
   The function deletes the student from the database by id. If an error occurred in
   request to delete student then an error message is printed to the console
   and otherwise an allStudents function is called. */ 
async function deleteStudent(id){
    const response = await fetch(`${urlStudents}/${id}`,{
        method:"delete"
    });
    if(response.ok){
        allStudents();
    }
    else{
        console.log("Error");
    }
}

/* The function is activated when the data page is loaded.
   The function receives an student's object from the server. In addition, setInnerText and createTable functions is called.
   If an error occurred in request to get student then an error message is printed to the console. */
async function allData(){
    const id = sessionStorage.getItem("studentId");
    const response = await fetch(`${urlStudents}/${id}`);
    if(response.ok){
        const student = await response.json();
        setInnerText(student);
        createTable(student.grades);   
    }
    else{
        console.log("Error");
    }
}

/* Edits the innerText property of the elements. */
function setInnerText(student){
    document.getElementById("fullname").innerText = student.fullName;
    document.getElementById("email").innerText = student.email;
    document.getElementById("faculty").innerText = student.faculty;
    document.getElementById("birthdate").innerText = student.birthDate.slice(0,10);
}

/* The function is activated when the GradesPage is loaded.
   The function receives an student's object from the server by Id, createGradesTable is called 
   and the student's object is passed to it as a parameter.
   If an error occurred in request to get student then an error message is printed to the console. */
async function gradesStudent(){
    const id = sessionStorage.getItem("studentId");
    const response = await fetch(`${urlStudents}/${id}`);
    if(response.ok){
        const student = await response.json();
        createGradesTable(student);
    }
    else{
        console.log("Error");
    }
}

// create a table in GradesPage.
function createGradesTable(student){
    sessionStorage.setItem('gradeNum', 0);
    const table = document.getElementById("Table");
    student.grades.forEach((exam, index) => {
        let getGradesNum = sessionStorage.getItem('gradeNum');
        if(getGradesNum !== 0){
            sessionStorage.setItem('gradeNum', +getGradesNum + 1);
        }
        else{
            sessionStorage.setItem('gradeNum', 1);
        }
        getGradesNum = sessionStorage.getItem('gradeNum');
        const row = document.createElement('tr');
        row.style.backgroundColor = GradesTableBackground(index);
        table.append(rowGradesTable(row, exam, index)); 
    }); 
}

// Returns the background color of the row according to the evenness of the exam's index in the array.
function GradesTableBackground(index){
    if(index % 2 === 1){
        return "rgb(196, 196, 196)";
    }
    else{
        return "white";
    }
}

// Defines the innerText and ID of the row and returns it.
function rowGradesTable(row, exam, index){
    row.id = `${index + 1}`;
    row.innerHTML = `
    <td id=${exam._id}>${index + 1}</td>
    <td>${exam.examDate.slice(0,10)}</td>
    <td>${exam.examGrade}</td>
    `; 
    return row;
}

/* Clicking on the button "Add" in GradesPage activates the function.
   The function sends a request to the server to new grade, redirects the browser to the home page
   and otherwise a message is displayed to the user.
   In addition, addGradeToTable and resetInputs functions is called.
   The grade's object is passed to addGradeToTable function as a parameter.
   If an error occurred in request to create new car then an error message is printed to the console.*/
async function addGrade(event){
    event.preventDefault();
    const id = sessionStorage.getItem("studentId");
    const newGrade = {
        examDate: document.getElementById("examDate").value,
        examGrade: document.getElementById("grade").value
    };
    const response = await fetch(`${urlStudents}/${id}`,{
        method:"post",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(newGrade)
    });
    if(response.ok){
        const grade = await response.json();
        addGradeToTable(grade);
        resetInputs();
    }
    else{
        console.log("Error");
    }
}

// Add a grade to the table in PageGrade.
function addGradeToTable(grade){
    const num = +sessionStorage.getItem('gradeNum') + 1;
        sessionStorage.setItem('gradeNum', num);
        const table = document.getElementById("Table");
        const row = document.createElement('tr'); 
        row.style.backgroundColor = GradesTableBackground(num + 1);
        table.append(rowSetGradesTable(row, grade, num));
}

// Defines the innerText and ID of the row that is added to the table and returns it.
function rowSetGradesTable(row, grade, num){
    row.id = `${num}`;
    row.innerHTML = `
    <td id=${grade._id}>${num}</td>
    <td>${document.getElementById("examDate").value}</td>
    <td>${document.getElementById("grade").value}</td>
    `;
    return row;
}

/* Clicking on button "Update" in GradesPage activates the function.
   The function checks if the user has entered an appropriate number of the grade he wants to update.
   If the user entered a suitable number then the function accesses the id of the corresponding row which
   is the id of the grade and it sends a request to update the grade in the database. If no error has occurred in
   the application then go to the columns of the grade and date in the appropriate row and update the inner text 
   of the columns.
   If the user has not entered an appropriate number then a corresponding message is displayed to the user.
   If an error occurred in request to update grade then an error message is printed to the console.*/
async function updateGrade(event){
    event.preventDefault();
    const id = sessionStorage.getItem("studentId");
    const num = document.getElementById("num").value;
    if(+num > 0 && +num <= sessionStorage.getItem('gradeNum')){
        const tr = document.getElementById(`${num}`);
        const gradeId = Array.from(tr.children)[0].id;
        const examObj = {
            examDate: document.getElementById("examDate").value,
            examGrade: document.getElementById("grade").value
        };
        const response = await fetch(`${urlStudents}/${id}/${gradeId}`, {
            method:"put",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(examObj)
        });
        if(response.ok){
            Array.from(tr.children).forEach((td,index) => {
                if(index === 1){
                    td.innerText = document.getElementById("examDate").value;
                }
                if(index === 2){
                    td.innerText = document.getElementById("grade").value;
                }
            })
            resetInputs();
        }
        else{
            console.log("Error");
        }
    }
    else{
        alert("The numer is out of range");
    }   
}

/* Defines the innerText and onsubmit attribute of elements in GradesPage. */
function addOrUpdate(event){
    document.getElementById('buttonAddUpdate').innerText = event.target.value;
    document.getElementById('formGrades').setAttribute("onsubmit", `${event.target.id}`);
}

// Reset inputs after adding or updating in GradesPage.
function resetInputs(){
    document.getElementById("num").value = '';
    document.getElementById("examDate").value = '';
    document.getElementById("grade").value = '';
}

/* The function is activated when the edit page is loaded.
   The function receives an student's object from the server. In addition, setValue and createTable functions is called.
   If an error occurred in request to get student then an error message is printed to the console. */
async function editPage(){
    const id = sessionStorage.getItem("studentId");
    const response = await fetch(`${urlStudents}/${id}`);
    if(response.ok){
        const student = await response.json();
        setValue(student);
        createTable(student.grades);
    }
    else{
        console.log("Error");
    }  
}

/* Edits the value property of the elements. */
function setValue(student){
    document.getElementById("fullname").value = student.fullName;
    document.getElementById("email").value = student.email;
    document.getElementById("faculty").value = student.faculty;
    document.getElementById("birthdate").value = student.birthDate.slice(0,10);
}

// create a table in edit.html .
function createTable(studentgrades){
    const table = document.getElementById("Table");
    studentgrades.forEach((exam,index) => {
        const row = document.createElement('tr'); 
        row.style.backgroundColor = GradesTableBackground(index);
        table.append(rowTableInEdit(row, exam)); 
    });
}

// Defines the innerText row and returns it.
function rowTableInEdit(row, exam){
    row.innerHTML = `
    <td>${exam.examDate.slice(0,10)}</td>
    <td>${exam.examGrade}</td>
    `;
    return row;
}

/* Clicking on button "update" in edit page activates the function.
   The function sends a request to the server to update the student's object by id, checks whether all the fields 
   in the form have been filled out and if so then the function submits the form.
   If an error occurred in request to update then an error message is printed to the console.*/
async function clickUpdate(){
    const id = sessionStorage.getItem("studentId");
    const studentObj = {
        fullName: document.getElementById("fullname").value,
        email: document.getElementById("email").value,
        faculty: document.getElementById("faculty").value,
        birthDate: document.getElementById("birthdate").value
    };
    if(document.getElementById('form').checkValidity()){
        const response = await fetch(`${urlStudents}/${id}`,{
            method:"put",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(studentObj)
        });
        if(response.ok){
            document.getElementById('form').submit();
        }
        else{
            console.log("Error");
        }
    }    
}

/* Clicking on button "Create New Student" in create page activates the function.
   The function sends a request to the server to create new student, checks whether all the fields 
   in the form have been filled out and if so then the function submits the form.
   If an error occurred in request to create new student then an error message is printed to the console.*/
async function clickCreate(){
    const newStudent = {
        fullName: document.getElementById("fullname").value,
        email: document.getElementById("email").value,
        faculty: document.getElementById("faculty").value,
        birthDate: document.getElementById("birthdate").value,
        grades:[]
    };
    if(document.getElementById('form').checkValidity()){
        const response = await fetch(urlStudents,{
            method:"post",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(newStudent)
        });
        if(response.ok){
            document.getElementById('form').submit();
        }
        else{
            console.log("Error");
        } 
    }    
}
