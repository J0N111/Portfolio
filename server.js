// imports - must use EcmaScript syntax
const express = require('express');
const links = require('./redirect-links.json');
const path = require('path');

// initalize app
const app = express();
const PORT = process.env.PORT || 5000;

// set public folder as static
app.use(express.static(path.join(__dirname, 'public')));

// access public files for CSS, JS, Favicons, and Images
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// enable routing
app.use(express.urlencoded({ extended: false }));

// routing

// home page routing
app.get('/', (_, res) => {
    res.send('index.html');
});

// get request redirect for other sites
links.forEach((link) => {
    app.get('/' + link.title, (_, res) => res.redirect(link.redirect));
});

// 404 middleware
// app.use((_, res) => {
//     res.send("404.html")
// });

// activate on PORT
app.listen(PORT, () => {
    return console.log(`Server started on PORT ${PORT}`);
});
