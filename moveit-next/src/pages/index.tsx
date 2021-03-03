import React, { useEffect } from "react";
import styles from '../styles/pages/Home.module.css';
import { GoMarkGithub } from 'react-icons/go';
import { FaGoogle } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';

import Head from 'next/head';


import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';


interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    if(session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Login | move.it </title>
      </Head>
      <img src="/icons/symbols.svg" className={styles.background} />

      <div className={styles.content}>
        <img src="/icons/Logo-home.png" alt="Move.it"/>

        <h2>Bem-vindo</h2>
        
        <div className={styles.github}>
          <FiLogIn size={24} color="#FBDFDF" />
          <p>Faça login com seu Github ou Google para começar!</p>
        </div>

        <button type="button" onClick={() => signIn('github', { callbackUrl: `${process.env.REACT_APP_URL}/dashboard` })}>
          <GoMarkGithub size={24} color="#FBDFDF" />
          Continuar com Github
        </button>

        <button type="button" onClick={() => signIn('google', { callbackUrl: `${process.env.REACT_APP_URL}/dashboard` })}>
          <FaGoogle size={24} />
          Continuar com Google
        </button>
      </div>
    </div>
  )
}
