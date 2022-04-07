let express = require("express");
let morgan = require("express");
let cors = require("cors");
let helmet = require("helmet");
let PORT = 8000;
// --   --  --
let app = express();
// --   --  --
app.use(morgan("tiny"));
app.use(morgan());
app.use(cors());
// --   --  --

app.get("/", safasf);
// --   --  --
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));