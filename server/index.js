let express = require("express");
let morgan = require("morgan");
let cors = require("cors");
let helmet = require("helmet");
let request = require("request");
let bodyParser = require('body-parser')
let bcrypt = require("bcrypt");

let { MongoClient, ServerApiVersion } = require('mongodb')
let uri = "mongodb+srv://bathio:1qazxsw2@cluster0.fmmqu.mongodb.net/databaseName?retryWrites=true&w=majority"
let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

let app = express();
let PORT = 8000;

app.use(morgan("tiny"));
app.use(morgan());
app.use(cors());
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));

let jsonParser = bodyParser.json()

app.post("/newmix", jsonParser, newMix)
app.post("/newuser", jsonParser, newUser)
app.post("/login", jsonParser, login)
app.get("/allMixes", jsonParser, getMixes)
app.get("/getAllUser", jsonParser, getAllUser)
app.get("/getOneUser/:name", jsonParser, getOneUser)

async function newMix(req, response)
{
    let magic = req.body;

    async function dbFunction(dbName)
    {
        await client.connect()
        let db = client.db(dbName)
        let xxxx =  { magic }
        await db.collection("mixes").insertOne(xxxx);
        client.close()
    }

    dbFunction("databaseName")
    response.status(200).json({body : req.body})
}

async function newUser(req, response)
{
    let magic = req.body;
    console.log(magic.user.password)

    async function dbFunction(obj)
    {
        await client.connect();  
        let db = client.db('databaseName')
        let xxxx =  { obj }
        await db.collection("users").insertOne(xxxx);
        client.close()
    }

    bcrypt.hash(magic.user.password, 5, function (err, hash) {
        console.log(hash);
        let newUserInfo = {
            username: magic.user.username,
            password: hash,
            email: magic.user.email
        }
        dbFunction(newUserInfo)
    });

    response.status(200).json({body : req.body})
}

async function login(req, res)
{
    let magic = req.body
    try
    {
        await client.connect()
        let db = client.db("databaseName")
        let user = await db.collection("users").findOne({'obj.username' : magic.user.username })
        let data =  {
            _id: user._id ,
            obj: {
                username: user.obj.username,
                email: user.obj.email
            }
        }
        if (!bcrypt.compareSync(magic.user.password, user.obj.password ) )
        { res.status(400).json({ status: 400, err: 'invalid password'}) }
        res.status(200).json({ status: 200, data: data})
        client.close(); 
    } 
    catch (err) { console.log(err.stack);res.status(404).json({ status: 404,  data: err.stack}) }
}

async function getOneUser (req, res)
{  //console.log("getOneUser")

    let userId = req.params.name; console.log(req.params.name)
    try
    {
        await client.connect(); 
        let db = client.db("databaseName");
        let user = await db.collection("users").findOne({'obj.username' : userId })
        let data =  {
            _id: user._id ,
            obj: {
                username: user.obj.username,
                email: user.obj.email
            }
        }
        let mixes = await db.collection("mixes").find({'magic.user' : userId }).toArray();
        res.status(200).json({ status: 200, data: data, mixes: mixes})
        client.close(); 
    } 
    catch (err) { console.log(err.stack);res.status(404).json({ status: 404,  data: err.stack}) }
}

async function getMixes (request, response)
{       // console.log("getMixes")

    try
    {
        await client.connect();
        console.log("client connected")
        let db = client.db("databaseName")
        let mixes = await db.collection("mixes").find().toArray();
        console.log(mixes)
        client.close(); console.log(mixes)
        response.status(200).json({ status: 200, data: mixes})
    }
    catch (err) { console.log(err.stack);response.status(404).json({ status: 404,  data: err.stack}) }
}

async function getAllUser (request, response)
{
    try
    {
        await client.connect()
        let db = client.db("databaseName")
        let users = await db.collection("users").find().toArray();
        client.close(); console.log(users)
        response.status(200).json({ status: 200, data: users})
    }
    catch (err) { console.log(err.stack);response.status(404).json({ status: 404,  data: err.stack}) }
}

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));