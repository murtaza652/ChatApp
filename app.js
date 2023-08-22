const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/login", (req, res) => {
    res.send(`<form action="/" method="post" onsubmit="localStorage.setItem('username', document.getElementById('username').value)">
                <input type="text" id="username" name="username" placeholder="Username">
                <button type="submit">Login</button>
              </form>`);
});


app.post("/message", (req, res) => {
    console.log(req.body.username);
    console.log(req.body.message);
    
    fs.writeFile("message.txt", `${req.body.username}: ${req.body.message}\n`, { flag: 'a' }, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error storing message');
        } else {
            res.redirect('/');
        }
    });
});

app.use("/", (req, res) => {
    console.log(req.body);
    fs.readFile("message.txt", (err, data) => {
        if (err) {
            console.log(err);
            data="No chats exist";
        }
        res.send(
            `${data} <form action="/message" method="post">
                <input type="text" name="message" placeholder="Message">
                <input type="hidden" name="username" id="username">
                <br/>
                <button type="submit">Send</button>
              </form>
              <script>
                document.getElementById('username').value = localStorage.getItem('username');
              </script>`);
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
