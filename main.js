const plus = document.querySelector(".plus");
let theAdd = document.querySelector(".add");
const lightHouse = document.querySelector(".light-box");
const closeBtn = lightHouse.querySelector(".close");
let theBtn = document.querySelector(".btn");
let theNews = document.querySelector(".head h2");
let form = document.forms[0];
let theInputText = document.getElementById("adresses");
let theInputDesc = document.getElementById("description");
let getItemFromLocal = window.localStorage.getItem("task");

let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
];

// Set Option's
let theArray = [];
let isEdit = false,
  idEdit;

if (getItemFromLocal != null) {
  theArray = JSON.parse(getItemFromLocal);
}

showTaskToDom(theArray);

plus.addEventListener("click", () => {
  lightHouse.classList.add("active");
  theNews.innerHTML = "اضف ملحوظة جديدة";
  theBtn.innerHTML = "اضف";
  theInputText.value = "";
  theInputDesc.value = "";
});

closeBtn.addEventListener("click", () => {
  lightHouse.classList.remove("active");
  isEdit = false;
});

function submittedForm(e) {
  e.preventDefault();

  if (theInputText.value.trim() && theInputDesc.value.trim()) {
    addTaskToArray(theInputText.value.trim(), theInputDesc.value.trim());

    theInputText.value = "";

    theInputDesc.value = "";
    closeBtn.click();
  }
}

function addTaskToArray(taskOne, taskTwo) {
  let data = {
    title: taskOne,
    description: taskTwo,
    date: `${
      months[new Date().getMonth()]
    } ${new Date().getDate()}, ${new Date().getFullYear()}`,
  };

  if (isEdit) {
    theArray[idEdit] = data;
  } else {
    theArray.push(data);
  }

  showTaskToDom(theArray);

  window.localStorage.setItem("task", JSON.stringify(theArray));
}

function showTaskToDom(task) {
  document.querySelectorAll(".box").forEach((el) => el.remove());
  task.forEach((el, i) => {
    let card = `
        <div class="box">
      <h2>${el.title}</h2>
      <p class="text">${el.description}</p>
      <div class="items">
        <div class="times">
          <p>${el.date}</p>
        </div>
        <div class="right-side">
          <i class="fa-solid fa-ellipsis ellipsis"></i>
          <ul class="list">
            <li onclick='editItem(${i}, "${el.title}", "${el.description}")'>
              <i class="fa-solid fa-pen-to-square"></i>
              <span>Edit</span>
            </li>
            <li onclick='deletItem(${i})'>
              <i class="fa-solid fa-trash"></i>
              <span>Delete</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    `;
    theAdd.insertAdjacentHTML("afterend", card);
  });
}

function deletItem(indx) {
  let confirm = window.confirm("Do You Want To Delete This !!?");
  if (confirm) {
    theArray.splice(indx, 1);
    showTaskToDom(theArray);
    window.localStorage.setItem("task", JSON.stringify(theArray));
  }
}

function editItem(indx, mainTitle, mainDesc) {
  idEdit = indx;
  isEdit = true;
  plus.click();
  theInputText.value = mainTitle;
  theInputDesc.value = mainDesc;
  theBtn.innerHTML = "تحديث";
  theNews.innerHTML = "حدث المعلومات";
}

theBtn.addEventListener("click", submittedForm);
