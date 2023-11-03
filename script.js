const themes = {
    animais: ["tigre", "elefante", "leão", "girafa", "macaco", "cobra"],
    cores: ["vermelho", "azul", "amarelo", "verde", "roxo", "laranja"],
    frutas: ["maçã", "banana", "morango", "uva", "abacaxi", "pêssego"],
    países: ["brasil", "estadosunidos", "canadá", "alemanha", "índia", "china"]
};

let selectedTheme = null;
let selectedWord = null;
let guessedLetters = [];
let attempts = 10;

function chooseTheme(theme) {
    const themeButtons = document.querySelectorAll("button[id$='Btn']");
    themeButtons.forEach(button => button.classList.remove("selected"));

    selectedTheme = theme;
    selectedWord = themes[selectedTheme][Math.floor(Math.random() * themes[selectedTheme].length)];
    guessedLetters = [];
    attempts = 10;
    document.getElementById("attempts").textContent = attempts;
    document.getElementById("message").textContent = "";
    document.getElementById("letter").disabled = false;
    displayWord();
    document.getElementById(`${theme}Btn`).classList.add("selected");
}

function resetGame() {
    if (selectedTheme) {
        selectedWord = themes[selectedTheme][Math.floor(Math.random() * themes[selectedTheme].length)];
        guessedLetters = [];
        attempts = 10;
        document.getElementById("attempts").textContent = attempts;
        document.getElementById("message").textContent = "";
        document.getElementById("letter").disabled = false;
        displayWord();
    } else {
        document.getElementById("message").textContent = "Escolha um tema antes de jogar.";
    }
    const guessInput = document.getElementById("guess");
    guessInput.value = '';
    guessInput.disabled = false;
}

function displayWord() {
    const wordContainer = document.getElementById("word");
    wordContainer.innerHTML = selectedWord
        .split("")
        .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
        .join(" ");
}

function checkGuess() {
    const guessInput = document.getElementById("guess");
    const guess = guessInput.value.toLowerCase();

    if (guess === selectedWord) {
        document.getElementById("word").textContent = selectedWord; // Preenche as lacunas com a palavra correta
        document.getElementById("message").textContent = `Parabéns, você acertou! A palavra era "${selectedWord}".`;
        document.getElementById("letter").disabled = true;
        guessInput.disabled = true;
    } else {
        document.getElementById("message").textContent = `Palpite incorreto. Tente novamente!`;
    }
}

function checkLetter() {
    const letterInput = document.getElementById("letter");
    const letter = letterInput.value.toLowerCase();

    if (guessedLetters.includes(letter)) {
        document.getElementById("message").textContent = "Você já tentou essa letra.";
    } else if (selectedWord.includes(letter)) {
        guessedLetters.push(letter);
        document.getElementById("message").textContent = "Letra correta!";
    } else {
        guessedLetters.push(letter);
        document.getElementById("message").textContent = "Letra incorreta!";
        attempts--;
        document.getElementById("attempts").textContent = attempts;
    }

    letterInput.value = "";
    displayWord();

    if (attempts <= 0) {
        document.getElementById("message").textContent = `Você perdeu! A palavra era "${selectedWord}".`;
        document.getElementById("letter").disabled = true;
    }

    if (!selectedWord.split("").some(letter => !guessedLetters.includes(letter))) {
        document.getElementById("message").textContent = "Parabéns, você ganhou!";
        document.getElementById("letter").disabled = true;
    }
}

// Chama resetGame() quando a página é carregada para iniciar o jogo
window.onload = resetGame;
