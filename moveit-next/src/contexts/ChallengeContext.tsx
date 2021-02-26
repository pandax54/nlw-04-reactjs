import { createContext, ReactNode, useEffect, useState } from 'react';
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
    completeChallenge: () => void;
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

    // [] -> executa apenar uma única vez, quando o componente for exibido em tela
    useEffect(() => {
        Notification.requestPermission();
    },[])
    
    function levelUp() {
        setLevel(level + 1);    
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        // https://developer.mozilla.org/en-US/docs/Web/API/notification
        if (Notification.permission === "granted") {
            new Notification('Novo desafio!', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        // lesson 4
        if(!activeChallenge) {
            return;
        }

        const {amount} = activeChallenge
        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience =  finalExperience - experienceToNextLevel
            levelUp();
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)

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
          experienceToNextLevel,
          completeChallenge
          }}
        >
          {children}
      </challengesContext.Provider> 
    )
}