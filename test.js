      // Set up the OpenAI API client with your API key
      const openai = require('@openai/api');
      const apiKey = 'YOUR_API_KEY_HERE';
      const gptClient = new openai(apiKey);

      // Define variables for the original word and the guessed word
      let originalWord;
      let guessedWord;

      // Retrieve a random word from the Datamuse API and set it as the original word
      fetch('https://api.datamuse.com/words?max=1')
        .then(response => response.json())
        .then(data => originalWord = data[0].word)
        .catch(error => console.error(error));

      // Define the checkGuess function
      function checkGuess() {
        guessedWord = document.getElementById("guessInput").value.toLowerCase();
        const prompt = `What is the similarity between "${originalWord}" and "${guessedWord}"?`;
        gptClient.complete({
          engine: 'text-davinci-002',
          prompt,
          maxTokens: 1024,
          n: 1,
          stop: '\n'
        }).then(response => {
          const similarity = response.data.choices[0].text.trim();
          const result = document.getElementById("result");
          if (similarity === '1') {
            result.innerHTML = `Congratulations! You guessed the secret word "${originalWord}" with a similarity score of ${similarity}.`;
          } else {
            result.innerHTML = `Your guess "${guessedWord}" is not the secret word. Its similarity score to the secret word "${originalWord}" is ${similarity}. Keep guessing!`;
          }
        }).catch(error => console.error(error));
      }