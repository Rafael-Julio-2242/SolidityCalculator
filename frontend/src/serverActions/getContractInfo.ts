'use server';
import path from 'path';
import { promises as fs } from 'fs';

export default async function GetContractInfo() {

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const contractPath = path.join(process.cwd(), 'src/abi/Calculator.json');

  const contractInfo = await fs.readFile(contractPath, 'utf-8');

  const contractJson = JSON.parse(contractInfo);

  return {
    contractAddress,
    contractJson
  }
}