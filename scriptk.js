let timers = [];
    
    const timersContainer = document.getElementById('timers');
    const addTimerButton = document.getElementById('addTimerButton');
    
    addTimerButton.addEventListener('click', addTimer);
    
    function addTimer() {
      const timerId = `timer_${timers.length + 1}`;
      const timerDiv = document.createElement('div');
      timerDiv.id = timerId;
      timerDiv.classList.add('timer');
      
      const timerDisplay = document.createElement('div');
      timerDisplay.classList.add('timer-display');
      timerDisplay.textContent = '00:00:00';
      
      const eventNameInput = document.createElement('input');
      eventNameInput.type = 'text';
      eventNameInput.placeholder = 'Event Name';
      
      const startButton = document.createElement('button');
      startButton.textContent = 'Start';
      startButton.addEventListener('click', () => startTimer(timerId));
      
      const stopButton = document.createElement('button');
      stopButton.textContent = 'Stop';
      stopButton.addEventListener('click', () => stopTimer(timerId));
      
      const resetButton = document.createElement('button');
      resetButton.textContent = 'Reset';
      resetButton.addEventListener('click', () => resetTimer(timerId));
      
      timerDiv.appendChild(timerDisplay);
      timerDiv.appendChild(eventNameInput);
      timerDiv.appendChild(startButton);
      timerDiv.appendChild(stopButton);
      timerDiv.appendChild(resetButton);
      
      timersContainer.appendChild(timerDiv);
      
      timers.push({ id: timerId, eventNameInput, timer: null, duration: 0, running: false });
    }
    
    function startTimer(timerId) {
      const timerIndex = timers.findIndex(timer => timer.id === timerId);
      if (timerIndex !== -1 && !timers[timerIndex].running) {
        const eventName = timers[timerIndex].eventNameInput.value || 'Timer';
        timers[timerIndex].eventNameInput.disabled = true;
        timers[timerIndex].running = true;
        timers[timerIndex].timer = setInterval(() => {
          timers[timerIndex].duration++;
          const formattedTime = formatTime(timers[timerIndex].duration);
          document.getElementById(timerId).querySelector('.timer-display').textContent = formattedTime;
        }, 1000);
      }
    }
    
    function stopTimer(timerId) {
      const timerIndex = timers.findIndex(timer => timer.id === timerId);
      if (timerIndex !== -1 && timers[timerIndex].running) {
        clearInterval(timers[timerIndex].timer);
        timers[timerIndex].running = false;
        timers[timerIndex].eventNameInput.disabled = false;
      }
    }
    
    function resetTimer(timerId) {
      const timerIndex = timers.findIndex(timer => timer.id === timerId);
      if (timerIndex !== -1) {
        clearInterval(timers[timerIndex].timer);
        timers[timerIndex].duration = 0;
        timers[timerIndex].running = false;
        timers[timerIndex].eventNameInput.disabled = false;
        document.getElementById(timerId).querySelector('.timer-display').textContent = '00:00:00';
      }
    }
    
    function formatTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return ` ${padZero(hours)}:${padZero(minutes)}:${padZero(secs)}`;
    }
    
    function padZero(num) {
      return num < 10 ? '0' + num : num;
    }