(function() {
  const myQuestions = [
    {
      question: "Who is Jian's Sister in Doraemon?",
      answers: {
        a: "Sizuka",
        b: "Jackio",
        c: "Me Chan",
        d: "Doraemi"
      },
      correctAnswer: "c"
    },
    {
      question: "What does Doraemon loves to eat?",
      answers: {
        a: "Rice Cakes",
        b: "Hakka Noodles",
        c: "Ice Cream",
        d: "Dora Cakes"
      },
      correctAnswer: "d"
    },
    {
      question: "Who is Shinchan's Sister?",
      answers: {
        a: "Me Chan",
        b: "HeemaWari",
        c: "Nanny",
        d: "Mimiko"
      },
      correctAnswer: "b"
    },
    {
      question: "In Dexter's Laboratory What Was The Name Of Dexter's Rival? ",
      answers: {
        a: "Marko",
        b: "Mandark",
        c: "Morton",
        d: "Michael"
      },
      correctAnswer: "b"
    }
    ,
    {
      question: "Which channel is Courage The Cowardly Dog broadcasted on?",
      answers: {
        a: "Caroon Network",
        b: "Hungama",
        c: "Pogo",
        d: "Disney"
      },
      correctAnswer: "a"
    }
    ,
    {
      question: "What is the name of Penguin in Oswald ?",
      answers: {
        a: "Stanley",
        b: "Cortel",
        c: "Stephen",
        d: "Henry"
      },
      correctAnswer: "d"
    }
    ,
    {
      question: "Which animal is Oswald ?",
      answers: {
        a: "Octopus",
        b: "Fish",
        c: "Penguin",
        d: "Monkey"
      },
      correctAnswer: "a"
    }
    ,
    {
      question: "How Old is Ben in Ben10",
      answers: {
        a: "9",
        b: "11",
        c: "8",
        d: "10"
      },
      correctAnswer: "d"
    }
    ,
    {
      question: "What alien fights the Maggot Monster before he destroys Las Vegas?",
      answers: {
        a: "Cannon Ball",
        b: "Wildvine",
        c: "FourArms",
        d: "None of these"
      },
      correctAnswer: "c"
    }
    ,
    {
      question: "What is the name of Black Cat that also wants to catch Jerry ?",
      answers: {
        a: "Mickey",
        b: "Bucky",
        c: "Bully",
        d: "Butch"
      },
      correctAnswer: "d"
    }
    ,
    {
      question: "What is the original name of Tom and Jerry ?",
      answers: {
        a: "Jasper and Jinx",
        b: "Jasper and Jade",
        c: "Jade and Jinx",
        d: "Jane and Jaddy"
      },
      correctAnswer: "a"
    }
  ];

  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label class="btn btn-primary " id="lab">
             <input type="radio" name="question${questionNumber}"  value="${letter}">
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide ">
           <div class="question text-center"><h1> ${currentQuestion.question} </h1></div>
           <div class="container">
           <div class="answers"> ${answers.join("")} </div>
           </div>
         </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }


  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // display quiz right away
  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
