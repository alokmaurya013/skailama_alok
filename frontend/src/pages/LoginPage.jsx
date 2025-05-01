import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  return (
    <main className={styles.css1}>
      <HeroSection />
      <LoginSection />
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

function LoginSection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        
        // Fetch user data to check if they have projects
        const userRes = await fetch("http://localhost:5000/api/projects", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${data.token}`,
          },
        });
        const userData = await userRes.json();
        // Check if user has projects
        if (userRes.ok && userData&&userData.length > 0) {
          // If user has projects, redirect to the projects page
          navigate("/projects");
        } else {
          // If no projects, redirect to the create page (homepage)
          navigate("/create");
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <section className={styles.column2}>
      <div className={styles.div5}>
        <img src="Group22.png" alt="group22" className={styles.logo22} />
        <h2 className={styles.welcometoQuesAi}>
          Welcome to <span className={styles.ques}>Ques.AI</span>
        </h2>
        <input
          type="email"
          placeholder="Email Address"
          className={styles.emailAddress}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.div6}>
          <label className={styles.div7}>
            <input type="checkbox" className={styles.div8} />
            <span className={styles.rememberme}>Remember me</span>
          </label>
          <a href="#" className={styles.forgotpassword}>
            Forgot password?
          </a>
        </div>

        <button className={styles.login} onClick={handleLogin}>
          Login
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
            Don't have an account?
          </span>
          <Link to="/signup" className={styles.createAccount}>
            Create Account
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
