import { useState, useEffect, useContext } from 'react';
import { challengesContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/CountDown.module.css';


export function Countdown() {

  // context
  const {hasFinished, isActive, seconds, minutes, resetCountdown, startCountdown} = useContext(CountdownContext)

  

  // padStart -> verificará se a nossa string tem dois chars caso contrário ele preenche com inicialmente com um 0
  const [minuteLeft, minuteRight ] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight ] = String(seconds).padStart(2, '0').split('');


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