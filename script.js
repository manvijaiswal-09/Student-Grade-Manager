let students=JSON.parse(localStorage.getItem("students")) ||[];
const addbtn=document.querySelector("#addBtn");
const nameInput=document.querySelector("#nameInput");
const marksInput=document.querySelector("#marksInput");
const totalStudent=document.querySelector("#total");
const avgMarks=document.querySelector("#average");
const passStudents=document.querySelector("#pass");
const failStudents=document.querySelector("#fail");
const studentList=document.querySelector("#studentList");
const errorMsg=document.querySelector("#errorMsg");


function getGrade(currMarks){
      if(currMarks>=75){
        return 'A';
      }
      else if(currMarks>=40){
        return 'B';
      }
      else{
        return 'C';
      }
}
function getGradeColor(marks){
      if(marks>=75){
        return '#22c55e';
      }
      else if(marks>=40){
        return '#eab308';
      }
      else{
        return '#f97316';
      }
}
function UpdateStats(){
   let TotalCount=students.length;
   let avgMark=students.length===0?0:students.map(s=>s.marks)
                        .reduce((sum,marks)=>sum+marks,0)/students.length;
  let passCount=students.filter(s=>s.marks>=40);
  let failCount=TotalCount-passCount.length;
  totalStudent.innerText=TotalCount;
  avgMarks.innerText=avgMark.toFixed(2);
  passStudents.style.color="green";
  failStudents.style.color="#e74c3c";
  passStudents.innerText=passCount.length;
  failStudents.innerText=failCount;
}
function deleteStudent(id){
  students=students.filter((student)=>student.id!==id); //not equal to isliye kiye h kyuki deleted id ko chorkar baki sab rakhna hai 
  localStorage.setItem("students", JSON.stringify(students));//filter ka kam hota h arry me vo elemnt rakho jinke lie condition true hoo.
  searchInput.value="";
  renderList(students);                               
  UpdateStats();

};

function renderList(data){
   studentList.innerHTML="";
   if(data.length===0){
       studentList.innerHTML=`<div class="empty-state">
                <div class="icon"> </div>
                <div>&#128203 No students yet .Add one above!</div>
            </div>`;
            return;
   }
   data.forEach((student) => {
     const div=document.createElement("div");
     div.className="student-item";
     const pass=student.marks>=40;
   
     div.innerHTML=`<span class="student-name">${student.name}</span>
                     <span class="student-marks">${student.marks}</span>
                     <span style="color:${getGradeColor(student.marks)}; font-weight:bold;">${getGrade(student.marks)}</span>
                     <span class="student-status ${pass?'pass':'fail'}">${pass? 'pass' : 'fail'}</span>
                     <button onclick ="deleteStudent(${student.id})">Delete</button>`;
      studentList.appendChild(div);
     
   });
}
addbtn.addEventListener("click",()=>{
     let currName=nameInput.value.trim();
    let currMarks=Number(marksInput.value.trim());
     if(currName===""|| currMarks<0||currMarks>100){
       errorMsg.style.display="block";
      }else{
        errorMsg.style.display="none";
        students.push({
        id:Date.now(),//unique id-current timesstamp
        name:currName,
        marks:currMarks,
        grade:getGrade(currMarks)
      });
      localStorage.setItem("students", JSON.stringify(students));
      UpdateStats();
      renderList(students);
      nameInput.value="";
      marksInput.value="";
      searchInput.value="";
      }
      
     

     
});
searchInput.addEventListener("input",()=>{
      const searchStudent=searchInput.value.trim().toLowerCase();
      const filtered=searchStudent?students.filter((s)=>
                s.name.toLowerCase().includes(searchStudent)):students;
      renderList(filtered);
     
});
renderList(students);
UpdateStats();
