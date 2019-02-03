import React, { Component } from 'react';
import Screen from './components/Screen';
import TheButtons from './components/Buttons';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { 
       displayValue: '0',
       previousValue: null, 
       operation: null,
       waitingForNewValue: false
    }
  }
  operator = (e) =>{
    if(e.currentTarget.value === 'C'){
      this.setState({
        displayValue: '0'
      })
    }
    if(e.currentTarget.value === '+' && this.state.displayValue !== '0'){
      let value = parseInt(this.state.previousValue);
      if(this.state.previousValue === null){
        value = parseInt(this.state.displayValue);
      }
      else{
        value += parseInt(this.state.displayValue);
      }
      this.setState({
        previousValue:value,
        operation: 'addition',
        waitingForNewValue: true,
        displayValue: '0'
      })
    }
    if(e.currentTarget.value === '-' && this.state.displayValue !== '0'){
      let value = parseInt(this.state.previousValue);
      if(this.state.previousValue === null){
        value = parseInt(this.state.displayValue);
      }
      else{
        value -= parseInt(this.state.displayValue);
      }
      this.setState({
        previousValue: value,
        operation: 'subtraction',
        waitingForNewValue: true,
        displayValue: '0'
      })
    }
    if(e.currentTarget.value=== '÷' && this.state.displayValue !== '0'){
      this.setState({
        previousValue:parseInt(this.state.displayValue),
        operation: 'division',
        waitingForNewValue: true,
        displayValue: '0'
      })
    }
    if(e.currentTarget.value=== 'x' && this.state.displayValue !== '0'){
      this.setState({
        previousValue:parseInt(this.state.displayValue),
        operation: 'multiplication',
        waitingForNewValue: true,
        displayValue: '0'
      })
    }
    if(e.currentTarget.value === '%' && this.state.displayValue !== '0'){
      console.log('here')
      let value = parseFloat(this.state.previousValue);
        value = (parseFloat(this.state.displayValue) * 0.01);
        console.log(value)
      
      this.setState({
        previousValue: value,
        operation: 'percentage',
        waitingForNewValue: true,
        displayValue: value,
      })
    } 
   


    if(e.currentTarget.value=== '=' && this.state.displayValue !== '0'){

      let value = parseInt(this.state.previousValue);
      if(this.state.operation === 'addition'){
        value += parseInt(this.state.displayValue);
      }
      else{
        value = parseInt(this.state.displayValue);
      }
      this.setState({
        displayValue: value,
        previousValue: null,
        operation: 'equal',
        waitingForNewValue: false,
      })
    }
    
  }
   
  getNum = (e) =>{
    if(this.state.displayValue === '0')
      this.setState({displayValue: e.currentTarget.value})
    else{
      let newValue = this.state.displayValue;
      newValue += e.currentTarget.value;
      this.setState({displayValue:newValue})
    }
  }
  isWaiting = () =>{
    let temp = this.state.waitingForNewValue;
    console.log(temp);
    if(temp){
      return(<TheButtons name="C" cb={this.operator}/>)
    }
    else{
      return(<TheButtons name="AC" />)
    }
  }
  

  render() {
    return (
      <div className="container" style={{width: '50%'}}>
      <Screen displayValue={this.state.displayValue} onChange = {this.getNum}/>
      
      <div className="row">
      {this.isWaiting ()}
      <TheButtons name="%"  cb={this.operator}/>
      <TheButtons name="±" />
      <TheButtons name="÷" orange = "true" cb={this.operator}/>
      </div>

      <div className="row">
      <TheButtons name="7" cb={this.getNum}/>
      <TheButtons name="8" cb={this.getNum}/>
      <TheButtons name="9" cb={this.getNum}/>
      <TheButtons name="x" orange = "true" cb={this.operator}/>
      </div>
     

      <div className="row">
      <TheButtons name="4" cb={this.getNum} />
      <TheButtons name="5" cb={this.getNum}/>
      <TheButtons name="6" cb={this.getNum}/>
      <TheButtons name="-" orange = "true" cb={this.operator}/>
      </div>
      
      <div className="row">
      <TheButtons name="1" cb={this.getNum}/>
      <TheButtons name="2" cb={this.getNum}/>
      <TheButtons name="3" cb={this.getNum}/>
      <TheButtons name="+" orange = "true" cb={this.operator}/>
      </div>

      <div className="row">
      <TheButtons name="0" big="true" cb={this.getNum}/>
      <TheButtons name="." />
      <TheButtons name="=" orange = "true" cb={this.operator}/>
      </div>

      </div>
    );

  }
}

export default App;
