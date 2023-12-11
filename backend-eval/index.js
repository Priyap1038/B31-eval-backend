const express = require("express");
const cors = require("cors");
const { useRouter } = require("./routes/user.route");
const { postRouter } = require("./routes/post.route");

const app = express();

app.use(express.json());
app.use(cors())

app.use("/users",useRouter);
app.use("/posts",postRouter);

app.listen(process.env.PORT,async()=>{
try {
    console.log("Database is connected");
    console.log("Server is running the port 5500");
} catch (error) {
    console.log(error.message);
}
})