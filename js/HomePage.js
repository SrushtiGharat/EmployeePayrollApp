let employeePayrollList;

//Event listener when HTML page contents are loaded
window.addEventListener('DOMContentLoaded',(event)=>
    {
        if(site_properties.use_local_storage.match("true"))
        {
            GetEmployeeDataLocalStorage();
        }
        else
        {
            GetEmployeeDataServer();
        }
    }
);

//Get data from local storage
function GetEmployeeDataLocalStorage()
{
    employeePayrollList = localStorage.getItem('EmployeePayrollList')?
                    JSON.parse(localStorage.getItem('EmployeePayrollList')):[];
    ProcessResponse();
}

//Get data from Json Server
function GetEmployeeDataServer()
{
    makeServiceCall("GET", site_properties.server_url, true)
            .then(responseText => {
                employeePayrollList = JSON.parse(responseText);
                ProcessResponse();
            })
            .catch(error => {
                console.log("GET Error Status: " + JSON.stringify(error));
                employeePayrollList = [];
                ProcessResponse();
            });
}

function ProcessResponse()
{
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    localStorage.removeItem('EditEmployee');
    CreateInnerHTML();
}

//Insert content to the html table using js
function CreateInnerHTML()
{
    const headerHTML = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>"
    let innerHTML = `${headerHTML}`;
    for(const employeePayrollData of employeePayrollList)
    {
        innerHTML = `${innerHTML}       
        <tr>
        <td><img class="profile" alt = "" src="${employeePayrollData.profilePhoto}"></td>
        <td>${employeePayrollData.name}</td>
        <td>${employeePayrollData.gender}</td>
        <td>${GetDepartment(employeePayrollData.department)}</td>
        <td>${employeePayrollData.salary}</td>
        <td>${GetDate(employeePayrollData.startDate)}</td>
        <td>
            <img id="${employeePayrollData.id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
            <img id="${employeePayrollData.id}" onclick="update(this)" alt="edit" src="../assets/icons/create-black-18dp.svg">
        </td>
        </tr>`;
    }
    document.querySelector('#table').innerHTML = innerHTML;
}

//Remove employee from table
function remove(node)
{
    let empData = employeePayrollList.find(emp=>emp.id == node.id);
    if(!empData) return;
    let index = employeePayrollList.map(emp=>emp.id).indexOf(empData.id);
    employeePayrollList.splice(index,1);
    localStorage.setItem('EmployeePayrollList',JSON.stringify(employeePayrollList));
    document.querySelector('.emp-count').textContent = employeePayrollList.length;
    CreateInnerHTML();
}

//Update data
function update(node)
{
    let empData = employeePayrollList.find(emp=>emp.id == node.id);
    if(!empData) return;
    localStorage.setItem('EditEmployee',JSON.stringify(empData));
    window.location.replace(site_properties.add_emp_payroll_page);
}

//Get departments for a employee to display on HTML page
function GetDepartment(deptList)
{
    let departments = '';
    for(const dept of deptList)
    {
        departments = `${departments} <div class='dept-label'>${dept}</div>`
    }
    return departments;
}

//Get date in particular format
function GetDate(startDate)
{
    let month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let date = new Date(startDate);
    return date.getDate()+" "+month[date.getMonth()]+" "+date.getFullYear();
}
