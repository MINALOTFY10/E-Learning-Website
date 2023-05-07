let toggleBtn = document.getElementById('toggle-btn');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () => {
   toggleBtn.classList.replace('fa-sun', 'fa-moon');
   body.classList.add('dark');
   localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () => {
   toggleBtn.classList.replace('fa-moon', 'fa-sun');
   body.classList.remove('dark');
   localStorage.setItem('dark-mode', 'disabled');
}

if (darkMode === 'enabled') {
   enableDarkMode();
}


let profile = document.querySelector('.header .flex .profile');


let search = document.querySelector('.header .flex .search-form');

document.querySelector('#search-btn').onclick = () => {
   search.classList.toggle('active');
   profile.classList.remove('active');
}

let sideBar = document.querySelector('.side-bar');

document.querySelector('#menu-btn').onclick = () => {
   sideBar.classList.toggle('active');
   body.classList.toggle('active');
}

document.querySelector('#close-btn').onclick = () => {
   sideBar.classList.remove('active');
   body.classList.remove('active');
}

window.onscroll = () => {
   profile.classList.remove('active');
   search.classList.remove('active');

   if (window.innerWidth < 1200) {
      sideBar.classList.remove('active');
      body.classList.remove('active');
   }
}
const registerForm = document.querySelector('#register-form');

window.addEventListener('DOMContentLoaded', () => {
   window.addEventListener('DOMContentLoaded', () => {
      const loginForm = document.querySelector('#login-form');
      const registerForm = document.querySelector('#register-form');

      if (loginForm) { // login page
         loginForm.addEventListener('submit', (e) => {
            e.preventDefault();




            const email = loginForm.email.value;
            const password = loginForm.pass.value;

            // send HTTP request to server to authenticate user
            fetch('/login', {
                  method: 'POST',
                  body: JSON.stringify({
                     email,
                     password
                  }),
                  headers: {
                     'Content-Type': 'application/json'
                  }
               })
               .then(response => {
                  if (!response.ok) {
                     throw new Error('Invalid email or password.');
                  }
                  // redirect to dashboard or welcome page
                  console.log("Login Success")
                  alert("Valid Registration");
                  // window.location.href = '/login';
               })
               .catch(error => {
                  console.error(error);
                  // display error message to user
                  alert(error.message);
               });
         });
      }

      if (registerForm) { // registration page
         registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            document.querySelector('.name').innerHTML = registerForm.name.value;

            const name = registerForm.name.value;
            const email = registerForm.email.value;
            const password = registerForm.pass.value;
            const confirmPassword = registerForm.c_pass.value;

            // validate password match
            if (password !== confirmPassword) {
               alert('Passwords do not match.');
               return;
            }

            // send HTTP request to server to register new user
            fetch('/register', {
                  method: 'POST',
                  body: JSON.stringify({
                     name,
                     email,
                     password
                  }),
                  headers: {
                     'Content-Type': 'application/json'
                  }
               })
               .then(response => {
                  if (!response.ok) {
                     throw new Error('User with this email already exists.');
                  }
                  // redirect to login page
                  console.log("** Login Success **")
                  window.location.href = '/login.html';
               })
               .catch(error => {
                  // console.error(error);
                  // // display error message to user
                  // alert(error.message);
               });
         });
      }
   });
});



// Select Elements
let questionCount = document.querySelector(".Question-count");
let submitButton = document.querySelector(".submit-button");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let titleCount = document.querySelector(".title-count");
let quizContainer = document.querySelector(".quiz-container");
let container = document.querySelector(".container");
let main = document.querySelector(".main");

let answer0 = document.querySelector(".answer0");
let answer1 = document.querySelector(".answer1");
let answer2 = document.querySelector(".answer2");
let answer3 = document.querySelector(".answer3");

let currentIndex = 0;
let totalRightAnswers = 0;
let totalCount;

let chosenAnswerArr = [];
let rightAnswerArr = [];


// Fucntion to Do Request
function getRepos() {
   var myRequest = new XMLHttpRequest();

   myRequest.onreadystatechange = function () {

      if (this.readyState === 4 && this.status === 200) {
         var myJsObject = JSON.parse(this.responseText);
         totalCount = myJsObject.questions.length;

         // Create Bullets + Set Questions Count
         createBullets(totalCount);
         countCreator(currentIndex, totalCount);

         // Add Question Data
         addQuestionData(myJsObject.questions[currentIndex], totalCount);

         submitButton.onclick = () => {
            // Get Right Answer
            let theCorrectAnswer = myJsObject.questions[currentIndex]['correct_answer'];

            // Check The Answer
            checkAnswer(myJsObject.questions[currentIndex], theCorrectAnswer, totalCount);

            // Increase Index
            currentIndex++;

            countCreator(currentIndex, totalCount);

            // Check if there are more questions to display
            if (currentIndex < totalCount) {
               // Remove Previous Question
               // Remove Previous Question
               quizArea.innerHTML = "";
               answersArea.innerHTML = "";

               // Handle Bullets Class
               handleBullets();

               // Add Question Data
               addQuestionData(myJsObject.questions[currentIndex], totalCount);

            } else {
               // All questions have been answered, show a message or redirect to another page
               console.log("Quiz completed!");
            }
            showResults(totalCount);
         }
      }
   }

   myRequest.open('GET', 'questions.json', true);
   //myRequest.open('GET', 'questions.json', true);

   myRequest.send();
}

