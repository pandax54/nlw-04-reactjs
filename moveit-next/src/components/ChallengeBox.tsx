import { useContext, useState } from 'react';
import { challengesContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {

  const { activeChallenge, resetChallenge, completeChallenge } = useContext(challengesContext);

  // const [hasActiveChallenge, set asActiveChallenge] = useState(false)

  const {resetCountdown} = useContext(CountdownContext)

  function handleChallengeFailed(){
    resetCountdown();
    resetChallenge();
  }

  function handleChallengeSucceeded(){
    completeChallenge()
    resetCountdown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ?
        (
          <div className={styles.challengeActive}>
            <header>Ganhe {activeChallenge.amount} xp</header>
            <main>
              <img src={`icons/${activeChallenge.type}.svg`} alt="" />
              <strong>Novo desafio</strong>
              <p>{activeChallenge.description}</p>
            </main>
            <footer>
              <button
                type="button"
                className={styles.challangesucceededButton}
                onClick={handleChallengeSucceeded}
              >
                Completei
              </button>

              <button
                type="button"
                className={styles.challangeFailedButton}
                onClick={handleChallengeFailed}
              >
                Falhei
            </button>
            </footer>
          </div>

        ) : (
          <div className={styles.challengeNotActive}>
            <strong>Finalize um ciclo para receber um desafio</strong>
            <p>
              <img src="icons/level-up.svg" alt="Level up" />
            Avance de leve completando desafios.
          </p>
          </div>
        )}
    </div>
  )
}