import React, { Component } from 'react';
import Screen from './components/Screen';
import TheButtons from './components/Buttons';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: '0',
      previousValue: null,
      operation: null,
      waitingForNewValue: false
    }
  }
  //Get Operator Event Listener for Operator Buttons
  operator = (e) => {
    if (e.currentTarget.value === 'C') {
      this.setState({
        displayValue: '0'
      })
    }
    if (e.currentTarget.value === 'AC') {
      this.setState({
        displayValue: '0',
        previousValue: null,
        operation: null,
        waitingForNewValue: false
      })
    }
    if (e.currentTarget.value === '+' && this.state.displayValue !== '0') {
      this.getAns()
      let value = this.state.displayValue
      this.setState({
        previousValue: value,
        operation: 'addition',
        waitingForNewValue: true,
      })
    }
    if (e.currentTarget.value === '-' && this.state.displayValue !== '0') {
      this.getAns()
      let value = this.state.displayValue
      this.setState({
        previousValue: value,
        operation: 'subtraction',
        waitingForNewValue: true,
      })
    }
    if (e.currentTarget.value === '÷' && this.state.displayValue !== '0') {
      this.getAns()
      let value = this.state.displayValue
      this.setState({
        previousValue: value,
        operation: 'division',
        waitingForNewValue: true,
      })
    }
    if (e.currentTarget.value === 'x' && this.state.displayValue !== '0') {
      this.getAns()
      let value = this.state.displayValue
      this.setState({
        previousValue: value,
        operation: 'multiplication',
        waitingForNewValue: true,
      })
    }
    if (e.currentTarget.value === '%' && this.state.displayValue !== '0') {
      let value = parseFloat(this.state.previousValue);
      value = (parseFloat(this.state.displayValue) * 0.01);
      this.setState({
        displayValue: value,
      })
    }
    if (e.currentTarget.value === '±' && this.state.displayValue !== '0') {
      let value = parseFloat(this.state.previousValue);
      value = (parseFloat(this.state.displayValue) * -1);
      this.setState({
        displayValue: value,
      })
    }
    if (e.currentTarget.value === '=' && this.state.displayValue !== '0') {
      this.getAns();
    }
    if (e.currentTarget.value === '.') {
      if (this.state.displayValue.indexOf('.') === -1) {
        this.setState({
          displayValue: this.state.displayValue + '.',
        })
      }
    }
    // chkDot = () => {

    //   }
  }
  getAns = () => {
    let value = parseFloat(this.state.previousValue);
    if (this.state.operation === 'addition') {
      value += parseFloat(this.state.displayValue);
    }
    else if (this.state.operation === 'subtraction') {
      value -= parseFloat(this.state.displayValue);
    }
    else if (this.state.operation === 'division') {
      value /= parseFloat(this.state.displayValue);
    }
    else if (this.state.operation === 'multiplication') {
      value *= parseFloat(this.state.displayValue);
    }
    else {
      value = this.state.displayValue;
    }
    this.setState({
      displayValue: value,
      previousValue: value,
      operation: 'equal',
      waitingForNewValue: false
    })
  }
  //Get Number Event Listener for Number Buttons
  getNum = (e) => {
    if (this.state.displayValue === '0' || this.state.displayValue === this.state.previousValue || this.state.operation === 'equal') {
      this.setState({
        displayValue: e.currentTarget.value,
      })
      if (this.state.operation === 'equal')
        this.setState({ operation: null })
    }
    else {
      let newValue = this.state.displayValue;
      newValue += e.currentTarget.value;
      this.setState({ displayValue: newValue })
    }
  }
  ButtonList = () => {
    let Collection = ['AC', '%', '±', '÷', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '=']
    return Collection.map((e, i) => {
      if (i === 0) {
        let temp = this.state.waitingForNewValue;
        if (temp) {
          return (<TheButtons name="C" cb={this.operator} key={i} />)
        }
        else {
          return (<TheButtons name="AC" cb={this.operator} key={i} />)
        }
      }
      if (i === 3 || i === 7 || i === 11 || i === 15 || i === 18)
        return <TheButtons name={e} orange="true" cb={this.operator} key={i} />
      else if (i < 3) {
        return <TheButtons name={e} cb={this.operator} key={i} />
      }
      else if (i === 17) {
        return <TheButtons name={e} cb={this.operator} key={i} />
      }
      else if (i === 16) {
        return <TheButtons name={e} big="true" cb={this.getNum} key={i} />
      }
      else {
        return <TheButtons name={e} cb={this.getNum} key={i} />
      }
    })
  }
  //RENDER 
  render() {
    return (
      <div className="container" style={{ width: '50%' }}>
        <Screen displayValue={this.state.displayValue} onChange={this.getNum} />
        <div className="row">
          {this.ButtonList()}
        </div>
      </div>
    );
  }
}

export default App;