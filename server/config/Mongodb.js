import mongoose from "mongoose";

const connectDatabase = async () =>{
    try{
        const connection = await mongoose.connect(process.env.mongodb_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connect Success");
    }
    catch(error){
        console.log(error);
        process.exit(1)
    }
}

export default connectDatabase