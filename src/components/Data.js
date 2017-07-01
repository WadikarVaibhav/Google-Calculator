'use strict';

import CalculatorConstants from '../constants/constants.js';
import Validator from './Validate.js';

var Data = {

  getClosedParenthesis: function(expression) {
    var openParenthesisOccurence = (expression.match(/\(/g) || []).length;
    var closedParenthesisOccurence = (expression.match(/\)/g) || []).length;
    var count = openParenthesisOccurence - closedParenthesisOccurence;
    var closedParenthesis=CalculatorConstants.BLANK;
    if(count > 0) {
      for(var i=0;i<count; i++) {
        closedParenthesis+=')';
      }
    }
    return closedParenthesis;
  },

  getUIComponents() {
    var myTable = [[CalculatorConstants.DEGREE, CalculatorConstants.SQRT, CalculatorConstants.CLEAR, CalculatorConstants.OPEN_PARENTHESIS, CalculatorConstants.CLOSED_PARENTHESIS, "\u232B"],
    [CalculatorConstants.LOG, CalculatorConstants.SINE, CalculatorConstants.SEVEN, CalculatorConstants.EIGHT, CalculatorConstants.NINE, CalculatorConstants.DIVISION],
    [CalculatorConstants.PI, CalculatorConstants.COSINE, CalculatorConstants.FOUR, CalculatorConstants.FIVE, CalculatorConstants.SIX, CalculatorConstants.MULTIPLICATION],
    [CalculatorConstants.MODULUS,CalculatorConstants.TANGENT,  CalculatorConstants.ONE, CalculatorConstants.TWO, CalculatorConstants.THREE, CalculatorConstants.SUBTRACTION],
    [CalculatorConstants.e, "x"+CalculatorConstants.FACTORIAL, CalculatorConstants.ZERO, CalculatorConstants.DOT, CalculatorConstants.EQUAL, CalculatorConstants.ADDITION]];
    return myTable;
  },

  getClassForComponent: function(component) {
    var classNameForButton = "numericButton";
    if(component === CalculatorConstants.CLEAR ) {
      classNameForButton="clearParanthesisButton";
    } else if(component === CalculatorConstants.EQUAL) {
      classNameForButton = "equalToButton"
    } else if( component === CalculatorConstants.OPEN_PARENTHESIS || component === CalculatorConstants.CLOSED_PARENTHESIS ) {
      classNameForButton="clearParanthesisButton";
    } else if(component === CalculatorConstants.DIVISION || component === CalculatorConstants.MULTIPLICATION || component === CalculatorConstants.SUBTRACTION || component === CalculatorConstants.ADDITION) {
      classNameForButton = "buttonOperator";
    } else if(component === CalculatorConstants.PI || component === CalculatorConstants.MODULUS || component === CalculatorConstants.SINE ||
      component === CalculatorConstants.COSINE || component === CalculatorConstants.TANGENT || component === "x!" || component === CalculatorConstants.SQRT || component === CalculatorConstants.e ) {
        classNameForButton = "functionalButtons";
      } else if(component === CalculatorConstants.DEGREE || component === CalculatorConstants.LOG ) {
        classNameForButton = "degreeButtons";
      } else if (component === "\u232B") {
        classNameForButton = "deleteButton";
      }
      return classNameForButton;
    },

    getLastCharInText: function(expression) {
      if(expression !== CalculatorConstants.BLANK) {
        return expression.slice(-1);
      }
    },

    removeLastOperator: function(expression) {
      var lastChar = this.getLastCharInText(expression);
      if(Validator.isOperator(lastChar) || Validator.isCharOperator(lastChar)) {
        expression = expression.slice(0, -1);
        return expression;
      }
      return expression;
    },

    getLengthOfExpression: function(expression) {
      return expression.length;
    },

    getValidExpression(expression) {
      var expressionArray = expression.match(/sin|log|sqrt|cos|tan|e|\π|\.|\√|\×|\÷|\−|\/|\*|\d+|\!|\)|\(|\+|\-/g);
      var expressionLength = expressionArray.length;
      for(var i = 0 ; i < expressionLength ; i++) {
        if(expressionArray[i] === CalculatorConstants.SUB) {
          expressionArray[i] = CalculatorConstants.SUBTRACTION;
        } else if(expressionArray[i] === CalculatorConstants.DIVISION) {
          expressionArray[i] = CalculatorConstants.DIV;
        } else if(expressionArray[i] === CalculatorConstants.MULTIPLICATION) {
          expressionArray[i] = CalculatorConstants.MUL;
        } else if(expressionArray[i] === CalculatorConstants.SUBTRACTION) {
          expressionArray[i] = CalculatorConstants.SUB;
        } else if(expressionArray[i] === CalculatorConstants.ADDITION) {
          expressionArray[i] = CalculatorConstants.ADD;
        } else if(Validator.isTrignometricOperator(expressionArray[i]) && Validator.isExpressionValidForTrigos(i, expressionArray)) {
          expressionArray.splice(i, 0, CalculatorConstants.MUL);
          i++;
          expressionLength = expressionArray.length;
        } else if(expressionArray[i] === CalculatorConstants.OPEN_PARENTHESIS && Validator.isExpressionValidForOpenParenthesis(i, expressionArray)) {
          expressionArray.splice(i, 0, CalculatorConstants.MUL);
          i++;
          expressionLength = expressionArray.length;
        } else if(i < expressionLength-1 && expressionArray[i] === CalculatorConstants.CLOSED_PARENTHESIS && Validator.isExpressionValidForClosedParenthesis(i, expressionArray)) {
          if(expressionArray[i+1]===CalculatorConstants.DOT) {
            expressionArray.replace(expressionArray[i+1], CalculatorConstants.MUL);
          } else {
            expressionArray.splice(i+1, 0, CalculatorConstants.MUL);
            expressionLength = expressionArray.length;
          }
        } else if(expressionArray[i] === CalculatorConstants.SQRT && Validator.isExpressionValidForSQRT(i, expressionArray)) {
          expressionArray.splice(i, 0, CalculatorConstants.MUL);
          i++;
          expressionLength = expressionArray.length;
        } else if(expressionArray[i] === CalculatorConstants.PI && Validator.isExpressionValidForPI(i, expressionArray)) {
          expressionArray.splice(i, 0, CalculatorConstants.MUL);
          i++;
          expressionLength = expressionArray.length;
        } else if(expressionArray[i] === CalculatorConstants.e && Validator.isExpressionValidForEuler(i, expressionArray)) {
          expressionArray.splice(i, 0, CalculatorConstants.MUL);
          i++;
          expressionLength = expressionArray.length;
        } else if(expressionArray[i] === CalculatorConstants.LOG && Validator.isExpressionValidForLog(i, expressionArray)) {
          expressionArray.splice(i, 0, CalculatorConstants.MUL);
          i++;
          expressionLength = expressionArray.length;
        }
      }
      expression = expressionArray.join(CalculatorConstants.BLANK);
      expression = this.removeLastOperator(expression);
      return expression;
    }
  };

  export default Data;
