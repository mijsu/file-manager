// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

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

onAuthStateChanged(auth, (user) => {
  
  if(user){

    const userId = user.uid

    const docRef = doc(db, "users", userId);
    getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        document.getElementById('loggedEmail').innerText = userData.email;
        document.getElementById('loggedUserName').innerText = userData.username;  
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }
  else{
      console.log("User id not found in local storage.");
  }
})

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', (event) => {
  localStorage.removeItem('loggedInUserName');
  signOut(auth)
  .then(() => {
    console.log("User signed out successfully.");
    window.location.href = "login.html"; // Redirect to login page
  }).catch((error) => {
    console.error("Error signing out: ", error);
  });
})
