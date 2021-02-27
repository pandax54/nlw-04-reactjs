import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from  '../../challenges.json';
// lesson 5
// https://github.com/DefinitelyTyped/DefinitelyTyped
// yarn add @types/js-cookie -D
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';


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
    closeLevelUpModal: () => void;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const challengesContext = createContext({} as challengesContextData);


export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    // calcular a quantidade de experiencia para o próximo level
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        // yarn add js-cookie
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))

    }, [level, currentExperience, challengesCompleted])

    // [] -> executa apenar uma única vez, quando o componente for exibido em tela
    useEffect(() => {
        Notification.requestPermission();
    },[])

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false)   
    }
    
    function levelUp() {
        setLevel(level + 1); 
        setIsLevelUpModalOpen(true)   
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
          completeChallenge,
          closeLevelUpModal
          }}
        >
          {children}

          {isLevelUpModalOpen && <LevelUpModal />}
      </challengesContext.Provider> 
    )
}