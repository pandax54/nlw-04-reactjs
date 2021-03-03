import { GetServerSideProps } from 'next'
import React from "react";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import styles from '../styles/pages/Dashboard.module.css';

import Head from 'next/head';
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from '../contexts/ChallengeContext';


interface DashboardProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Dashboard(props: DashboardProps) {

  return (
    <ChallengesProvider
    level={props.level}
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}
    >
    <div className={styles.container}>
      <Head>
        <title>Inicio | move.it</title>
      </Head>
    <ExperienceBar />

    <CountdownProvider>
    <section>
      <div>
        <Profile />
        <CompletedChallenges />
        <Countdown />
      </div>
      <div>
      <ChallengeBox />
      </div>
    </section>
    </CountdownProvider>
  </div> 
  </ChallengesProvider> 
  )
}


// lesson 5 22:00
// node server
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  // accessing the cookies
  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;
  return {
    props: {
      level: Number(level), 
      currentExperience: Number(currentExperience), 
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
