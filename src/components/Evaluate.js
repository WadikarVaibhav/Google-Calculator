'use strict';

import CalculatorConstants from '../constants/constants.js';
import Validator from './Validate.js';

var Evaluate = {
  isUnaryOperator: function(exp) {
    if(exp === CalculatorConstants.SINE || exp === CalculatorConstants.COSINE || exp === CalculatorConstants.TANGENT || exp === CalculatorConstants.LOG || exp === CalculatorConstants.SQRT || exp === CalculatorConstants.FACTORIAL || exp === CalculatorConstants.SUBTRACTION) {
      return true;
    }
    return false;
  },

  isBinaryOperator: function(exp) {
    if(exp === CalculatorConstants.ADD || exp === CalculatorConstants.MUL || exp === CalculatorConstants.SUB || exp === CalculatorConstants.DIV || exp === CalculatorConstants.OPEN_PARENTHESIS || exp === CalculatorConstants.CLOSED_PARENTHESIS ) {
      return true;
    }
    return false;
  },

  getFactorial: function(operand1) {
    var factorial = 1;
    if(operand1 === 0) {
      return factorial;
    } else {
      while(operand1 >= 1) {
        factorial = factorial * operand1;
        operand1--;
      }
      return factorial;
    }
  },

  getOperatorPrecedence: function(exp) {
    var value = 0;
    switch(exp) {
    case CalculatorConstants.ADD:
    case CalculatorConstants.SUB:
      value = 1;
      break;
    case CalculatorConstants.DIV:
    case CalculatorConstants.MUL:
      value = 2;
      break;
    case CalculatorConstants.OPEN_PARENTHESIS :
      value = 0;
      break;
    case CalculatorConstants.CLOSED_PARENTHESIS:
      value = -1;
      break;
    case CalculatorConstants.SINE:
    case CalculatorConstants.COSINE:
    case CalculatorConstants.TANGENT:
    case CalculatorConstants.FACTORIAL:
    case CalculatorConstants.SQRT:
    case CalculatorConstants.LOG:
    case CalculatorConstants.SUBTRACTION:
      value = 3;
      break;
    }
    return value;
  },

  getValueForUnaryOperator: function(operator,  operand1) {
    if(operand1 === CalculatorConstants.PI) {
      operand1 = Math.PI;
    } else if(operand1 === CalculatorConstants.e) {
      operand1 = Math.E;
    } else {
      operand1 = parseFloat(operand1);
    }
    if(operator === CalculatorConstants.SINE) {
      return Math.sin(operand1);
    } else if(operator === CalculatorConstants.COSINE) {
      return Math.cos(operand1);
    } else if(operator === CalculatorConstants.TANGENT) {
      return Math.tan(operand1);
    } else if(operator === CalculatorConstants.LOG) {
      return Math.log(operand1);
    } else if(operator === CalculatorConstants.SQRT) {
      return Math.sqrt(operand1);
    } else if(operator === CalculatorConstants.FACTORIAL) {
      return this.getFactorial(operand1);
    } else if(operator === CalculatorConstants.SUBTRACTION) {
      var value = 0 - operand1;
      return value;
    }
    return value;
  },

  getValueForBinaryOperator: function(operator,  operand1,  operand2) {
    if(operand1 === CalculatorConstants.PI && operand2 === CalculatorConstants.PI) {
      operand1 = Math.PI;
      operand2 = Math.PI;
    } else if(operand2 === CalculatorConstants.PI && operand1 !== CalculatorConstants.e) {
      operand2 = Math.PI;
      operand1 = parseFloat(operand1);
    } else if(operand1 === CalculatorConstants.PI && operand2 !== CalculatorConstants.e) {
      operand1 = Math.PI;
      operand2 = parseFloat(operand2);
    } else if(operand1 === CalculatorConstants.e && operand2 === CalculatorConstants.e) {
      operand1 = Math.E;
      operand2 = Math.E;
    } else if(operand2 === CalculatorConstants.e && operand1 !== CalculatorConstants.PI) {
      operand2 = Math.E;
      operand1 = parseFloat(operand1);
    } else if(operand1 === CalculatorConstants.e && operand2 !== CalculatorConstants.PI) {
      operand1 = Math.E;
      operand2 = parseFloat(operand2);
    } else if(operand1 === CalculatorConstants.PI && operand2 === CalculatorConstants.e) {
      operand1 = Math.PI;
      operand2 = Math.E;
    } else if(operand2 === CalculatorConstants.PI && operand1 === CalculatorConstants.e) {
      operand1 = Math.E;
      operand2 = Math.PI;
    } else {
      operand1 = parseFloat(operand1);;
      operand2 = parseFloat(operand2);
    }
    if(operator === CalculatorConstants.MUL) {
      return operand1 * operand2;
    } else if(operator === CalculatorConstants.ADD) {
      return operand1 + operand2;
    } else if(operator === CalculatorConstants.SUB) {
      return operand1 - operand2;
    } else {
      return operand1 / operand2;
    }
  },

  evaluateExpression: function(expression) {
    var value, operator, operand1, operand2;
    var expressionLength = expression.length;
    if(expressionLength === 1 ) {
      if(expression[0] === CalculatorConstants.PI){
        return Math.PI;
      } else if(expression[0] === CalculatorConstants.e) {
        return Math.E;
      }
      return expression[0];
    } else {
      for( var i=0 ; i<expressionLength ; i++) {
        if(expression.length === 1) {
          if(expression[0] === CalculatorConstants.PI){
            return Math.PI;
          } else if(expression[0] === CalculatorConstants.e) {
            return Math.E;
          }
          return expression[0];
        } else if(this.isBinaryOperator(expression[i])) {
          operator = expression[i];
          operand2 = expression[i-1];
          operand1 = expression[i-2];
          value = this.getValueForBinaryOperator(operator, operand1, operand2);
          expression[i-2] = value + CalculatorConstants.BLANK;
          expression.splice(i-1, 1);
          expression.splice(i-1, 1);
          i = -1;
        } else if(this.isUnaryOperator(expression[i])) {
          operator = expression[i];
          operand1 = expression[i-1];
          value = this.getValueForUnaryOperator(operator, operand1);
          expression[i-1] = value + CalculatorConstants.BLANK;
          expression.splice(i, 1);
          i = -1;
        } else if(expression[i] === CalculatorConstants.DOT) {
          expression[i-1] = expression[i-1] + expression[i] + expression[i+1];
          expression.splice(i, 1);
          expression.splice(i, 1);
          i = -1
        }
      }
    }
    return expression[0];
  },

  getPostFixExpression: function(expression) {
  //  console.log(expression);
    var expressionLength = expression.length;
    var stackTop;
    var currentOperatorValue, stackTopOperatorValue;
    var operatorStack = [];
    var postfixExpression = [];
    for( var i=0;i<expressionLength;i++) {
      if(Validator.isOperand(expression[i])) {
        postfixExpression.push(expression[i]);
      } else if(this.isBinaryOperator(expression[i]) || this.isUnaryOperator(expression[i])) {
        currentOperatorValue = this.getOperatorPrecedence(expression[i]);
        if(currentOperatorValue === -1) {
          while(!(operatorStack[0] === CalculatorConstants.OPEN_PARENTHESIS )) {
            stackTop = operatorStack[0];
            operatorStack.shift();
            postfixExpression.push(stackTop);
          }
          operatorStack.shift();
        } else if(currentOperatorValue === 0) {
          operatorStack.unshift(expression[i]);
        } else {
          if(operatorStack.length > 0) {
            stackTopOperatorValue = this.getOperatorPrecedence(operatorStack[0]);
            if(stackTopOperatorValue < currentOperatorValue) {
              operatorStack.unshift(expression[i]);
            } else {
              while(operatorStack.length > 0 && (this.getOperatorPrecedence(operatorStack[0]) >= this.getOperatorPrecedence(expression[i]))) {
                stackTop = operatorStack[0];
                operatorStack.shift();
                postfixExpression.push(stackTop);
              }
              operatorStack.unshift(expression[i]);
            }
          } else {
            operatorStack.unshift(expression[i]);
          }
        }
      }
    }
    while(operatorStack.length > 0) {
      stackTop = operatorStack[0];
      operatorStack.shift();
      postfixExpression.push(stackTop);
    }
  //  console.log(postfixExpression);
    return postfixExpression;
  },
};

module.exports = Evaluate;
