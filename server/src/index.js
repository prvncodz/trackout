import DbConn from "./db/index.js";
import app from "./app.js";

DbConn()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("app running at : http://localhost:", process.env.PORT);
        })
    })
    .catch((error) => {
        console.log("ERROR :", error.message);
    })

