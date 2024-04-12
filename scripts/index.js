import { dataCourses } from "./data_courses.js";
import { student } from "./data_student.js";
const coursesTbody = document.getElementById('courses');
const inputSearchBox = document.getElementById('search-box');
const btnfilterByName = document.getElementById('button-filterByName');
const totalCreditElm = document.getElementById('creditos');
const studentInfo = document.getElementById('student-info');
const form = document.getElementById('form');
function getTotalCredits(courses) {
    let totalCredits = 0;
    courses.forEach((course) => totalCredits = totalCredits + course.credits);
    return totalCredits;
}
function renderCoursesInTable(courses) {
    courses.forEach(c => {
        let trElement = document.createElement("tr");
        trElement.innerHTML = `<td>${c.name}</td> <td>${c.professor}</td> <td>${c.credits}</td>`;
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInfo() {
    studentInfo.innerHTML = `
    <tr>
      <td class="table-dark">Código</td>
      <td>${student.codigo}</td>
    </tr>
    <tr>
      <td class="table-dark">Cédula</td>
      <td>${student.cedula}</td>
    </tr>
    <tr>
      <td class="table-dark">Edad</td>
      <td>${student.edad} años</td>
    </tr>
    <tr>
      <td class="table-dark">Dirección</td>
      <td>${student.direccion}</td>
    </tr>
    <tr>
      <td class="table-dark">Teléfono</td>
      <td>${student.telefono}</td>
    </tr>
  `;
}
function clearCoursesInTable() {
    coursesTbody.innerHTML = '';
}
function applyFilterByName() {
    let text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    let coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
    totalCreditElm.innerHTML = `<b>${getTotalCredits(coursesFiltered)}</b>`;
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(c => c.name.toLowerCase().match(nameKey.toLowerCase()));
}
btnfilterByName.addEventListener('click', () => applyFilterByName());
form.addEventListener('submit', (e) => {
    e.preventDefault();
    applyFilterByName();
});
document.addEventListener('DOMContentLoaded', () => {
    applyFilterByName();
    renderStudentInfo();
});
