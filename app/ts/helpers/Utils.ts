import { Printer } from "../models/index";

export function printObj(...objs: Printer[]) {
    objs.forEach(obj => obj.objStrigfy());
}