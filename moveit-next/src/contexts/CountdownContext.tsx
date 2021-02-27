import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { challengesContext } from './ChallengeContext';

interface CountdownContextData {
    startCountdown: () => void;
    resetCountdown: () => void;
    minutes: number;
    seconds: number;
    isActive: boolean;
    hasFinished: boolean;
}


interface CountdownProviderProps {
    children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);


export function CountdownProvider({ children }: CountdownProviderProps) {

    const { startNewChallenge } = useContext(challengesContext)

    // colocaremos o tempo em segundos
    const [time, setTime] = useState(0.05 * 60)
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    // numero de minutos totais
    const minutes = Math.floor(time / 60);
    // resto que nao coube na divisao anterior representará os segundos
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true);
      }
    
      function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(0.05 * 60);
      }


    // realizar uma acao sempre que o valor de active mudar, e o tempo tb
    // aula 02 1:05:00
    useEffect(() => {

        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time == 0) {
            console.log("Finalizou")
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])


    return (
        <CountdownContext.Provider
            value={{
                startCountdown,
                resetCountdown,
                minutes,
                seconds,
                isActive,
                hasFinished
            }}
        >
            {children}
        </CountdownContext.Provider>
    )
}