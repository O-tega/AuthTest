const mongoose = require('mongoose');


const connectDb = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
              // useNewUrlParser: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        })

        console.log(`Database connected successfully at ${conn.connection.host}`.cyan.underline.bold)

    }catch(err){
        console.log('Error: ', err.red), 
        process.exit(1)
    }
}


module.exports = connectDb