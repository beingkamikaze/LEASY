const { urlencoded } = require("express");
const express = require("express");
const path = require("path");
const app = express();

require("./db/conn");

const Register = require("./models/registers");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname,"../public");
const templete_path = path.join(__dirname,"../templetes/views");

app.use(express.json());
app.use(urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs" );
app.set("views",templete_path);

app.get("/",(req,res) => {
    res.render("index")
});

app.get("/register", (req , res) => {
    res.render("register");
});
app.get("/login", (req , res) => {
    res.render("login");
});
//Create a new user in our DATABASE
app.post("/register",async (req , res) => {
    try {
       const password = req.body.password;
       const cpassword = req.body.pswrepeat;

       if (password === cpassword)
       {
           const registerEmployee = new Register ({
                   name: req.body.name,
                   email: req.body.email,
                   mobile: req.body.mobile,
                   adhaar: req.body.adhaar,
                   password: req.body.password,
                   pswrepeat: req.body.pswrepeat
                })
               const registered = await registerEmployee.save();
               res.status(201).render("homepage1");
       }
       else {
           res.send("password are not matching")
       }

    } catch(error){
        res.status(400).send(error);
    }
});
//LOGIN CHECK
app.post("/login", async (req , res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        

        const useremail = await Register.findOne({email:email});
        

        if(useremail.password === password){
            res.status(201).render("homepage1");
        }
        else {
            res.send("Wrong Credentials")
        }

    } catch {
        res.status(400).send("Invalid E-mail")
    }
});

app.listen(port, () => {
    console.log(`Server is running on port no ${port}`);
})