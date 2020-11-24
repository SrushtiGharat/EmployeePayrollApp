let isUpdate = false;
let empPayrollObject = {}; 

window.addEventListener('DOMContentLoaded',(event)=>
{
    //Event listener for salary
    const salary=document.querySelector('#salary');
    const output=document.querySelector('.salary-output-text');
        output.textContent=salary.value;
        salary.addEventListener('input',function(){
            output.textContent=salary.value;
        })

    //Event listener for name field
    const name=document.querySelector('#name');
    const nameError=document.querySelector('.name-error');
            name.addEventListener('input', function(){
                let nameRegex= new RegExp(/^[A-Z][a-z]{2,}$/);
                if(nameRegex.test(name.value))
                nameError.textContent="";
                else
                nameError.textContent="Name is Invalid";
            })
    CheckUpdate();
});

//Save Employee details
function save()
{
     let employeeData = CreateEmployeeObject();
     SaveToLocalStorage(employeeData);       
}

//Create an object of Employee class
function CreateEmployeeObject()
{
    try{

        let employee = new Employee();
        employee.Name = document.getElementById('name').value;    
        let profile = document.getElementsByName('profile');       
        for(i = 0; i < profile.length; i++)
        {
            if(profile[i].checked)
                employee.ProfilePhoto = profile[i].value;
        }            
        let gender = document.getElementsByName('gender');
        for(i = 0; i < gender.length; i++)
        {
            if(gender[i].checked)
                employee.Gender = gender[i].value;
        } 
        let empDepartment = new Array();
        let department = document.getElementsByName('department');
        for(i = 0; i < department.length; i++)
        {
            if(department[i].checked)
                empDepartment.push(department[i].value);
        } 
        employee.Department = empDepartment;
        employee.Salary = document.getElementById('salary').value;        
        let startDate = new Date(document.querySelector('#year').value+"-"+document.querySelector('#month').value+"-"+document.querySelector('#day').value);
        employee.StartDate = startDate;
        employee.Notes = document.querySelector('#notes').value;

        return employee;
    }
    catch(e)
    {
        alert(e);
    }
}

// Save data to local HTML Storage
function SaveToLocalStorage(employeeData)
{
    let employeeList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    
    if(employeeList != undefined)
    {
        employeeData.Id = employeeList.length+1;       
        employeeList.push(employeeData);
    }
    else
    {
        employeeData.Id = 1;
        employeeList = [employeeData];
    }
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeeList));
    alert("Employee added successfully!");
    Reset();
}

//Reset form on click of reset button
function Reset()
{
    document.querySelector('#name').value = '';
    document.querySelector('.name-error').textContent = '';
    document.querySelectorAll('[name=profile]').forEach(a=>{a.checked = false;});
    document.querySelectorAll('[name=gender]').forEach(a=>{a.checked = false;});
    document.querySelectorAll('[name=department]').forEach(a=>{a.checked = false;});
    document.querySelector('#salary').value = '400000';
    document.querySelector('.salary-output-text').value='400000';
    document.querySelector('#day').value = '1';
    document.querySelector('#month').value = 'January';
    document.querySelector('#year').value = '2016';
    document.querySelector('#notes').value = '';
}

//Check for update
function CheckUpdate()
{
    let empUpdate = localStorage.getItem('EditEmployee');
    isUpdate = empUpdate?true:false;
    if(!isUpdate) return;
    empPayrollObject = JSON.parse(empUpdate);
    SetForm();
}

//Set the form if update is true
function SetForm()
{
    document.querySelector('#name').value = empPayrollObject._name;
    document.querySelector('.name-error').textContent = '';
    SetSelectedValues('[name=profile]',empPayrollObject._profilePhoto);
    SetSelectedValues('[name=gender]',empPayrollObject._gender);
    SetSelectedValues('[name=department]',empPayrollObject._department);
    document.querySelector('#salary').value = empPayrollObject._salary;
    document.querySelector('.salary-output-text').value = empPayrollObject._salary;
    document.querySelector('#notes').value = empPayrollObject._notes;
    SetDate(empPayrollObject._startDate);
}

function SetSelectedValues(property,value)
{
    document.querySelectorAll(property).forEach(item=>
    {
        if(Array.isArray(value))
        {
            if(value.includes(item.value))
                item.checked = true;
        }
        else if(item.value == value)
        {
            item.checked = true;
        }
    });    
}

function SetDate(startDate)
{
    let date = new Date(startDate);
    let month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    document.querySelector('#day').value = date.getDate();
    document.querySelector('#month').value = month[date.getMonth()];
    document.querySelector('#year').value = date.getFullYear();
}