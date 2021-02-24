import { useState, useEffect } from 'react';
import styles from '../styles/components/CountDown.module.css';

export function Countdown() {

  // colocaremos o tempo em segundos
  const [time, setTime] = useState(25 * 60)
  const [active, setActive] = useState(false);

  // numero de minutos totais
  const minutes = Math.floor(time / 60);
  // resto que nao coube na divisao anterior representará os segundos
  const seconds = time % 60;

  // padStart -> verificará se a nossa string tem dois chars caso contrário ele preenche com inicialmente com um 0
  const [minuteLeft, minuteRight ] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight ] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    setActive(true);
  }

  // realizar uma acao sempre que o valor de active mudar, e o tempo tb
  // aula 02 1:05:00
  useEffect(()=>{
    console.log(active)
    if (active && time > 0) {
      setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    }
  }, [active, time])

  return (
    <div>
    <div className={styles.countdownContainer}>
      <div>
        <span>{minuteLeft}</span>
        <span>{minuteRight}</span>
      </div>
      <span>:</span>
      <div>
        <span>{secondLeft}</span>
        <span>{secondRight}</span>
      </div>
    </div>

    <button type="button" className={styles.startCountdownButton} onClick={startCountdown}>
      Iniciar um ciclo
    </button>

    </div>
  )
}