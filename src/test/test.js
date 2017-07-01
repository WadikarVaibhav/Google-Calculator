'use strict';
import Validator from '../components/Validate.js';
import Evaluator from '../components/Evaluate.js';

test('is 1 operand or not', () => {
  expect(Validator.isOperand(1)).toBe(true);
});

test('is a operand or not', () => {
  expect(Validator.isOperand('a')).toBe(false);
});

test('12-1=11', () => {
  var expressionArray = ['12', '1','-']
  expect(Evaluator.evaluateExpression(expressionArray)).toBe(11+'');
});

test('4×7−sin(90)÷8×40 = 23.53001668199721', ()=>{
  var expression = ["4", "*", "7", "*", "sin", "(", "90", ")", "/", "8", "*", "40"];
  var postfixExpression = ["4", "7", "*", "90", "sin", "*", "8", "/", "40", "*"];
  expect(Evaluator.getPostFixExpression(expression)).toEqual(postfixExpression);
});
