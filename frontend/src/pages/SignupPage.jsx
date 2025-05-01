"use client";
import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";

function SignupPage() {
  return (
    <main className={styles.css1}>
      <HeroSection />
      <SignupSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className={styles.column}>
      <div className={styles.div2}>
        <div className={styles.div3}>
          <img src="QuesLogo1.png" alt="logo1" className={styles.img_logo} />
          <img src="mask_group.png" alt="Background" className={styles.img} />
          <div className={styles.div4}>
            <p className={styles.yourpodcastwillnolongerbejustahobby}>
              Your podcast will no longer be just a hobby.
            </p>
            <p className={styles.superchargeYourDistributionusingourAIassistant}>
              Supercharge Your Distribution using our AI assistant!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SignupSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        navigate("/login");
      } else {
        const data = await res.json();
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <section className={styles.column2}>
      <div className={styles.div5}>
        <img src="Group22.png" alt="group22" className={styles.logo22} />
        <h2 className={styles.welcometoQuesAi}>
          Join <span className={styles.ques}>Ques.AI</span>
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className={styles.name1}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email Address"
          className={styles.email1}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.password1}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />


        <button className={styles.login} onClick={handleSignup}>
          Sign Up
        </button>

        <div className={styles.div9}>
          <img src="Line12.png" alt="line12" className={styles.img2} />
          <span className={styles.or}>or</span>
          <img src="Line13.png" alt="line12" className={styles.img3} />
        </div>

        <button className={styles.div10}>
          <img src="image6.png" alt="Google logo" className={styles.img4} />
          <span className={styles.continuewithGoogle}>
            Continue with Google
          </span>
        </button>

        <div className={styles.div11}>
          <span className={styles.donthaveanaccount}>
            Already have an account?
          </span>
          <Link to="/login" className={styles.createAccount}>
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SignupPage;
