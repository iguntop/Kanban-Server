const router = require("express").Router()
const controllertask = require("../controllers/task")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")

router.post("/",authentication,controllertask.create)
router.put("/:id",authentication,authorization,controllertask.update)
router.delete("/:id",authentication,authorization,controllertask.delete)
router.get("/",authentication,controllertask.viewall)

module.exports = router