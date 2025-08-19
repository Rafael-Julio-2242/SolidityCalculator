'use client';

import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { SelectIcon, SelectTrigger } from "@radix-ui/react-select";
import { useState } from "react";
import { ethers } from "ethers";
import GetContractInfo from "@/serverActions/getContractInfo";
import { Loader2 } from "lucide-react";

export default function OperationsCard() {

  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');

  const [operation, setOperation] = useState('add');

  const [result, setResult] = useState('');

  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    try {
      if (typeof (window as any).ethereum !== 'undefined') {

        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });

        await (window as any).ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x7A69" }]
        });

        const account = (window as any).ethereum;

        const provider = new ethers.BrowserProvider(account);

        const signer = await provider.getSigner();

        return signer;
      }

      console.log('[NENHUMA CARTEIRA ENCONTRADA]!');
      return null;

    } catch (e: any) {
      console.log('[HOUVE UM ERRO AO CONECTAR AO WALLET]: ', e);
      return null;
    }
  }


  const handleExecuteOperation = async () => {
    setLoading(true);
    const signer = await connectWallet();
    
    if (!signer) {
      setLoading(false);
      return;
    }
    
    try {

      const { contractAddress, contractJson } = await GetContractInfo();

      const contract = new ethers.Contract(contractAddress, contractJson, signer);

      let result;
      let tx;

      switch (operation) {
        case 'add': 
          tx = await contract.add(firstNumber, secondNumber);
          break
        case 'sub': 
          tx = await contract.sub(firstNumber, secondNumber);
          break
        case 'mul': 
          tx = await contract.mul(firstNumber, secondNumber);
          break
        case 'div': 
          tx = await contract.div(firstNumber, secondNumber);
          break
      }

      await tx.wait();

      result = await contract.getLastResult();

      console.log('[RESULT]: ', result);
      console.log('[Type]: ', typeof result);


      setResult(result);
    } catch (e: any) {
      console.log('[HOUVE UM ERRO AO EXECUTAR A OPERACAO]: ', e);
    } finally {
      setLoading(false);
    }

  }


 return (
  <div className='border-2 border-slate-400/60 rounded-lg p-8'>
   <h1>Operations Card</h1>
   <div className='flex flex-col gap-4 mt-4'>
    <Select onValueChange={setOperation} value={operation}>
      <SelectTrigger className='p-2 border-2 border-slate-400/60 rounded-lg flex justify-between min-w-36'>
        <SelectValue placeholder="Select an operation" />
        <SelectIcon />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="add">Addition</SelectItem>
        <SelectItem value="sub">Subtraction</SelectItem>
        <SelectItem value="mul">Multiplication</SelectItem>
        <SelectItem value="div">Division</SelectItem>
      </SelectContent>
    </Select>

    <div className='flex flex-col gap-6'>
      <Label>First Number</Label>
      <Input value={firstNumber} onChange={(e) => setFirstNumber(e.target.value)}/>
    </div>

    <div className='flex flex-col gap-6'>
      <Label>Second Number</Label>
      <Input value={secondNumber} onChange={(e) => setSecondNumber(e.target.value)}/>
    </div>


    <RippleButton disabled={loading} onClick={handleExecuteOperation}> 
      {loading ? <Loader2 className="animate-spin" /> : 'Execute'}
    </RippleButton>
   </div>

   <div className='mt-4'>
    <h2>Result: {result}</h2>
   </div>

  </div>
 )
}

