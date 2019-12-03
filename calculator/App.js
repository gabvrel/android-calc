import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

const ButtonComponent = (props) => {
  return (
    <TouchableOpacity style={styles.buttonsNumbers}
    onPress={()=>props.changenumber(props.text)}>
    <Text style={styles.font}>{props.text} </Text>
    </TouchableOpacity>
  );
};
export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      number: '',
      handle: false,
    }
    this.changenumber = this.changenumber.bind(this);
    this.operator = this.operator.bind(this)
  }
  createNumberPanel(){
    let table = []
    for (let i=1; i<10; i++){
      table.push(<ButtonComponent
        text={i}
        key={i}
        changenumber={this.changenumber}>
        </ButtonComponent>)
    }
    return table
  }
  createTouchable(i,output){
    let test1 =['CE', 'DEL', '%' , '+']
    let test2 =['-', '*', '/', '=']
    let test3 =['.',0,'π']
    if (i == 1){
      let result1 = test1.map((x, index) =>{   
        return x=='+'? (<TouchableOpacity
        key= {index} 
        onPress={() => {this.operator('+')}}
        style={styles.buttonsNumbers2}>
        <Text style={styles.font}>{x}</Text>
        </TouchableOpacity>):(<TouchableOpacity
        key= {index} 
        onPress={() => {this.operator(x)}}
        style={styles.buttonsNumbers3}>
        <Text style={styles.font}>{x}</Text>
        </TouchableOpacity>)}
      )
      return result1
    }
    else if(i === 2){
      let result2 = test2.map((x,index) =>{
        return x == '=' ? (<TouchableOpacity
          key= {index} 
          onPress={() => {this.operator(x,output)}}
          style={styles.buttonsNumbers2}>
          <Text style={styles.font}>{x}</Text>
          </TouchableOpacity>):(<TouchableOpacity
          key= {index} 
          onPress={() => {this.operator(x)}}
          style={styles.buttonsNumbers2}>
          <Text style={styles.font}>{x}</Text>
          </TouchableOpacity>)}
        )
      return  result2
    }
    else if (i == 3){
      let result3 = test3.map((x, index) => {
        return x == 'π' ? (<TouchableOpacity
          key= {index} 
          onPress={() => {this.operator(Math.PI)}}
          style={styles.buttonsNumbers3}>
          <Text style={styles.font}>{x}</Text>
          </TouchableOpacity>): x== 0 ? (<TouchableOpacity
            key= {index} 
            onPress={() => {this.operator(x)}}
            style={styles.buttonsNumbers}>
            <Text style={styles.font}>{x}</Text>
            </TouchableOpacity>) :(<TouchableOpacity
          key= {index} 
          onPress={() => {this.operator(x)}}
          style={styles.buttonsNumbers3}>
          <Text style={styles.font}>{x}</Text>
          </TouchableOpacity>)}
          )
      return result3
    }
  }
  changenumber(number){
    this.setState({
      number: this.state.number.toString() + number.toString()
    })
  }
  operator(sign, out){
    switch(sign){
      case('CE'):
      this.setState({
        number: '',
        handle: false,
      })
      break;
      case('DEL'):
      if (this.state.number.length === 1){
        this.setState({
          handle: false
        })
      }
      this.setState({
        number: this.state.number.slice(0, -1)
      })
      break;
      case('='):
      this.setState({
        number: out,
        handle: false
      })
      break;
      case('%'):
      this.setState({
        number: this.state.number + "*" + "(1/100)" + "*",
        handle:true
      })
      break;
      default:
      this.setState({
        number: this.state.number + sign,
        handle: true
      })
    }
  }
  render() {
    let output;
    try{
      output = eval(this.state.number)
    } catch(e) {
      if ( e instanceof SyntaxError) {
        try{
          output = eval(this.state.number.slice(0, -1))
        } catch(e){
          alert('Syntax Error')
          this.setState({
            number: ''
          })
        }
      }
    }
    return (
      <View style={styles.container}>
        <View style={styles.output}>
          <Text style={styles.result}>{this.state.number}</Text>
          {this.state. handle ? <Text style={styles.result}>{output}</Text> : <Text style={styles.result}>...</Text>}
        </View>
        <View style={styles.input}>
          <View style={styles.firstrow}>
          {this.createTouchable(1)}
          </View>
          <View style={styles.buttons}>
            <View style={styles.numbersPanel}>
            {this.createNumberPanel(this.props)}
              {this.createTouchable(3)}
            </View>
            <View style={styles.operatorsPanel}>
            {this.createTouchable(2,output)}
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 22,
    flexDirection:'column',
    backgroundColor:'black'
  },
  output: {
    padding: 12,
    height: 180
  },
  input:{
    height: 500
  },
  result: {
    textAlign: 'right',
    fontSize: 32,
    color:'white'
  },
  buttons:{
    flexDirection:'row',
  },
  numbersPanel: {
    flex: 3,
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent: 'space-evenly'
  },
  operatorsPanel: {
    flex:1,
    flexDirection: 'column',
  },
  buttonsNumbers: {
    width: 75,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333333',
    borderRadius: 80,
    marginTop: 10,
  },
  buttonsNumbers2: {
    width: 75,
    height: 75,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#FD6A02',
    borderRadius: 80,
    marginTop: 10,
  },
  buttonsNumbers3: {
    width: 75,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#999999',
    borderRadius: 80,
    marginTop: 10,
  },
  firstrow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  font: {
    color: 'white',
    fontSize: 22,
  }
});
