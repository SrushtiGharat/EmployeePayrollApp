const checkName = (name)=>{
    let regex_Name = RegExp("^[A-Z]{1}[A-Za-z]{2,}$");
        if(!regex_Name.test(name))
            throw "Name is invalid";
}

const checkStartDate = (startDate)=>{
    if(startDate > new Date())  
        throw "Date is invalid"
}