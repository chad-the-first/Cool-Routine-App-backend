import  express  from "express";
import * as RoutinesController from "../controllers/routines"

const router = express.Router();

router.get('/',  RoutinesController.getRoutines);

router.get('/:routineId', RoutinesController.getRoutine)

router.post('/', RoutinesController.createRoutine);

router.patch('/:routineId', RoutinesController.updateRoutine);

router.delete('/:routineId', RoutinesController.deleteRoutine);

export default router;