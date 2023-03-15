import * as express from 'express';
import * as firebase from 'firebase-admin';
import * as firebaseAuth from 'firebase-auth';

const app = express();
const port = process.env.PORT || 3000;

// Initialize Firebase
firebase.initializeApp({
    credential: firebase.credential.cert({
            "type": "service_account",
            "project_id": "<PROJECT_ID>",
            "private_key_id": "<PRIVATE_KEY_ID>",
            "private_key": "<PRIVATE_KEY>",
            "client_email": "<CLIENT_EMAIL>",
            "client_id": "<CLIENT_ID>",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "<CERT_URL>"
          }),
    databaseURL: "<DATABASE_URL>"
});


// {
//     type: "service_account",
//     "project_id": "<PROJECT_ID>",
//     "private_key_id": "<PRIVATE_KEY_ID>",
//     "private_key": "<PRIVATE_KEY>",
//     "client_email": "<CLIENT_EMAIL>",
//     "client_id": "<CLIENT_ID>",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "<CERT_URL>"
//   }
app.use(express.json());

// Route for Sign-up
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userRecord = await firebase.auth().createUser({
            email,
            password
        });
        res.status(200).json({ message: 'Sign-up successful', user: userRecord });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route for Sign-in
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userRecord = await firebase.auth().getUserByEmail(email);
        const isPasswordCorrect = await firebaseAuth.auth().signInWithEmailAndPassword(email, password);
        if (!isPasswordCorrect) {
            res.status(401).json({ error: 'Incorrect password' });
        } else {
            res.status(200).json({ message: 'Sign-in successful', user: userRecord });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
