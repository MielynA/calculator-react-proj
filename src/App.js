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

    let newVal = this.state.displayValue.toString();
    console.log(newVal.includes('.'))
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
        operation: 'percentage',
        displayValue: value,
      })
    }
    if (e.currentTarget.value === '±' && this.state.displayValue !== '0') {
      let value = parseFloat(this.state.previousValue);
      value = (parseFloat(this.state.displayValue) * -1);
      this.setState({
        operation: 'negative',
        displayValue: value,
      })
    }
    

    if (e.currentTarget.value === '=' && this.state.displayValue !== '0') {
      this.getAns();
    }
  }
  chkDot = () =>{
      if (this.state.displayValue.indexOf('.') === -1) {
        this.setState({
          displayValue: this.state.displayValue+'.',
        })
      }
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
    let newVal = this.state.displayValue.toString();
    console.log(newVal.includes('.'))
    if ((this.state.displayValue === '0' || this.state.operation !== null )) {
      this.setState({
        displayValue: e.currentTarget.value,
      })
      if (this.state.operation === 'equal'){
        this.setState({operation: null})
      }
      else if(this.state.operation !== null){
        console.log("HERE");
        let value = parseFloat(this.state.displayValue);
        this.setState({previousValue: value})
      }
    }
    else {
      console.log("ELSE");
      let newValue = this.state.displayValue;
      newValue += e.currentTarget.value;
      this.setState({ displayValue: newValue })
    }
  }
  //Waiting to display C or AC depending on Operator Buttons pressed.
  isWaiting = () => {
    let temp = this.state.waitingForNewValue;
    if (temp) {
      return (<TheButtons name="C" cb={this.operator} />)
    }
    else {
      return (<TheButtons name="AC" cb={this.operator} />)
    }
  }
  //RENDER 
  render() {
    return (
      <div className="container" style={{ width: '50%' }}>
        <Screen displayValue={this.state.displayValue} onChange={this.getNum} />

        <div className="row">
          {this.isWaiting()}
          <TheButtons name="%" cb={this.operator} />
          <TheButtons name="±" cb={this.operator} />
          <TheButtons name="÷" orange="true" cb={this.operator} />
        </div>

        <div className="row">
          <TheButtons name="7" cb={this.getNum} />
          <TheButtons name="8" cb={this.getNum} />
          <TheButtons name="9" cb={this.getNum} />
          <TheButtons name="x" orange="true" cb={this.operator} />
        </div>


        <div className="row">
          <TheButtons name="4" cb={this.getNum} />
          <TheButtons name="5" cb={this.getNum} />
          <TheButtons name="6" cb={this.getNum} />
          <TheButtons name="-" orange="true" cb={this.operator} />
        </div>

        <div className="row">
          <TheButtons name="1" cb={this.getNum} />
          <TheButtons name="2" cb={this.getNum} />
          <TheButtons name="3" cb={this.getNum} />
          <TheButtons name="+" orange="true" cb={this.operator} />
        </div>

        <div className="row">
          <TheButtons name="0" big="true" cb={this.getNum} />
          <TheButtons name="." cb={this.chkDot} />
          <TheButtons name="=" orange="true" cb={this.operator} />
        </div>

      </div>
    );

  }
}

export default App;