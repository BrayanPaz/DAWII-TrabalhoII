import mongoose from "mongoose";
const url = "mongodb+srv://BrayanPaz:1234@brayanpaz.r8pow.mongodb.net/?appName=BrayanPaz"
const conexao = await mongoose.connect(url)

export default conexao