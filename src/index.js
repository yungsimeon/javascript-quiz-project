document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");

  const resultContainer = document.querySelector("#result");

  quizView.style.display = "block";
  endView.style.display = "none";

  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question(
      "What is the capital of France?",
      ["Miami", "Paris", "Oslo", "Rome"],
      "Paris",
      1
    ),
    new Question(
      "Who created JavaScript?",
      ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"],
      "Brendan Eich",
      2
    ),
    new Question(
      "What is the mass–energy equivalence equation?",
      ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"],
      "E = mc^2",
      3
    ),
  ];
  const quizDuration = 120;

  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();

  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  const minutes = Math.floor(quiz.timeRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show first question
  showQuestion();

  /************  TIMER  ************/

  let timer;
  function startTimer() {
    timer = setInterval(() => {
      quiz.timeRemaining--;
      timeRemainingContainer.innerText = formatTime(quiz.timeRemaining);
      if (quiz.timeRemaining <= 0) {
        clearTimer();
        showResults();
      }
    }, 1000);
  }

  function clearTimer() {
    clearInterval(timer);
  }

  nextButton.addEventListener("click", nextButtonHandler);

  function showQuestion() {
    if (quiz.hasEnded()) {
      showResults();
      clearTimer();
      return;
    }

    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    const question = quiz.getQuestion();
    question.shuffleChoices();

    // YOUR CODE HERE:
    //
    // 1. Show the question
    // Update the inner text of the question container element and show the question text

    const pTag = document.createElement("p");
    pTag.innerText = question.text;
    const parent = document.getElementById("question");
    parent.appendChild(pTag);

    console.log(question.length);

    let progressPercentage =
      (quiz.currentQuestionIndex / quiz.questions.length) * 100;
    const progressBar = document.getElementById("progressBar");
    let perQuestionsAnswered = progressBar.setAttribute(
      "style",
      `width: ${progressPercentage}%`
    );

    // 3. Update the question count text
    // Update the question count (div#questionCount) show the current question out of total questions

    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${
      quiz.questions.length
    }`; //  This value is hardcoded as a placeholder

    // 4. Create and display new radio input element with a label for each choice.
    // Loop through the current question `choices`.
    // For each choice create a new radio input with a label, and append it to the choice container.
    // Each choice should be displayed as a radio input element with a label:
    /* 
          <input type="radio" name="choice" value="CHOICE TEXT HERE">
          <label>CHOICE TEXT HERE</label>
        <br>
      */
    // Hint 1: You can use the `document.createElement()` method to create a new element.
    // Hint 2: You can use the `element.type`, `element.name`, and `element.value` properties to set the type, name, and value of an element.
    // Hint 3: You can use the `element.appendChild()` method to append an element to the choices container.
    // Hint 4: You can use the `element.innerText` property to set the inner text of an element.
    question.choices.forEach((choice) => {
      const listItem = document.createElement("li");

      const inputElement = document.createElement("input");
      inputElement.setAttribute("type", "radio");
      inputElement.setAttribute("name", "choice");
      inputElement.setAttribute("value", choice);

      const labelElement = document.createElement("label");
      labelElement.innerText = choice;

      listItem.appendChild(inputElement);
      listItem.appendChild(labelElement);

      choiceContainer.appendChild(listItem);
    });
  }

  function nextButtonHandler() {
    let selectedAnswer; // A variable to store the selected answer value

    // YOUR CODE HERE:
    //
    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.
    const allChoices = document.querySelectorAll(
      "#choices input[type='radio']"
    );

    // 2. Loop through all the choice elements and check which one is selected
    // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
    //  When a radio input gets selected the `.checked` property will be set to true.
    //  You can use check which choice was selected by checking if the `.checked` property is true.
    allChoices.forEach((element) => {
      if (element.checked === true) {
        selectedAnswer = element.value;
      }

      return selectedAnswer;
    });

    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
    // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
    // Move to the next question by calling the quiz method `moveToNextQuestion()`.
    // Show the next question by calling the function `showQuestion()`.
    if (selectedAnswer) {
      quiz.checkAnswer(selectedAnswer);
      quiz.moveToNextQuestion();
      showQuestion();
    }
  }

  function showResults() {
    // YOUR CODE HERE:

    //
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`; // This value is hardcoded as a placeholder
  }
  const restartButton = document.getElementById("restartButton");
  restartButton.onclick = function () {
    endView.style.display = "none";
    quizView.style.display = "block";
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    showQuestion();
  };
  console.log("test");
});
