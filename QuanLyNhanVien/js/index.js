function getElement(selector){
    return document.querySelector(selector);
}
let staffList = [];
function staff(account,name,email,pw,date,salary,duty,w_time){
    this.account = account;
    this.name = name;
    this.email = email;
    this.pw = pw;
    this.date = date;
    this.salary = salary;
    this.duty = duty ;
    this.w_time = w_time;
}
staff.prototype.xl = function() {
    if(this.w_time >= 192){
        return "Nhân viên xuất sắc"
    }else if(this.w_time >= 176){
        return "Nhân viên giỏi"
    }else if(this.w_time >= 160){
        return " Nhân viên khá"
    }else{
        return "Nhân viên trung bình"
    }
}
staff.prototype.totalSalary = function(){
    if(this.duty == "Sếp"){
        return this.salary*3;
    }else if(this.duty == "Trưởng phòng"){
        return this.salary*2;
    }else{
        return this.salary;
    }
}
function getInfo(){
    let account = getElement("#tknv").value ;
    let name = getElement("#name").value ;
    let email = getElement("#email").value ;
    let pw = getElement("#password").value ;
    let date = getElement("#datepicker").value ;
    let salary = +getElement("#luongCB").value ;
    let duty = getElement("#chucvu").value ;
    let w_time = +getElement("#gioLam").value ;
    if(validation(account,name,email,pw,date,salary,duty,w_time) == true){
        let newstaff = new staff(account,name,email,pw,date,salary,duty,w_time);
        staffList.push(newstaff);
    }
}
function printInfo(){
    getInfo();
    let inner = ""
    for(let i = 0 ; i < staffList.length;i++){
        let newstaff = staffList[i];
        inner += `
        <tr>
        <td>${newstaff.account}</td>
        <td>${newstaff.name}</td>
        <td>${newstaff.email}</td>
        <td>${newstaff.date}</td>
        <td>${newstaff.duty}</td>
        <td>${newstaff.totalSalary()}</td>  
        <td>${newstaff.xl()}</td>  
        <td>
        <button class="btn btn-primary" onclick="update('${newstaff.account}')">Cập nhật</button>
        <button class="btn btn-danger" onclick="deletestaff('${newstaff.account}')">Xóa</button>
        </td>
        </tr>
        `
    }
    document.querySelector("#tableDanhSach").innerHTML = inner;
}
function rendertable(staffList){
    let inner = ""
    for(let i = 0 ; i < staffList.length;i++){
        let newstaff = staffList[i];
        inner += `
        <tr>
        <td>${newstaff.account}</td>
        <td>${newstaff.name}</td>
        <td>${newstaff.email}</td>
        <td>${newstaff.date}</td>
        <td>${newstaff.duty}</td>
        <td>${newstaff.totalSalary()}</td>  
        <td>${newstaff.xl()}</td>  
        <td>
        <button class="btn btn-primary" onclick="update('${newstaff.account}')>Cập nhật </button>
        <button class="btn btn-danger" onclick="deletestaff('${newstaff.account}')>Xóa</button>
        </td>
        </tr>
        `
    }
    document.querySelector("#tableDanhSach").innerHTML = inner;
}
function deletestaff(account){
    staffList = staffList.filter(function(value){
        if(value.account != account){
            return value;
        }
    }, )
    rendertable(staffList);
}
function validation(account,name,email,pw,date,salary,duty,w_time){
    let isValid = true ;
    if(!account.trim()){
        getElement("#tbTKNV").innerHTML = "Không để trống tài khoản"
        isValid = false;
    }else if(!/[a-z]|[A-Z]|[0-9]{4,6}/.test(account)){ 
        getElement("#tbTKNV").innerHTML = "Tài khoản không hợp lệ (có chữ và cả số )";
        isValid = false;
    }
    if(!name.trim()){
        getElement("#tbTen").innerHTML = "Không để trống tên "
        isValid = false;
    }else if(!/[a-z]|[A-Z]|\s/g.test(name)){
        getElement("#tbTen").innerHTML = "Tên không hợp lệ (không tồn tại số)";
        isValid = false;
    }
    if(!email.trim()){
        getElement("#tbEmail").innerHTML = "Không để trống email "
        isValid = false;
    }else if(!/[A-Z]|[a-z]|[0-9]|(@gmail\.com)/.test(email)){
        getElement("#tbEmail").innerHTML = "Email không đúng định dạng ( không chứa dấu , đuôi cần có @gmail.com )"
        isValid = false;
    }
    if(!pw.trim()){
        getElement("#tbMatKhau").innerHTML = "Không để trống mật khẩu "
        isValid = false;
    }else if(!/^(?=.*[A-Z]+)(?=.*[0-9]+)(?=.*[!@#\$%\^&Z\*\)\(\\'"\?<>]+).{6,10}$/.test(pw)){
        isValid = false;
        getElement("#tbMatKhau").innerHTML = "Mật khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
    }
    if(!date.trim()){
        getElement("#tbNgay").innerHTML = "không để trống mật khẩu"
        isValid = false;
    }else if(!/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/.test(date)){
        isValid = false;
        getElement("#tbNgay").innerHTML = "Ngày làm việc không đúng định dạng (mm/dd/yyyy)";
    }
    if(salary < 1000000 || salary > 20000000){
        getElement("#tbLuongCB").innerHTML = "Lương cơ bản không hợp lệ ( 1tr - 20tr )"
        isValid = false;
    }
    if(duty == "Chọn chức vụ"){
        getElement("#tbChucVu").innerHTML = "không được bỏ trống chức vụ "
        isValid = false;
    }
    if(w_time < 80 || w_time > 200){
        getElement("#tbGiolam").innerHTML = "Giờ làm không hợp lệ ( 80h-200h) "
        isValid = false;
    }
    if(isValid == false){
       const bug = document.querySelectorAll("span.sp-thongbao");
       for(let i = 0 ; i < bug.length ;i++){
        bug[i].style.display = "inline";
       }
    }else{
        const bug = document.querySelectorAll("span.sp-thongbao");
        for(let i = 0 ; i < bug.length ;i++){
         bug[i].style.display = "none";
        }
    }
    return isValid;
}