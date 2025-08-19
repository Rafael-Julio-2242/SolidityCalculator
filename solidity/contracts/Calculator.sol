// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Calculator {
 int256 private result;
 event CalculationPerformed(string operation, int256 a, int256 b, int256 result);

 constructor(int256 _initialResult) {
  result = _initialResult;
  emit CalculationPerformed("Initialized", 0, 0, result);
 }

 function add(int256 a, int256 b) public returns (int256) {
  result = a + b;
  emit CalculationPerformed("Addition", a, b, result);
  return result;
 } 

 function sub(int256 a, int256 b) public returns (int256) {
  result = a - b;
  emit CalculationPerformed("Subtraction", a, b, result);
  return result;
 }

 function mul(int256 a, int256 b) public returns (int256) {
  result = a * b;
  emit CalculationPerformed("Multiplication", a, b, result);
  return result;
 }

 function dev(int256 a, int256 b) public returns (int256) {
  require(!(b == 0), "Division by zero");
  result = a / b;
  emit CalculationPerformed("Division", a, b, result);
  return result;
 }

 function getLastResult() public view returns (int256) {
  return result;
 }

}