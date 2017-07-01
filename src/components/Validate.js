'use strict';

import CalculatorConstants from '../constants/constants.js';
import Data from './Data.js';

var validator = {

  isOperand: function(exp) {
    if(exp === CalculatorConstants.DOT) {
      return true;
    }
    if(exp === CalculatorConstants.PI) {
      return true;
    }
    if(exp === CalculatorConstants.e) {
      return true;
    }
    if (isNaN(parseFloat(exp))) {
      return false;
    }
    return true;
  },

  isCharOperator: function(data) {
    if(data === CalculatorConstants.ADD || data === CalculatorConstants.SUB || data === CalculatorConstants.MUL || data === CalculatorConstants.DIV) {
      return true;
    }
    return false;
  },

  isOperator:function(data) {
    if(data === CalculatorConstants.ADDITION || data === CalculatorConstants.SUBTRACTION || data === CalculatorConstants.MULTIPLICATION || data === CalculatorConstants.DIVISION ) {
      return true;
    }
    else false;
  },

  isSubtractionFirst: function(expression, userInput) {
    if(expression === CalculatorConstants.BLANK && userInput === CalculatorConstants.SUBTRACTION || expression === CalculatorConstants.OPEN_PARENTHESIS && userInput === CalculatorConstants.SUBTRACTION) {
      return true;
    }
    return false;
  },

  isExpressionContainDot: function(expression) {
    if(expression.includes(CalculatorConstants.DOT)) {
      return true;
    }
    return false;
  },

  isFirstCharSubtractor: function(expression) {
    if(Data.getLengthOfExpression(expression) === 1 && expression === CalculatorConstants.SUBTRACTION) {
      return true;
    }
    return false;
  },

  isTrignometricOperator: function(userInput) {
    if(userInput === CalculatorConstants.SINE || userInput === CalculatorConstants.COSINE || userInput === CalculatorConstants.TANGENT) {
      return true;
    }
    return false;
  },

  isExpressionValidForOpenParenthesis: function(i, expressionArray) {
    if( i > 0) {
      if((expressionArray[i-1] !== CalculatorConstants.LOG) && !this.isOperator(expressionArray[i-1]) && !this.isCharOperator(expressionArray[i-1]) && !this.isTrignometricOperator(expressionArray[i-1]) && !(expressionArray[i-1] === CalculatorConstants.SQRT)) {
        return true;
      }
    }
    return false;
  },

  isExpressionValidForLog: function(i, expressionArray) {
    if( i > 0) {
      if(expressionArray[i-1] !== CalculatorConstants.DOT && !this.isOperator(expressionArray[i-1]) && !this.isCharOperator(expressionArray[i-1]) && expressionArray[i-1] !== CalculatorConstants.OPEN_PARENTHESIS) {
        return true;
      }
    }
    return false;
  },

  isExpressionValidForTrigos: function(i, expressionArray) {
    if(i > 0) {
      if(expressionArray[i-1] !== CalculatorConstants.OPEN_PARENTHESIS && !this.isCharOperator(expressionArray[i-1]) && !this.isOperator(expressionArray[i-1])) {
        return true;
      }
    }
    return false;
  },

  isExpressionValidForPI: function(i, expressionArray) {
    if(i > 0) {
      if(expressionArray[i-1] === CalculatorConstants.CLOSED_PARENTHESIS || this.isOperand(expressionArray[i-1]) || expressionArray[i-1] === CalculatorConstants.MODULUS || expressionArray[i-1] === CalculatorConstants.PI || expressionArray[i-1] === CalculatorConstants.e) {
        return true;
      }
    }
    return false;
  },

  isExpressionValidForEuler: function(i, expressionArray) {
    if(i > 0) {
      if(expressionArray[i-1] === CalculatorConstants.CLOSED_PARENTHESIS || this.isOperand(expressionArray[i-1]) || expressionArray[i-1] === CalculatorConstants.MODULUS || expressionArray[i-1] === CalculatorConstants.PI || expressionArray[i-1] === CalculatorConstants.e) {
        return true;
      }
    }
    return false;
  },

  isExpressionValidForSQRT: function(i, expressionArray) {
    if( i > 0) {
      if(this.isOperand(expressionArray[i-1] || expressionArray[i-1] === CalculatorConstants.CLOSED_PARENTHESIS || expressionArray[i-1] === CalculatorConstants.PI || expressionArray[i-1] === CalculatorConstants.e || expressionArray === CalculatorConstants.FACTORIAL || expressionArray[i-1] === CalculatorConstants.MODULUS)) {
        return true;
      }
    }
    return false;
  },

  isExpressionValidForClosedParenthesis: function(i, expressionArray) {
    if( i > 0) {
      if(expressionArray[i+1] !== CalculatorConstants.CLOSED_PARENTHESIS &&
        !this.isOperator(expressionArray[i+1]) && !this.isCharOperator(expressionArray[i+1]) && !(expressionArray[i+1] === CalculatorConstants.FACTORIAL)) {
        return true;
      }
    }
    return false;
  }


};

export default validator;
