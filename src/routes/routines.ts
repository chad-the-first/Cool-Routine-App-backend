import  express  from "express";
import * as RoutinesController from "../controllers/routines"

const router = express.Router();

router.get('/',  RoutinesController.getRoutines);

router.get('/:routineId', RoutinesController.getRoutine)

router.post('/', RoutinesController.createRoutine);

export default router;