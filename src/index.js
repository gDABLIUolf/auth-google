const express = require("express")
const session = require("express-session")
const passport = require("./passport")
const app = express()


app.use(session({
    secret: "teste",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.use(passport.initialize())
app.use(passport.session())

app.get("/", (req, res) => {
    return res.status(200).send({ message: "api de login" })
})

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.json(req.user);
    });

app.get('/auth/github',
    passport.authenticate('github'));

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
        return res.json(req.user)
    })


app.listen(3000, () => {
    console.log("App rodando na porta 3000")
})