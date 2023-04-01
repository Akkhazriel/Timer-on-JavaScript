const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');


// максимальный лимит времени
const timer_limit = 360000;

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {

  // создаем функцию, переводящую секунды в строку заданного формата
  const formatTime = (seconds) => {
    // конвертация полученного числа
    const hoursDown = Math.floor(seconds / 3600);
    const minutesDown = Math.floor((seconds - hoursDown * 3600) / 60);
    const secondsDown = seconds - hoursDown * 3600 - minutesDown * 60;
    // если не хватает добавляем впереди 0
    const addTime = (number) => number.toString().padStart(2, "0")
    // возврат строки нужного нам формата
    return `${addTime(hoursDown)}:${addTime(
      minutesDown
    )}:${addTime(secondsDown)}`;
  };

  // проверяем запущен ли таймер сейчас
  let isTimerRunning = false;
  // для таймера чтобы можно было его остановить
  let timerInterval;
  // останавливаем таймер
  const stopTimer = () => {
    clearInterval(timerInterval);
    isTimerRunning = false;
  };

  // запускаем таймер
  const startTimer = (seconds) => {
    // пока таймер работает, остановить предыдущий
    isTimerRunning && stopTimer();
    let timePassed = 0;
    let timeLeft = seconds;
    isTimerRunning = true;
    timerInterval = setInterval(() => {
      // увеличиваем счетчик на 1 секунду
      timePassed += 1;
      // вычисление оставшегося времени
      timeLeft = seconds - timePassed;
      // выводим остаток времени
      timerEl.textContent = formatTime(timeLeft);
      // останавливаем таймер по истечении времени
      timeLeft === 0 && stopTimer();
    }, 1000)
  };

  // возвращаем функцию таймера

  return (seconds) => {
    startTimer(seconds);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  // изменил input
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  // нужно проверить чтобы поле не было пустым
  if (seconds === 0) {
    return confirm("Введите число в секундах");

    
    // ограничиваем количество заданных символов в поле
    // а так же сделаем предел для таймера
  } else if (seconds >= timer_limit) {
    return alert("Проверьте введеное вами время");
  }

  animateTimer(seconds);

  inputEl.value = '';
});
