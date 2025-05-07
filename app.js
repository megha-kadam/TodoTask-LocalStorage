const cl = console.log;

const stdForm = document.getElementById('stdForm');
const fNameControl = document.getElementById('fName');
const lNameControl = document.getElementById('lName');
const emailControl = document.getElementById('email');
const contactControl = document.getElementById('contact');
const addStdBtn = document.getElementById('addStdBtn');
const updateStdBtn = document.getElementById('updateStdBtn');
const stdList = document.getElementById('stdList');

let stdArr =[];

if(localStorage.getItem('stdArr')){
    stdArr = JSON.parse(localStorage.getItem('stdArr'))
}

const generateUuid = ()=> {
    return (
      String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
});
};

const createTr = (arr) => {
    let result = '';
    arr.forEach((std, i) => {
        result += ` <tr id='${std.stdId}'>
                        <td>${i + 1}</td>
                        <td>${std.fName}</td>
                        <td>${std.fName}</td>
                        <td>${std.email}}</td>
                        <td>${std.contact}</td>
                        <td>
                            <button class="btn btn-sm btn-outline-info" onclick='onEditStd(this)'>Edit</button>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-outline-danger" onclick='onRemoveStd(this)'>Remove</button>
                        </td>
                    </tr>`
    });
    stdList.innerHTML = result;
}
createTr(stdArr);

const onEditStd = (ele) => {
    let editId = ele.closest('tr').id;
    cl(editId);
    localStorage.setItem('editId', editId);

    let editObj = stdArr.find(std => std.stdId === editId);
    cl(editObj);

    localStorage.setItem('stdArr', JSON.stringify(stdArr));
    addStdBtn.classList.add('d-none');
    updateStdBtn.classList.remove('d-none');

    fNameControl.value = editObj.fName;
    lNameControl.value = editObj.lName;
    emailControl.value = editObj.email;
    contactControl.value = editObj.contact;
}

const onRemoveStd = (ele) => {
    let getConfirm = confirm('Are you sure to remove this student');
    cl(getConfirm);

    if(getConfirm){
        let removeId = ele.closest('tr').id;
        cl(removeId);

        let getIndex = stdArr.findIndex(std => std.stdId === removeId);
        cl(getIndex);

        localStorage.setItem('stdArr', JSON.stringify(stdArr));
        ele.closest('tr').remove();
        let getAllTr = [...document.querySelectorAll('#stdList tr')];
        getAllTr.forEach(ele => ele.firstElementChild === i + 1);
    }
}


const onAddStd = (eve) =>{
    eve.preventDefault();
    let stdObj = {
        fName : fNameControl.value,
        lName : lNameControl.value,
        email : emailControl.value,
        contact : contactControl.value,
        stdId : generateUuid(),
    }
    cl(stdObj);
    stdArr.push(stdObj);
    eve.target.reset();

    localStorage.setItem('stdArr', JSON.stringify(stdArr));

    let tr = document.createElement('tr');
    tr.id = stdObj.stdId;
    tr.innerHTML = ` <td>${stdArr.length}</td>
                        <td>${stdObj.fName}</td>
                        <td>${stdObj.lName}</td>
                        <td>${stdObj.email}}</td>
                        <td>${stdObj.contact}</td>
                        <td>
                            <button class="btn btn-sm btn-outline-info" onclick='onEditStd(this)'>Edit</button>
                        </td>
                        <td>
                            <button class="btn btn-sm btn-outline-danger" onclick='onRemoveStd(this)'>Remove</button>
                        </td>`;
    stdList.append(tr);
}

const onUpdateStd = () => {
    let updateId = localStorage.getItem('editId');
    let updateObj = {
        fName : fNameControl.value,
        lName : lNameControl.value,
        email : emailControl.value,
        contact : contactControl.value,
        stdId : updateId,
    }
    cl(updateObj);

    let getIndex = stdArr.findIndex(std => std.stdId === updateId);
    stdArr[getIndex] = updateObj;

    
    localStorage.setItem('stdArr', JSON.stringify(stdArr));
    addStdBtn.classList.remove('d-none');
    updateStdBtn.classList.add('d-none');
    stdForm.reset();

    let tr = [...document.getElementById(updateId).children];
    tr[1].innerHTML = updateObj.fName;
    tr[2].innerHTML = updateObj.lName;
    tr[3].innerHTML = updateObj.email;
    tr[4].innerHTML = updateObj.contact;
}

stdForm.addEventListener('submit', onAddStd);
updateStdBtn.addEventListener('click', onUpdateStd);