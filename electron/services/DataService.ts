import { app } from 'electron';
import fs from "fs";
import {Product, XCCData} from '../types/XCCTypes'

export function getData() : XCCData {
  const userDataPath = app.getPath("userData");
  const filePath = `${userDataPath}/xcc_data.json`;

  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } else {
    return {
      products : []
    };
  }
}

export function saveData(data : XCCData) {
  const userDataPath = app.getPath("userData");
  const filePath = `${userDataPath}/xcc_data.json`;
  fs.writeFileSync(filePath, JSON.stringify(data));
}