import React, { useState } from 'react';
import './styles.css';

// voice recognition variables
const SpeechRecognition =
  window.speechRecogition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

export default function App() {
  const [text, setText] = useState(
    'Please click on button to start speech Recognition'
  );

  const [count, setCount] = useState(0);

  const [stopReco, setStopReco] = useState(true);

  //recognition properties

  recognition.onstart = function () {
    setText('Voice recognition activated. Try speaking into the microphone.');
  };

  recognition.onresult = function (event) {
    setText(' ');
    var current = event.resultIndex;

    var transcript = event.results[current][0].transcript;

    setText(transcript);

    if (
      transcript === 'next' ||
      transcript === 'next next' ||
      transcript === 'increment' ||
      transcript === 'increment increment'
    ) {
      setCount(count + 1);
    } else if (
      transcript === 'back' ||
      transcript === 'back back' ||
      transcript === 'decrement' ||
      transcript === 'decrement decrement'
    ) {
      setCount(count - 1);
    } else if (transcript === 'stop' || transcript === 'stopstop') {
      recognition.stop();
      setText('Voice recognition stopped');
      setStopReco(true);
    }
  };

  recognition.onend = function () {
    if (stopReco) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  //start recognition
  const handleSubmit = (e) => {
    e.preventDefault();
    if (stopReco) {
      setStopReco(false);
      recognition.start();
    } else {
      recognition.stop();
      setText('Voice recognition stopped');
      setStopReco(true);
    }
  };

  return (
    <div className="App">
      <h1>React Js Voice Controlable Counter App</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <button type="submit">
          {stopReco ? 'Start Recognition' : 'Stop Recognition'}
        </button>
      </form>

      <p>{text}</p>
      <p>Count: {count}</p>
    </div>
  );
}
