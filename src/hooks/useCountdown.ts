import { useCallback, useEffect, useState } from 'react';
export function useCountdownDate(date: Date) {
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setNewTime();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const setNewTime = () => {
    const startTime = date;

    const endTime = new Date();

    const distanceToNow = startTime.valueOf() - endTime.valueOf();

    const getDays = Math.floor(distanceToNow / (1000 * 60 * 60 * 24));

    const getHours = `0${Math.floor((distanceToNow % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}`.slice(-2);

    const getMinutes = `0${Math.floor((distanceToNow % (1000 * 60 * 60)) / (1000 * 60))}`.slice(-2);

    const getSeconds = `0${Math.floor((distanceToNow % (1000 * 60)) / 1000)}`.slice(-2);

    setCountdown({
      days: getDays.toString() || '000',
      hours: getHours || '000',
      minutes: getMinutes || '000',
      seconds: getSeconds || '000',
    });
  };

  return {
    days: countdown.days,
    hours: countdown.hours,
    minutes: countdown.minutes,
    seconds: countdown.seconds,
  };
}
export function useCountdownSeconds(initCountdown: number) {
  const [countdown, setCountdown] = useState(initCountdown);
  const startCountdown = useCallback(() => {
    let remainingSeconds = countdown;
    const intervalId = setInterval(() => {
      remainingSeconds -= 1;
      if (remainingSeconds === 0) {
        clearInterval(intervalId);
        setCountdown(0);
      } else {
        setCountdown(remainingSeconds);
      }
    }, 1000);
  }, [initCountdown, countdown]);

  const reCountdown = useCallback(() => {
    setCountdown(initCountdown);
    startCountdown();
  }, []);

  const counting = initCountdown > countdown;
  return { counting, countdown, setCountdown, startCountdown, reCountdown };
}
