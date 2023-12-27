import {Router} from "express"
import { createEmployees, getEmployees, updateEmployees, deleteEmployees,getEmployee} from "../controllers/employees.controller.js";

const router = Router();


router.get("/employees",getEmployees )
router.get("/employees/:id",getEmployee ) // To get a only employee we have to used /employees/:id instead of /employees
router.post("/employees", createEmployees )
router.patch("/employees/:id", updateEmployees)
router.delete("/employees/:id", deleteEmployees)

export default router;