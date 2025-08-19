import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule("CalculatorModule", (m) => {
 const calculator = m.contract("Calculator", [0]);
 return { calculator };
});
