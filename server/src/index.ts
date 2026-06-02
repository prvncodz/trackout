import DbConn from "./db/index";
import app from "./app";

DbConn()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`app running at : http://localhost:${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log("Make sure your have a mongodb connection string in your .env file")
        console.log("ERROR :", error.message);
        process.exit(1);
    })

