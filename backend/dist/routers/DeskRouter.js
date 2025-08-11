import { Router } from "express";
import DeskController from "../services/user-management/desk-management/DeskController";
const endpoint = Router();
const desk = new DeskController();
endpoint.post('/find', desk.findByDeskId);
endpoint.post('/remove', desk.remove);
export default desk;
