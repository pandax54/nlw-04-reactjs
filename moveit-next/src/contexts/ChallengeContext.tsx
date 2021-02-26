import { createContext, ReactNode, useState } from 'react';
import challenges from  '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface challengesContextData {
    level: number, 
    challengesCompleted: number; 
    currentExperience: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const challengesContext = createContext({} as challengesContextData);


export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null)

    // calcular a quantidade de experiencia para o próximo level
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)
    
    function levelUp() {
        setLevel(level + 1);    
    }

    function startNewChallenge() {
        console.log('new challenge')
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge)
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    return (
      <challengesContext.Provider 
      value={{
          level, 
          challengesCompleted, 
          currentExperience, 
          levelUp, 
          startNewChallenge,
          activeChallenge,
          resetChallenge,
          experienceToNextLevel
          }}
        >
          {children}
      </challengesContext.Provider> 
    )
}