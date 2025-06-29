const express=require("express")

const app=express();

const cookieParser=require("cookie-parser")
const path=require("path")
const ownersRouter=require("./routes/ownersRouter")
const userRouter=require("./routes/userRouter")
const productRouter=require("./routes/productRouter")

const db=require("./config/mongoose-connection")

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs")

app.use("/owners",ownersRouter);
app.use("/user",userRouter);
app.use("/product",productRouter);

app.listen(3000)