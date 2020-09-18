import React from 'react';
import axios from 'axios';
import Config from '../config';
import { v4 as uuidv4 } from 'uuid';

class CalculatorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calculatorExpression: '',
      calculationResult: 0,
      token: '',
      history: [],
    };
  }

  componentDidMount = () => {
    let token = uuidv4();
    this.setState({ token: token });
  };

  getLastItem({ exp }) {
    let expArr = exp.split(/[*+-/%]/);
    let lastItem = expArr.pop();

    return lastItem;
  }

  saveExpression = async ({ exp, result }) => {
    try {
      let body = {
        token: this.state.token,
        expression: `${exp}=${result}`,
      };

      await axios.post(
        Config.hostName + '/api/calculator/save-expression',
        body
      );
    } catch (error) {
      console.log(error);
    }
  };

  getExpressions = async () => {
    try {
      let body = {
        token: this.state.token,
      };

      let result = await axios.post(
        Config.hostName + '/api/calculator/get-history',
        body
      );

      let history = result.data.result || [];

      this.setState({ history: history });
    } catch (error) {
      console.log('--------');
      console.log(error);
      console.log('--------');

      return '';
    }
  };

  deleteAllExpressions = async () => {
    try {
      let body = {
        token: this.state.token,
      };

      await axios.post(Config.hostName + '/api/calculator/clear-history', body);

      // update the history in the state
      await this.getExpressions();
    } catch (error) {
      console.log(error);
    }
  };

  handleCalculatorButtonClick = (value) => {
    if (value === 'clear_hist') {
      // delete all history
      this.deleteAllExpressions();
    } else if (value === 'clear') {
      // clear both input and the result
      this.handleClearInput();
      this.handleClearResult();
    } else if (value === 'cube_root') {
      let exp = this.state.calculatorExpression;

      let lastItem = this.getLastItem({ exp });

      let cubeRootNum = Math.cbrt(Number(lastItem));

      let lastIndex = exp.lastIndexOf(lastItem.toString());

      let newExp = exp.slice(0, lastIndex);

      this.setState({
        calculatorExpression: newExp + cubeRootNum.toString(),
      });
    } else if (value === 'square_root') {
      let exp = this.state.calculatorExpression;

      let lastItem = this.getLastItem({ exp });

      let squareRootNum = Math.sqrt(Number(lastItem));

      let lastIndex = exp.lastIndexOf(lastItem.toString());

      let newExp = exp.slice(0, lastIndex);

      this.setState({
        calculatorExpression: newExp + squareRootNum.toString(),
      });
    } else if (value === 'percent') {
      let exp = this.state.calculatorExpression;

      let lastItem = this.getLastItem({ exp });

      let percentNum = Number(lastItem) / 100;

      let lastIndex = exp.lastIndexOf(lastItem.toString());

      let newExp = exp.slice(0, lastIndex);

      this.setState({
        calculatorExpression: newExp + percentNum.toString(),
      });
    } else if (value === 'square') {
      let exp = this.state.calculatorExpression;

      let lastItem = this.getLastItem({ exp });

      let squareNum = Math.pow(Number(lastItem), 2);

      let lastIndex = exp.lastIndexOf(lastItem.toString());

      let newExp = exp.slice(0, lastIndex);

      this.setState({
        calculatorExpression: newExp + squareNum.toString(),
      });
    } else if (value === 'cube') {
      let exp = this.state.calculatorExpression;

      let lastItem = this.getLastItem({ exp });

      let cubeNum = Math.pow(Number(lastItem), 3);

      let lastIndex = exp.lastIndexOf(lastItem.toString());

      let newExp = exp.slice(0, lastIndex);

      this.setState({
        calculatorExpression: newExp + cubeNum.toString(),
      });
    } else if (value === 'percent') {
    } else if (value === 'CL') {
      this.handleClearInput();
    } else if (value === '⌫') {
      this.handleBackButton();
    } else if (value === '=') {
      this.calculateExpression();
      this.handleClearInput();
    } else {
      this.setState({
        calculatorExpression: this.state.calculatorExpression + value,
      });
    }
  };

  handleBackButton = () => {
    this.setState({
      calculatorExpression: this.state.calculatorExpression.slice(0, -1),
    });
  };

  handleClearInput = () => {
    this.setState({ calculatorExpression: '' });
  };

  handleClearResult = () => {
    this.setState({ calculationResult: 0 });
  };

  calculateExpression = async () => {
    try {
      // calculate the result of the expression
      let result = eval(this.state.calculatorExpression) || '';

      // save the result in the state
      this.setState({ calculationResult: result });

      // now save the data to the database
      await this.saveExpression({
        exp: this.state.calculatorExpression,
        result: result,
      });

      // now get the history from database
      await this.getExpressions();
    } catch (error) {
      this.setState({ calculationResult: 'Error' });
    }
  };

  copyToClipBoard = (exp) => {
    const element = document.createElement('textarea');
    element.value = exp;
    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);
  };

  handleExpCopy = (index) => {
    try {
      var expressionText = document.getElementById(`his-${index}`).innerText;

      this.copyToClipBoard(expressionText);
    } catch (error) {}
  };

  renderHistory() {
    let expHistory = this.state.history;

    return expHistory.map((item, index) => (
      <div key={index}>
        <h6 id={`his-${index}`} className="history-exp">
          {item.expression}
        </h6>
        <button
          id={`copy-${index}`}
          className="history-copy"
          onClick={() => this.handleExpCopy(index)}
        >
          copy
        </button>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <section className="container"></section>
        <div className="calculator">
          <div className="container">
            <div className="calc-body">
              <div className="calc-screen">
                <div className="calc-operation">
                  {this.state.calculatorExpression}
                </div>
                <div className="calc-typed">{this.state.calculationResult}</div>
              </div>
              <div className="calc-button-row">
                <div
                  className="button c"
                  onClick={() => this.handleCalculatorButtonClick('CL')}
                >
                  C
                </div>
                <div
                  className="button l"
                  onClick={() => this.handleCalculatorButtonClick('⌫')}
                >
                  ⌫
                </div>
                <div
                  className="button l"
                  onClick={() => this.handleCalculatorButtonClick('%')}
                >
                  mod
                </div>
                <div
                  className="button l"
                  onClick={() => this.handleCalculatorButtonClick('/')}
                >
                  /
                </div>
                <div
                  className="button l"
                  onClick={() => this.handleCalculatorButtonClick('percent')}
                >
                  %
                </div>
              </div>
              <div className="calc-button-row">
                <div
                  className="button"
                  onClick={() => this.handleCalculatorButtonClick('7')}
                >
                  7
                </div>
                <div
                  className="button"
                  onClick={() => this.handleCalculatorButtonClick('8')}
                >
                  8
                </div>
                <div
                  className="button"
                  onClick={() => this.handleCalculatorButtonClick('9')}
                >
                  9
                </div>
                <div
                  className="button l"
                  onClick={() => this.handleCalculatorButtonClick('*')}
                >
                  x
                </div>

                <div
                  className="button l"
                  onClick={() => this.handleCalculatorButtonClick('square')}
                >
                  x<sup>2</sup>
                </div>
              </div>
              <div className="calc-button-row">
                <div
                  className="button"
                  onClick={() => this.handleCalculatorButtonClick('4')}
                >
                  4
                </div>
                <div
                  className="button"
                  onClick={() => this.handleCalculatorButtonClick('5')}
                >
                  5
                </div>
                <div
                  className="button"
                  onClick={() => this.handleCalculatorButtonClick('6')}
                >
                  6
                </div>
                <div
                  className="button l"
                  onClick={() => this.handleCalculatorButtonClick('-')}
                >
                  −
                </div>
                <div
                  className="button l"
                  onClick={() => this.handleCalculatorButtonClick('cube')}
                >
                  x<sup>3</sup>
                </div>
              </div>
              <div className="calc-button-row">
                <div
                  className="button"
                  onClick={() => this.handleCalculatorButtonClick('1')}
                >
                  1
                </div>
                <div
                  className="button"
                  onClick={() => this.handleCalculatorButtonClick('2')}
                >
                  2
                </div>
                <div
                  className="button"
                  onClick={() => this.handleCalculatorButtonClick('3')}
                >
                  3
                </div>
                <div
                  className="button l"
                  onClick={() => this.handleCalculatorButtonClick('+')}
                >
                  +
                </div>
                <div
                  className="button l"
                  onClick={() =>
                    this.handleCalculatorButtonClick('square_root')
                  }
                >
                  &#8730;
                </div>
              </div>
              <div className="calc-button-row">
                <div
                  className="button"
                  onClick={() => this.handleCalculatorButtonClick('0')}
                >
                  0
                </div>
                <div
                  className="button l"
                  onClick={() => this.handleCalculatorButtonClick('=')}
                >
                  =
                </div>
                <div
                  className="button l"
                  onClick={() => this.handleCalculatorButtonClick('cube_root')}
                >
                  &#8731;
                </div>
                <div
                  className="button l"
                  onClick={() => this.handleCalculatorButtonClick('clear')}
                >
                  clear
                </div>
                <div
                  className="button l"
                  onClick={() => this.handleCalculatorButtonClick('clear_hist')}
                >
                  cl hist
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3>History</h3>
          <div>{this.renderHistory()}</div>
        </div>
      </div>
    );
  }
}

export default CalculatorPage;
