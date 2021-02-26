import { useState, useEffect, useContext } from 'react';
import { challengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/CountDown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {

  // context
  const { startNewChallenge } = useContext(challengesContext);

  // colocaremos o tempo em segundos
  const [time, setTime] = useState(0.1 * 60)
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  // numero de minutos totais
  const minutes = Math.floor(time / 60);
  // resto que nao coube na divisao anterior representará os segundos
  const seconds = time % 60;

  // padStart -> verificará se a nossa string tem dois chars caso contrário ele preenche com inicialmente com um 0
  const [minuteLeft, minuteRight ] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight ] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1 * 60)
  }

  // realizar uma acao sempre que o valor de active mudar, e o tempo tb
  // aula 02 1:05:00
  useEffect(()=>{

    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if ( isActive && time == 0) {
      console.log("Finalizou")
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time])

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

    { hasFinished ?
    (
      <button 
      type="button" 
      className={`${styles.startCountdownButton}`} 
      disabled
      >
      Ciclo encerrado
    </button>
    ): 
    (
      isActive ? 
      (
      <button type="button" className={`${styles.startCountdownButton} ${styles.startCountdownButtonActive}`} onClick={resetCountdown}>
        Abandonar ciclo
      </button>
      ) : 
      (
      <button type="button" className={styles.startCountdownButton} onClick={startCountdown}>
        Iniciar um ciclo
      </button>
      )
    )}

    </div>
  )
}