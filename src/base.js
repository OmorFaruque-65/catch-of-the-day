import Rebase from 're-base' //react firebase that will mirror our state in firebase
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp(
  {
    apiKey: "AIzaSyDT1vhsfp1aH7rYDSNyewoi2f8sfBCt5d8",
    authDomain: "catch-of-the-day-omor-faruque.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-omor-faruque.firebaseio.com",
    // projectId: "catch-of-the-day-omor-faruque",
    // storageBucket: "",
    // messagingSenderId: "129897188594",
    appId: "1:129897188594:web:440dbc2f89a5e2cc"
  }
)

const base = Rebase.createClass(firebaseApp.database())

export {firebaseApp}

export default base

