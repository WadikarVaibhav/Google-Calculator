import React from 'react';
import ReactDOM from 'react-dom';
import CalculatorConstants from '../constants/constants.js';
import Evaluator from './Evaluate.js';
import Validator from './Validate.js';
import Data from './Data.js';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: CalculatorConstants.BLANK,
      isNewCalculation: true,
      closedParenthesis: CalculatorConstants.BLANK,
    };
  }

  handleClear() {
    this.setState({
      text: CalculatorConstants.BLANK,
      isNewCalculation: true,

    })
  }

  handleDelete() {
    var length = Data.getLengthOfExpression(this.state.text);
    if(length > 0) {
      if(this.state.isNewCalculation === true) {
        this.setState({
          text: CalculatorConstants.BLANK
        })
      } else {
        if(this.state.text.slice(-4) === CalculatorConstants.SINE + CalculatorConstants.OPEN_PARENTHESIS || this.state.text.slice(-4) === CalculatorConstants.COSINE + CalculatorConstants.OPEN_PARENTHESIS || this.state.text.slice(-4) === CalculatorConstants.TANGENT +CalculatorConstants.OPEN_PARENTHESIS) {
          this.setState({
            text: this.state.text.slice(0, -4)
          })
        } else {
          this.setState({
            text: this.state.text.slice(0, -1)
          })
        }
      }
    }
  }

  handleEqualTo(expression) {
    expression = Data.getValidExpression(expression);
    var closedParenthesis = Data.getClosedParenthesis(expression);
    if(closedParenthesis) {
      expression += closedParenthesis;
    }
    if(expression !== CalculatorConstants.BLANK) {
      expression = expression.match(/sin|log|sqrt|cos|tan|e|\π|\.|\√|\×|\÷|\−|\/|\*|\d+|\!|\)|\(|\+|\-/g);
      var result = Evaluator.evaluateExpression(Evaluator.getPostFixExpression(expression));
      this.setState({
        text: result + CalculatorConstants.BLANK,
        isNewCalculation: true
      })
    } else {
      this.setState({
        text: CalculatorConstants.BLANK,
        isNewCalculation: true
      })
    }
  }


  handleOperator(userInput) {
    var lastChar = Data.getLastCharInText(this.state.text);
    if(Validator.isSubtractionFirst(this.state.text, userInput)) {
      userInput = CalculatorConstants.SUB;
      this.setState({
        text: this.state.text + userInput,
        isNewCalculation : false
      })
    } else if(Validator.isOperator(lastChar) ) {
      this.setState({
        text: (!Validator.isFirstCharSubtractor(this.state.text)) ? Data.removeLastOperator(this.state.text) + userInput : lastChar,
        isNewCalculation : false
      });
    } else if(!Validator.isOperator(lastChar) && this.state.text !== CalculatorConstants.BLANK) {
      this.setState({
        text: Data.removeLastOperator(this.state.text) + userInput,
        isNewCalculation : false
      });
    }
  }


  handleLog(userInput) {
    var lastChar = Data.getLastCharInText(this.state.text);
    if(lastChar !== CalculatorConstants.DOT) {
      this.setState({
        text: this.state.text + userInput + CalculatorConstants.OPEN_PARENTHESIS,
        isNewCalculation: false
      })
    }
  }

  handleDot(userInput) {
    var expression = this.state.text;
    var expressionLength = Data.getLengthOfExpression(expression);
    if(expression === CalculatorConstants.BLANK) {
      this.setState({
        text: this.state.text + userInput,
        isNewCalculation : false
      })
    } else {
      var temp = CalculatorConstants.BLANK;
      for(var i = expressionLength-1; i >=0 ; i--) {
        if(!Validator.isOperator(expression[i])) {
          temp = temp.concat(expression[i]);
        } else {
          break;
        }
      }
      this.setState({
        text : (Validator.isExpressionContainDot(temp)) ? this.state.text : this.state.text + userInput
      })
    }
  }


  handleNumericData(userInput) {
    this.setState({
      text: (!this.state.isNewCalculation) ? this.state.text + userInput : userInput,
      isNewCalculation: false
    });
  }

  handleTrigo(userInput) {
    var expressionLength = Data.getLengthOfExpression(this.state.text);
    this.setState({
      text: (!this.state.isNewCalculation) ? this.state.text + userInput + CalculatorConstants.OPEN_PARENTHESIS : userInput + CalculatorConstants.OPEN_PARENTHESIS,
      isNewCalculation: false
    })
  }

  handleSqrt(userInput) {
    var lastChar = Data.getLastCharInText(this.state.text);
    if(lastChar !== CalculatorConstants.DOT) {
      this.setState({
        text: (!this.state.isNewCalculation) ? this.state.text + userInput + CalculatorConstants.OPEN_PARENTHESIS : userInput + CalculatorConstants.OPEN_PARENTHESIS,
        isNewCalculation: false
      })
    }
  }

  handleParenthesis(userInput) {
    if(userInput === CalculatorConstants.OPEN_PARENTHESIS) {
      this.setState({
        text: this.state.text + userInput,
        isNewCalculation: false
      })
    } else {
      var expression = this.state.text;
      var openParethesisOccurances = expression.split(CalculatorConstants.OPEN_PARENTHESIS).length - 1;
      var closedParethesisOccurances = expression.split(CalculatorConstants.CLOSED_PARENTHESIS).length - 1;
      if(openParethesisOccurances > closedParethesisOccurances) {
        var lastChar = Data.getLastCharInText(expression);
        var isAllowed = Validator.isOperator(lastChar) || Validator.isCharOperator(lastChar) || lastChar === CalculatorConstants.OPEN_PARENTHESIS || lastChar === CalculatorConstants.DOT;
        if(!isAllowed) {
          this.setState({
            text: (!this.state.isNewCalculation) ? this.state.text + userInput : userInput,
            isNewCalculation: false
          })
        }
      }
    }
  }

  handleFactorial(userInput) {
    var lastChar = Data.getLastCharInText(this.state.text);
    if(Validator.isOperand(lastChar) || lastChar === CalculatorConstants.CLOSED_PARENTHESIS) {
      this.setState({
        text: this.state.text + userInput,
        isNewCalculation: false
      })
    }
  }

  handlePI(userInput) {
    var lastChar = Data.getLastCharInText(this.state.text);
    if(lastChar !== CalculatorConstants.DOT) {
      this.setState({
        text: (!this.state.isNewCalculation) ? this.state.text + userInput : userInput,
        isNewCalculation: false
      })
    }
  }

  handleEuler(userInput) {
    var lastChar = Data.getLastCharInText(this.state.text);
    if(lastChar !== CalculatorConstants.DOT) {
      this.setState({
        text: (!this.state.isNewCalculation) ? this.state.text + userInput : userInput,
        isNewCalculation: false
      })
    }
  }

  handleClick(userInput) {
    if(userInput === CalculatorConstants.EQUAL) {
      this.handleEqualTo(this.state.text);
    } else if(Validator.isOperator(userInput)) {
      this.handleOperator(userInput);
    } else if(userInput === CalculatorConstants.DOT) {
      this.handleDot(userInput);
    } else if(userInput === CalculatorConstants.CLEAR) {
      this.handleClear(userInput);
    } else if(userInput === "\u232B") {
      this.handleDelete(userInput);
    } else if(Validator.isTrignometricOperator(userInput)) {
      this.handleTrigo(userInput);
    } else if(userInput === CalculatorConstants.SQRT) {
      this.handleSqrt(userInput);
    } else if(userInput === CalculatorConstants.OPEN_PARENTHESIS || userInput === CalculatorConstants.CLOSED_PARENTHESIS) {
      this.handleParenthesis(userInput);
    } else if(userInput === "x"+CalculatorConstants.FACTORIAL) {
      this.handleFactorial(CalculatorConstants.FACTORIAL);
    } else if(userInput === CalculatorConstants.PI) {
      this.handlePI(userInput);
    } else if(userInput === CalculatorConstants.LOG) {
      this.handleLog(userInput);
    } else if(userInput === CalculatorConstants.e) {
      this.handleEuler(userInput);
    } else {
      this.handleNumericData(userInput);
    }
  }

  componentDidMount() {
    window.addEventListener(CalculatorConstants.KEYDOWN, this.handleKeyDown.bind(this));
  }

  handleKeyDown(event) {
    var pressedKey = event.key;
    if(pressedKey === CalculatorConstants.MUL) {
      pressedKey = CalculatorConstants.MULTIPLICATION;
      this.handleOperator(pressedKey);
    } else if(pressedKey === CalculatorConstants.DIV) {
      pressedKey = CalculatorConstants.DIVISION;
      this.handleOperator(pressedKey);
    } else if(pressedKey === CalculatorConstants.ADD) {
      pressedKey = CalculatorConstants.ADDITION;
      this.handleOperator(pressedKey);
    } else if(pressedKey === CalculatorConstants.SUB) {
      pressedKey = CalculatorConstants.SUBTRACTION;
      this.handleOperator(pressedKey);
    } else if(pressedKey === CalculatorConstants.ENTER || pressedKey === CalculatorConstants.EQUAL) {
      this.handleEqualTo(this.state.text);
    } else if(pressedKey === CalculatorConstants.BACKSPACE) {
      this.handleDelete();
    } else if(Validator.isOperator(pressedKey)) {
      this.handleOperator(pressedKey);
    } else if(pressedKey.match(/^[0-9]+$/)){
      this.handleNumericData(pressedKey);
    } else if(pressedKey === CalculatorConstants.DOT) {
      this.handleDot(pressedKey);
    } else if(pressedKey === CalculatorConstants.s || pressedKey === CalculatorConstants.S) {
      this.handleTrigo(CalculatorConstants.SINE);
    } else if(pressedKey === CalculatorConstants.c || pressedKey === CalculatorConstants.C) {
      this.handleTrigo(CalculatorConstants.COSINE);
    } else if(pressedKey === CalculatorConstants.t || pressedKey === CalculatorConstants.T) {
      this.handleTrigo(CalculatorConstants.TANGENT);
    } else if(pressedKey === CalculatorConstants.OPEN_PARENTHESIS || pressedKey === CalculatorConstants.CLOSED_PARENTHESIS) {
      this.handleParenthesis(pressedKey);
    } else if(pressedKey === CalculatorConstants.FACTORIAL) {
      this.handleFactorial(pressedKey);
    } else if(pressedKey === CalculatorConstants.p || pressedKey === CalculatorConstants.P) {
      this.handlePI(CalculatorConstants.PI);
    } else if(pressedKey === CalculatorConstants.l || pressedKey === CalculatorConstants.L) {
      this.handleLog(CalculatorConstants.LOG);
    } else if(pressedKey === CalculatorConstants.e || pressedKey === CalculatorConstants.E) {
      this.handleEuler(CalculatorConstants.e);
    }
  }

  render() {
    var closedParenthesis = Data.getClosedParenthesis(this.state.text);
    var myTable = Data.getUIComponents();
    var myRows = myTable.map(function(rows) {
      var dataInRow = rows.map(function(rowElement) {
        var classNameForButton = Data.getClassForComponent(rowElement);
        return (<td><input type="button" className={classNameForButton} value={rowElement} onClick={this.handleClick.bind(this, rowElement)} /></td>);
      }, this);
      return (<tr>{dataInRow}</tr>);
    }, this);
    return (
      <div className="outerDiv">
      <div className="mainScreenDiv">
      <label className="textLabelForExpression">{this.state.text}<span className="closedParenthesisStyle">{closedParenthesis}</span></label><br/>
      <table>
      {myRows}
      </table>
      </div>
      </div>
    )
  }
}

ReactDOM.render(<Calculator />, document.getElementById("container"));
