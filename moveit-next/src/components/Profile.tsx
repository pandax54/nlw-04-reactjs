// import styles from '../styles/components/ExperienceBar.module.css';
import { useContext } from 'react';
import { challengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {

  const {level} = useContext(challengesContext)
  return (
    <div className={styles.profileContainer}>
      <img src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="Lydia"/>
      <div>
        <strong>Fernanda Penna Ribeiro</strong>
        <p>
          <img src="icons/level.svg" alt="level"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}