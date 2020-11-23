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

function SaveToLocalStorage(employeeData)
{
    let employeeList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeeList != undefined)
    {
        employeeList.push(employeeData);
    }
    else
    {
        employeeList = [employeeData];
    }
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeeList));
    alert("Employee added successfully!");
}