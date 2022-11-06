const mongoose = require("mongoose"),
    express = require("express"),
    app = express(),
    PORT = process.env.PORT || 4000;

app.use(express.static("public"));
app.use(express.json());
    
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Headers', '*');
    res.append('Access-Control-Allow-Methods', '*');
    next();
});

app.listen(PORT, async () => {
    console.log(`Server starting @ PORT ${PORT}`);
})