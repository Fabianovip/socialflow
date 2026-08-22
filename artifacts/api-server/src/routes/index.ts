import { Router, type IRouter } from "express";
import healthRouter from "./health";
import discordDataRouter from "./discord-data";

const router: IRouter = Router();

router.use(healthRouter);
router.use(discordDataRouter);

export default router;
