import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,sendPasswordResetEmail, sendEmailVerification} from "firebase/auth";
import { firebaseConfig } from "../config/firebase-config.js"
import { initializeApp } from "firebase/app";
initializeApp(firebaseConfig)
const auth = getAuth();
export function signup(req, res) {
    if (!req.body.email || !req.body.password) {
        return res.status(422).json({ message:"email & password both fields are required"});
    }
 createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
      return res.status(200).json({ user: user });
  })
        .catch(function (err) {
            if (err.code === 'auth/weak-password') {
                return res.status(500).json({ error: err.message });
            } else {
                return res.status(500).json({ error: err.message });
            }
        });
}

export function signin(req, res){
    if (!req.body.email || !req.body.password) {
        return res.status(422).json({ message:"email & password both fields are required"});
    }
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
        .then((userCredential) => {
            return res.status(200).json(userCredential.user);
        })
        .catch(function (err) {
            if (err.code === 'auth/wrong-password') {
                return res.status(500).json({ error: err.message });
            } else {
                return res.status(500).json({ error: err.message });
            }
        });
}

export function sendMailVerification(req, res) {

    sendEmailVerification(auth.currentUser)
        .then(function () {
            return  res.status(200).json({ response: "Verification Email Send Successfully" })
        })
        .catch(function (err) {
            if (err.code === 'auth/too-many-requests') {
                return res.status(500).json({ error: err.message });
            } else {
                return res.status(500).json({ error: err.message });
            }
        })
}
 
export function forgotPassword(req, res) {
    if (!req.body.email) {
        return res.status(422).json({ error: "Email is requeied" });
    }
    sendPasswordResetEmail(auth, req.body.email)
        .then(function () {
            return res.status(200).json({ response: "Email Sent successfully" })
        })
        .catch(function (err) {
            if (err.code === 'auth/invalid-email') {
                return res.status(500).json({ error: err.message });
            } else if (err.code === 'auth/user-not-found') {
                return res.status(400).json({ error: err.message });
            }
            else {
                return res.status(500).json({ error: err.message });
            }
        })
}




// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed in 
//       const user = userCredential.user;
//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//     });