getRepos();

function countCreator(index, count) {
   // document.querySelector(".Question-count").innerHTML = count;
   // document.querySelector(".question-index").innerHTML = index + 1;
   document.querySelector(".question-index2").innerHTML = index + 1;
}

function addQuestionData(obj, count) {
   if (currentIndex < count) {
      // change the photo

      // Create H2 Question Title
      let questionTitle = document.createElement("h2");

      // Create Question Text
      let questionText = document.createTextNode(obj['question']);

      // Append Text To H2
      questionTitle.appendChild(questionText);

      // Append The H2 To The Quiz Area
      quizArea.appendChild(questionTitle);

      // Create The Answers
      for (let i = 0; i < 4; i++) {
         // Create Main Answer Div
         let mainDiv = document.createElement("div");

         // Add Class To Main Div
         mainDiv.className = `answer${i}`;

         // Create Radio Input
         let radioInput = document.createElement("input");

         // Add Type + Name + Id + Data-Attribute
         radioInput.name = "question";
         radioInput.type = "radio";
         radioInput.id = `answer_${i}`;
         radioInput.dataset.answer = obj[`answer_${i}`];

         // Make First Option Selected
         if (i === 0) {
            radioInput.checked = true;
         }

         // Create Label
         let theLabel = document.createElement("label");

         // Add For Attribute
         theLabel.htmlFor = `answer_${i}`;

         // Create Label Text
         let theLabelText = document.createTextNode(obj['answers'][i]);

         // Add The Text To Label
         theLabel.appendChild(theLabelText);

         // Add Input + Label To Main Div
         mainDiv.appendChild(radioInput);
         mainDiv.appendChild(theLabel);

         // Append All Divs To Answers Area
         answersArea.appendChild(mainDiv);
      }
   }
}

function checkAnswer(obj, rAnswer, count) {
   let answers = document.getElementsByName("question");
   let theChoosenAnswer;

   for (let i = 0; i < answers.length; i++) {
      if (answers[i].checked) {
         theChoosenAnswer = obj['answers'][i];
         console.log(obj['answers'][i]);
      }
   }

   if (rAnswer === theChoosenAnswer) {
      totalRightAnswers++;
   }

   chosenAnswerArr.push(theChoosenAnswer);
   rightAnswerArr.push(rAnswer);
}

let resultDiv = document.createElement("div");
resultDiv.className = "results";

let questionNumber = document.querySelector(".question-number");

function showResults(count) {
   let theResults;
   if (currentIndex === count) {

      container.remove();
      main.appendChild(resultDiv); // add this line to append resultDiv to main

      resultDiv.style.backgroundImage = "url('https://images.typeform.com/images/spgAayma3fmN/background/large')";
      resultDiv.style.backgroundSize = "cover";
      resultDiv.style.backgroundColor = "rgba(255, 255, 255, 10)"; // 0.8 is the alpha channel value for 80% opacity

      let theResults = `
        <div><p style="font-weight: 700;">You scored ${totalRightAnswers}/${count}</p></div>
      `;



      resultDiv.innerHTML = theResults;
      resultDiv.style.padding = "10px";
      resultDiv.style.backgroundColor = "white";
      resultDiv.style.marginTop = "10px";
   }
}

let bulletsSpanContainer = document.querySelector(".bullets .spans");
let countSpan = document.querySelector(".count span");

function createBullets(num) {
   // Create Spans
   for (let i = 0; i < num; i++) {
      // Create Bullet
      let theBullet = document.createElement("span");

      // Check If Its First Span
      if (i === 0) {
         theBullet.className = "on";
      }

      // Append Bullets To Main Bullet Container
      bulletsSpanContainer.appendChild(theBullet);
   }
}

function handleBullets() {
   let bulletsSpans = document.querySelectorAll(".bullets .spans span");
   let arrayOfSpans = Array.from(bulletsSpans);
   arrayOfSpans.forEach((span, index) => {
      if (currentIndex === index) {
         span.className = "on";
      }
   });
}


const warmupLink = document.querySelector('a[href="#"]');
const fileInput = document.querySelector('#fileInput');
const status = document.querySelector('td:nth-child(2)');

warmupLink.addEventListener('click', () => {
   fileInput.click();
});

fileInput.addEventListener('change', () => {
   status.textContent = 'Submitted';
});