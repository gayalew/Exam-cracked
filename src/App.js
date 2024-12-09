import androidLogo from "./assets/android.png";
import logo from "./assets/logo.png";
import macLogo from "./assets/mac.png";
import windowLogo from "./assets/windows.png";
import exlink from "./assets/external-link.png";
import link1 from "./assets/link-1.png";
import user from "./assets/user-1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyBLkF17XGL1idTWHAwsQmpEfXcCnMoLr8k",
  authDomain: "exam-a734f.firebaseapp.com",
  projectId: "exam-a734f",
  storageBucket: "exam-a734f.firebasestorage.app",
  messagingSenderId: "400595651074",
  appId: "1:400595651074:web:069a3ce68d3dde9125351b",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };



export default function App() {
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [download, setDownload] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  function handleLogin() {
    setLogin(!login);
    setForgotPassword(false);
    setSignup(false);
    setDownload(false);
  }

  function handleForgotPassword() {
    setForgotPassword(!forgotPassword);
  }

  function handleSignup() {
    setSignup(!signup);
    setLogin(false);
    setForgotPassword(false);
    setDownload(false);

  }

  function handleDownload() {
    setDownload(!download);
    setLogin(false);
    setSignup(false);
  }

  function handleSearch(e) {
    setSearchTerm(e);
    console.log("Searching for: ", searchTerm);
  }

  return (
    <div className="App">
      <Header
        onLogin={() => handleLogin()}
        onSignup={() => handleSignup()}
        onDownload={() => handleDownload()}
      />
      <Registrtion
        login={login}
        forgotPassword={forgotPassword}
        onSetPassword={() => handleForgotPassword()}
        signup={signup}
        download={download}
        onLogin={() => handleLogin()}
        onSignup={() => handleSignup()}
        onDownload={() => handleDownload()}
      />
      <Navigation />
      <Search onSearch={() => handleSearch} searchTerm={searchTerm} />
      <div className="container">
        <div>
          <TextBook />
          <GuideBook />
        </div>
        <div>
          <Schedule />
          <SelfNotes />
        </div>
        <div>
          <ExamSheets />
          <MockTest />
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Header({ onLogin, onSignup, onDownload }) {
  return (
    <div className="header">
      <img src={logo} alt="logo" />
      <h1>Online Study App</h1>
      <div className="nav-one">
        <button onClick={onLogin} className="btn">
          Login
        </button>
        <button onClick={onSignup} className="btn">
          Sign up
        </button>
        <button onClick={onDownload} id="download">
          ⏬
        </button>
      </div>
    </div>
  );
}
function Registrtion({
  login,
  forgotPassword,
  signup,
  download,
  onLogin,
  onSetPassword,
  onSignup,
  onDownload,
}) {
  return (
    <div className="registration">
      {login && (
        <Login
          onLogin={onLogin}
          forgotPassword={forgotPassword}
          onSetPassword={onSetPassword}
          onSignup={onSignup}
        />
      )}
      {signup && <SignUp onSignup={onSignup} onLogin={onLogin} />}
      {download && <DownloadApp onDownload={onDownload} />}
    </div>
  );
}


function SignUp({ onSignup, onLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Sign up successful!");
      setLoading(false);
      onSignup(); // Close the sign-up form after success
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="signup">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <h4>
          Already have an account?{" "}
          <a href="#Login" onClick={onLogin}>
            <span>Login</span>
          </a>
        </h4>
        <input type="submit" value={loading ? "Signing Up..." : "Sign Up"} />
      </form>
    </div>
  );
}



function Login({ onLogin, forgotPassword, onSetPassword, onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      setLoading(false);
      onLogin(); // Close the login form after success
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="login">
      {!forgotPassword && <h1>Login</h1>}
      <form onSubmit={handleLogin}>
        {!forgotPassword && (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <h4>
              <a href="#forgot-password" onClick={onSetPassword}>
                <span>Forgot password?</span>
              </a>
            </h4>
          </>
        )}
        {forgotPassword && <ForgotPassword onSetPassword={onSetPassword} />}
        <h4>
          Don't have an account?{" "}
          <a href="#signup" onClick={onSignup}>
            <span>Sign up</span>
          </a>
        </h4>
        {!forgotPassword && (
          <input type="submit" value={loading ? "Logging in..." : "Login"} />
        )}
      </form>
    </div>
  );
}







function ForgotPassword({ onSetPassword }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="forgot-password">
      <h1>Forgot Password</h1>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="submit"
          value={loading ? "Sending..." : "Reset Password"}
        />
        <h4>
          <a href="#login" onClick={onSetPassword}>
            <span>Back to Login</span>
          </a>
        </h4>
      </form>
    </div>
  );
}



function DownloadApp({ onDownload }) {
  return (
    <div className="download-app">
      <h1>Download the App</h1>
      <div className="download-options">
        <ForAndroid onDownload={onDownload} />
        <ForWindows onDownload={onDownload} />
        <ForMac onDownload={onDownload} />
      </div>
    </div>
  );
}

function ForAndroid({ onDownload }) {
  return (
    <div className="download-item download-app-android">
      <img src={androidLogo} alt="logo" />
      <a className="link" href="#app" onClick={onDownload}>
        Download the App For Android
      </a>
    </div>
  );
}

function ForWindows({ onDownload }) {
  return (
    <div className="download-item download-app-window">
      <img src={windowLogo} alt="logo" />
      <a className="link" href="#app" onClick={onDownload}>
        Download the App For Windows
      </a>
    </div>
  );
}
function ForMac({ onDownload }) {
  return (
    <div className="download-item download-app-mac">
      <img src={macLogo} alt="logo" />
      <a className="link" href="#app" onClick={onDownload}>
        Download the App For Mac
      </a>
    </div>
  );
}

function Navigation() {
  return (
    <div className="navigation">
      <Account />
      <div className="nav-two">
        <a className="nav-item" href="#home">
          Home
        </a>
        <a className="nav-item" href="#textbook">
          Text-Books
        </a>
        <a className="nav-item" href="#guidebook">
          Guide-books
        </a>
        <a className="nav-item" href="#examsheets">
          Exam-Sheets
        </a>
        <a className="nav-item" href="#mocktest">
          Mock-Tests
        </a>
        <a className="nav-item" id="abt" href="#about">
          About
        </a>
      </div>
    </div>
  );
}

function Account() {
  return (
    <div className="account">
      <img src={user} alt="user" />
      <p>Hymn</p>
    </div>
  );
}

function Search({ onSearch }) {
  return (
    <div className="search">
      <input
        onChange={(e) => onSearch(e.target.value)}
        type="text"
        placeholder="Search"
      />
      <FontAwesomeIcon onClick={onSearch} id="icon" icon={faSearch} />
    </div>
  );
}

function TextBook() {
  return (
    <div className="resources block-1 textbook">
      <h1>Text-Books</h1>
      <div className="grades">
        <div className="grade grade-11">
          <h3>
            <button class="Documents-btn">
              <span class="folderContainer">
                <svg
                  class="fileBack"
                  width="146"
                  height="113"
                  viewBox="0 0 146 113"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 4C0 1.79086 1.79086 0 4 0H50.3802C51.8285 0 53.2056 0.627965 54.1553 1.72142L64.3303 13.4371C65.2799 14.5306 66.657 15.1585 68.1053 15.1585H141.509C143.718 15.1585 145.509 16.9494 145.509 19.1585V109C145.509 111.209 143.718 113 141.509 113H3.99999C1.79085 113 0 111.209 0 109V4Z"
                    fill="url(#paint0_linear_117_4)"
                  ></path>
                  <defs>
                    <linearGradient
                      id="paint0_linear_117_4"
                      x1="0"
                      y1="0"
                      x2="72.93"
                      y2="95.4804"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#8F88C2"></stop>
                      <stop offset="1" stop-color="#5C52A2"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <svg
                  class="filePage"
                  width="88"
                  height="99"
                  viewBox="0 0 88 99"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="88"
                    height="99"
                    fill="url(#paint0_linear_117_6)"
                  ></rect>
                  <defs>
                    <linearGradient
                      id="paint0_linear_117_6"
                      x1="0"
                      y1="0"
                      x2="81"
                      y2="160.5"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="white"></stop>
                      <stop offset="1" stop-color="#686868"></stop>
                    </linearGradient>
                  </defs>
                </svg>

                <svg
                  class="fileFront"
                  width="160"
                  height="79"
                  viewBox="0 0 160 79"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.29306 12.2478C0.133905 9.38186 2.41499 6.97059 5.28537 6.97059H30.419H58.1902C59.5751 6.97059 60.9288 6.55982 62.0802 5.79025L68.977 1.18034C70.1283 0.410771 71.482 0 72.8669 0H77H155.462C157.87 0 159.733 2.1129 159.43 4.50232L150.443 75.5023C150.19 77.5013 148.489 79 146.474 79H7.78403C5.66106 79 3.9079 77.3415 3.79019 75.2218L0.29306 12.2478Z"
                    fill="url(#paint0_linear_117_5)"
                  ></path>
                  <defs>
                    <linearGradient
                      id="paint0_linear_117_5"
                      x1="38.7619"
                      y1="8.71323"
                      x2="66.9106"
                      y2="82.8317"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#C3BBFF"></stop>
                      <stop offset="1" stop-color="#51469A"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <p class="text">Grade-11</p>
            </button>
          </h3>
          <a className="book" href="#english">
            📚 English
          </a>
          <a className="book" href="#english">
            📚 Mathematics
          </a>
          <a className="book" href="#english">
            📚 Biology
          </a>
          <a className="book" href="#english">
            📚 Physics
          </a>
          <a className="book" href="#english">
            📚 Chemistry
          </a>
        </div>
        <div className="grade grade-12">
          <h3>
            <button class="Documents-btn">
              <span class="folderContainer">
                <svg
                  class="fileBack"
                  width="146"
                  height="113"
                  viewBox="0 0 146 113"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 4C0 1.79086 1.79086 0 4 0H50.3802C51.8285 0 53.2056 0.627965 54.1553 1.72142L64.3303 13.4371C65.2799 14.5306 66.657 15.1585 68.1053 15.1585H141.509C143.718 15.1585 145.509 16.9494 145.509 19.1585V109C145.509 111.209 143.718 113 141.509 113H3.99999C1.79085 113 0 111.209 0 109V4Z"
                    fill="url(#paint0_linear_117_4)"
                  ></path>
                  <defs>
                    <linearGradient
                      id="paint0_linear_117_4"
                      x1="0"
                      y1="0"
                      x2="72.93"
                      y2="95.4804"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#8F88C2"></stop>
                      <stop offset="1" stop-color="#5C52A2"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <svg
                  class="filePage"
                  width="88"
                  height="99"
                  viewBox="0 0 88 99"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="88"
                    height="99"
                    fill="url(#paint0_linear_117_6)"
                  ></rect>
                  <defs>
                    <linearGradient
                      id="paint0_linear_117_6"
                      x1="0"
                      y1="0"
                      x2="81"
                      y2="160.5"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="white"></stop>
                      <stop offset="1" stop-color="#686868"></stop>
                    </linearGradient>
                  </defs>
                </svg>

                <svg
                  class="fileFront"
                  width="160"
                  height="79"
                  viewBox="0 0 160 79"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.29306 12.2478C0.133905 9.38186 2.41499 6.97059 5.28537 6.97059H30.419H58.1902C59.5751 6.97059 60.9288 6.55982 62.0802 5.79025L68.977 1.18034C70.1283 0.410771 71.482 0 72.8669 0H77H155.462C157.87 0 159.733 2.1129 159.43 4.50232L150.443 75.5023C150.19 77.5013 148.489 79 146.474 79H7.78403C5.66106 79 3.9079 77.3415 3.79019 75.2218L0.29306 12.2478Z"
                    fill="url(#paint0_linear_117_5)"
                  ></path>
                  <defs>
                    <linearGradient
                      id="paint0_linear_117_5"
                      x1="38.7619"
                      y1="8.71323"
                      x2="66.9106"
                      y2="82.8317"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#C3BBFF"></stop>
                      <stop offset="1" stop-color="#51469A"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <p class="text">Grade-12</p>
            </button>
          </h3>
          <a className="book" href="#english">
            📚 English
          </a>
          <a className="book" href="#english">
            📚 Mathematics
          </a>
          <a className="book" href="#english">
            📚 Biology
          </a>
          <a className="book" href="#english">
            📚 Physics
          </a>
          <a className="book" href="#english">
            📚 Chemistry
          </a>
        </div>{" "}
      </div>
    </div>
  );
}

function GuideBook() {
  return (
    <div className="resources block-1 guidebook">
      <h1>Guide-Books</h1>
      <div className="types">
        <div className="type hardCopy">
          <h3>
            <button class="Documents-btn">
              <span class="folderContainer">
                <svg
                  class="fileBack"
                  width="146"
                  height="113"
                  viewBox="0 0 146 113"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 4C0 1.79086 1.79086 0 4 0H50.3802C51.8285 0 53.2056 0.627965 54.1553 1.72142L64.3303 13.4371C65.2799 14.5306 66.657 15.1585 68.1053 15.1585H141.509C143.718 15.1585 145.509 16.9494 145.509 19.1585V109C145.509 111.209 143.718 113 141.509 113H3.99999C1.79085 113 0 111.209 0 109V4Z"
                    fill="url(#paint0_linear_117_4)"
                  ></path>
                  <defs>
                    <linearGradient
                      id="paint0_linear_117_4"
                      x1="0"
                      y1="0"
                      x2="72.93"
                      y2="95.4804"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#8F88C2"></stop>
                      <stop offset="1" stop-color="#5C52A2"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <svg
                  class="filePage"
                  width="88"
                  height="99"
                  viewBox="0 0 88 99"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="88"
                    height="99"
                    fill="url(#paint0_linear_117_6)"
                  ></rect>
                  <defs>
                    <linearGradient
                      id="paint0_linear_117_6"
                      x1="0"
                      y1="0"
                      x2="81"
                      y2="160.5"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="white"></stop>
                      <stop offset="1" stop-color="#686868"></stop>
                    </linearGradient>
                  </defs>
                </svg>

                <svg
                  class="fileFront"
                  width="160"
                  height="79"
                  viewBox="0 0 160 79"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.29306 12.2478C0.133905 9.38186 2.41499 6.97059 5.28537 6.97059H30.419H58.1902C59.5751 6.97059 60.9288 6.55982 62.0802 5.79025L68.977 1.18034C70.1283 0.410771 71.482 0 72.8669 0H77H155.462C157.87 0 159.733 2.1129 159.43 4.50232L150.443 75.5023C150.19 77.5013 148.489 79 146.474 79H7.78403C5.66106 79 3.9079 77.3415 3.79019 75.2218L0.29306 12.2478Z"
                    fill="url(#paint0_linear_117_5)"
                  ></path>
                  <defs>
                    <linearGradient
                      id="paint0_linear_117_5"
                      x1="38.7619"
                      y1="8.71323"
                      x2="66.9106"
                      y2="82.8317"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#C3BBFF"></stop>
                      <stop offset="1" stop-color="#51469A"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <p class="text">Hard-copy</p>
            </button>
          </h3>
          <a className="book" href="#english">
            📗 Extrem English
          </a>
          <a className="book" href="#english">
            📘 Extrem Mathematics
          </a>
          <a className="book" href="#english">
            📙 Extrem Biology
          </a>
          <a className="book" href="#english">
            📕 Extrem Physics
          </a>
          <a className="book" href="#english">
            📔 Extrem Chemistry
          </a>
        </div>
        <div className="type online-materials">
          <h3>
            <button class="Documents-btn">
              <img width="35px" src={exlink} alt="📂" />
              <p class="text">Online-links</p>
            </button>
          </h3>
          <a className="book" href="#english">
            <img width="20px" src={link1} alt="@" />
            English materials
          </a>
          <a className="book" href="#english">
            <img width="20px" src={link1} alt="@" />
            Math. materials
          </a>
          <a className="book" href="#english">
            <img width="20px" src={link1} alt="@" />
            Biology materials
          </a>
          <a className="book" href="#english">
            <img width="20px" src={link1} alt="@" />
            Physics materials
          </a>
          <a className="book" href="#english">
            <img width="20px" src={link1} alt="@" />
            Chemistry materials
          </a>
        </div>{" "}
      </div>
    </div>
  );
}

function ExamSheets() {
  return (
    <div className="resources block-2 examsheets">
      <h1>Exam-Sheets</h1>
      <div className="years">
        <div className="type">
          <h3>
            <button class="Documents-btn">
              <p class="text">Exam-2013</p>
            </button>
          </h3>
          <a className="book" href="#english">
            📑 English
          </a>
          <a className="book" href="#english">
            📑 Maths
          </a>
          <a className="book" href="#english">
            📑 Biology
          </a>
          <a className="book" href="#english">
            📑 Physics
          </a>
          <a className="book" href="#english">
            📑 Chemistry
          </a>
        </div>{" "}
        <div className="type">
          <h3>
            <button class="Documents-btn">
              <p class="text">Exam-2014</p>
            </button>
          </h3>
          <a className="book" href="#english">
            📑 English
          </a>
          <a className="book" href="#english">
            📑 Maths
          </a>
          <a className="book" href="#english">
            📑 Biology
          </a>
          <a className="book" href="#english">
            📑 Physics
          </a>
          <a className="book" href="#english">
            📑 Chemistry
          </a>
        </div>{" "}
        <div className="type">
          <h3>
            <button class="Documents-btn">
              <p class="text">Exam-2015</p>
            </button>
          </h3>
          <a className="book" href="#english">
            📑 English
          </a>
          <a className="book" href="#english">
            📑 Maths
          </a>
          <a className="book" href="#english">
            📑 Biology
          </a>
          <a className="book" href="#english">
            📑 Physics
          </a>
          <a className="book" href="#english">
            📑 Chemistry
          </a>
        </div>{" "}
        <div className="type">
          <h3>
            <button class="Documents-btn">
              <p class="text">Exam-2016</p>
            </button>
          </h3>
          <a className="book" href="#english">
            📑 English
          </a>
          <a className="book" href="#english">
            📑 Maths
          </a>
          <a className="book" href="#english">
            📑 Biology
          </a>
          <a className="book" href="#english">
            📑 Physics
          </a>
          <a className="book" href="#english">
            📑 Chemistry
          </a>
        </div>{" "}
      </div>
    </div>
  );
}

function MockTest() {
  return (
    <div className="resources block-2 mocktest">
      <h1>Mock-Tests</h1>
      <div className="tests">
        <div className="type">
          <h3>
            <button class="Documents-btn">
              <p class="text">Test-1</p>
            </button>
          </h3>
          <a className="book" href="#english">
            📝 English
          </a>
          <a className="book" href="#english">
            📝 Maths
          </a>
          <a className="book" href="#english">
            📝 Biology
          </a>
          <a className="book" href="#english">
            📝 Physics
          </a>
          <a className="book" href="#english">
            📝 Chemistry
          </a>
        </div>{" "}
        <div className="type">
          <h3>
            <button class="Documents-btn">
              <p class="text">Test-2</p>
            </button>
          </h3>
          <a className="book" href="#english">
            📝 English
          </a>
          <a className="book" href="#english">
            📝 Maths
          </a>
          <a className="book" href="#english">
            📝 Biology
          </a>
          <a className="book" href="#english">
            📝 Physics
          </a>
          <a className="book" href="#english">
            📝 Chemistry
          </a>
        </div>{" "}
        <div className="type">
          <h3>
            <button class="Documents-btn">
              <p class="text">Test-3</p>
            </button>
          </h3>
          <a className="book" href="#english">
            📝 English
          </a>
          <a className="book" href="#english">
            📝 Maths
          </a>
          <a className="book" href="#english">
            📝 Biology
          </a>
          <a className="book" href="#english">
            📝 Physics
          </a>
          <a className="book" href="#english">
            📝 Chemistry
          </a>
        </div>{" "}
        <div className="type">
          <h3>
            <button class="Documents-btn">
              <p class="text">Test-4</p>
            </button>
          </h3>
          <a className="book" href="#english">
            📝 English
          </a>
          <a className="book" href="#english">
            Maths
          </a>
          <a className="book" href="#english">
            📝 Biology
          </a>
          <a className="book" href="#english">
            📝 Physics
          </a>
          <a className="book" href="#english">
            📝 Chemistry
          </a>
        </div>{" "}
      </div>
    </div>
  );
}

function Schedule() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isAddTask, setAddTasks] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const newTask = { id: Date.now(), name, description };
    setTasks([...tasks, newTask]);
    setName("");
    setDescription("");
  }

  function handleReset() {
    setName("");
    setDescription("");
  }

  function handleAddTask() {
    setAddTasks(!isAddTask);
  }

  function handleCheckboxChange(taskId) {
    if (selectedTaskId.includes(taskId)) {
      setSelectedTaskId(selectedTaskId.filter((id) => id !== taskId));
    } else {
      setSelectedTaskId([...selectedTaskId, taskId]);
    }
  }

  return (
    <div className="schedule">
      {isAddTask && (
        <form onSubmit={handleSubmit}>
          <label>Task Name</label>
          <input
            type="text"
            placeholder="Task Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Time frame</label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className={description || name ? "" : "hidden"}>
            <button
              onClick={handleReset}
              className="task-btn btn-edit"
              type="reset"
            >
              Reset
            </button>
            <button className="task-btn btn-edit" type="submit">
              Submit
            </button>
          </div>
        </form>
      )}
      <div>
        <h2>Daily Schedule</h2>
        <hr />
        <ul>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <span
                key={task.id}
                style={{
                  textDecoration: selectedTaskId.includes(task.id)
                    ? "line-through"
                    : "none",
                }}
              >
                {
                  <li key={task.id}>
                    <div className="task">
                      <h4>{task.name}</h4>
                      <p>{task.description}</p>
                      <input
                        type="checkbox"
                        className="check-box"
                        checked={selectedTaskId.includes(task.id)}
                        onChange={() => handleCheckboxChange(task.id)}
                      />
                    </div>
                  </li>
                }
              </span>
            ))
          ) : (
            <div className="empty-task">
              <h4>
                <i>You haven't scheduled anything yet!</i>
              </h4>
            </div>
          )}
        </ul>
        <hr></hr>
        <button
          onClick={handleAddTask}
          className="task-btn btn-edit"
          type="submit"
        >
          {isAddTask ? <span>Done</span> : <span>Add Task</span>}
        </button>
      </div>
    </div>
  );
}

function SelfNotes() {
  const [isNoteClicked, setIsNoteClicked] = useState(false);

  function handleNote() {
    setIsNoteClicked(!isNoteClicked);
  }

  return (
    <div className="self-notes">
      <ul className={isNoteClicked ? "note-list" : "hidden"}>
        <li>English</li>
        <li>Maths</li>
        <li>Biology</li>
        <li>Physics</li>
        <li>Chemistry</li>
      </ul>
      <button onClick={handleNote} className="note-btn">
        Note
      </button>
    </div>
  );
}

function Footer() {
  const [feedBack, setFeedBack] = useState(false);

  function handleSubmit() {
    setFeedBack(!feedBack);
  }
  return (
    <div className="footer">
      <p>All rights reserved.</p>
      <p>Contact us: 123-456-7890</p>
      <button onClick={() => handleSubmit()}>Feedback</button>
      {feedBack && <Feedback onSubmit={handleSubmit} />}
    </div>
  );
}

function Feedback({ onSubmit }) {
  return (
    <div className="feedback">
      <form>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <textarea placeholder="Feedback" />
        <input onClick={onSubmit} type="submit" value="Submit" />
      </form>
    </div>
  );
}
