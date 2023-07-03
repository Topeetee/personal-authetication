const express =  require("express")
const router = express.Router();

const{createUser, login } = require("../controller/verify")

router.post("/signup",createUser );
router.post("/login", login)

module.exports = router;