// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvuprqsjKk-GuvfMUu8HBg-9vEWUPJZms",
  authDomain: "log-in-form-f7f5f.firebaseapp.com",
  projectId: "log-in-form-f7f5f",
  storageBucket: "log-in-form-f7f5f.appspot.com",
  messagingSenderId: "285075230914",
  appId: "1:285075230914:web:e7f12d1f0d0187b9d9eb5b"
};

// Initialize Firebase once
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

// Show message function
function showMessage(message, divID) {
  var messageDiv = document.getElementById(divID);
  if (messageDiv) {
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
      messageDiv.style.opacity = 0;
    }, 5000);
  }
}

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  const signUp = document.getElementById("signUp");
  const submitSignIn = document.getElementById("submitSignIn");

  // Sign Up Handler
  if (signUp) {
    signUp.addEventListener("click", (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const username = document.getElementById("username").value;

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userData = {
            email: email,
            username: username,
          };

          showMessage("Account Created Successfully", "signUpMessage");

          const docRef = doc(db, "users", user.uid);
          setDoc(docRef, userData)
            .then(() => {
              window.location.href = "login.html";
            })
            .catch((error) => {
              console.error("Error writing document", error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/email-already-in-use") {
            showMessage("Email Address Already Exists!", "signUpMessage");
          } else {
            showMessage("Unable to create user", "signUpMessage");
          }
        });
    });
  }

  // Sign In Handler
  if (submitSignIn) {
    submitSignIn.addEventListener("click", (event) => {
      event.preventDefault();
      const email = document.getElementById("email1").value;
      const password = document.getElementById("password1").value;

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          showMessage("Login is successful", "signInMessage");
          const user = userCredential.user;
          localStorage.setItem("loggedInUserId", user.uid);
          window.location.href = "index.html";
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/invalid-credential" || errorCode === "auth/wrong-password") {
            showMessage("Incorrect Email or Password!", "signInMessage");
          } else if (errorCode === "auth/user-not-found") {
            showMessage("Account does not exist!", "signInMessage");
          } else {
            showMessage("Unable to sign in. Please try again.", "signInMessage");
          }
        });
    });
  }
});
