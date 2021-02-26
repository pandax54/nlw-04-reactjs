import { useContext, useState } from 'react';
import { challengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {

  const { activeChallenge, resetChallenge } = useContext(challengesContext);

  // const [hasActiveChallenge, setHasActiveChallenge] = useState(false)


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
              >
                Completei
              </button>

              <button
                type="button"
                className={styles.challangeFailedButton}
                onClick={resetChallenge}
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