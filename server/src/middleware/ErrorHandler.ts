import { type Request, type Response } from "express";

export function NotFound(req: Request, res: Response) {
  res.status(404).json({ message: "Not Found!" });
}

export function SendData(req: Request, res: Response, data: Object) {
  res.status(200).json(data);
}

export function SucessfulAction(req: Request, res: Response) {
  res.status(201).json({ message: "Action Sucessful" });
}
