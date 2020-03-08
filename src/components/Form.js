import React ,{Component} from 'react';

import { StyleSheet, Text, View , StatusBar, TextInput,TouchableOpacity} from 'react-native';

export default class Form extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            password:'',
            selectCategory:'',
        }
    }
  Login=()=>{


  }

  render(){
    return (
      <View style={styles.container}>
        <TextInput style={styles.inputBox}
        underlineColorAndroid='rgba(0,0,0,0)'
        placeholder='Name'
        placeholderTextColor='rgba(0,0,0,0.5)'
        selectionColor='#4f9a94'
        value={this.state.name}
        />
        <TextInput style={styles.inputBox}
        underlineColorAndroid='rgba(0,0,0,0)'
        placeholder='Password'
        placeholderTextColor='rgba(0,0,0,0.5)'
        selectionColor='#4f9a94'
        secureTextEntry={true}
        value={this.state.password}
        />
        <Text style={styles.textStyle}>Please select your category </Text>
        <Picker
           selectedValue={this.state.selectCategory}
           style={{height: 50, width: 200}}
           onValueChange={(itemValue, itemIndex) =>
             this.setState({selectCategory: itemValue})}
             itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
           >
           <Picker.Item label="Micro Entrepreneur" value="micro" />
           <Picker.Item label="Anveshan Team" value="team" />

         </Picker>

        <TouchableOpacity style={styles.button}
           onPress={this.props.type} >
          <Text style={styles.buttonText}>{this.props.type}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow:1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox:{
    width:200,
    height:35,
    marginVertical:10,
    //backgroundColor:'rgba(0,0,0,0.3)',
    borderRadius:25,
    paddingHorizontal:16,
    fontSize:17,
    borderWidth:2,
    borderColor:'#212121',
  },
  button:{
    width:200,

    marginVertical:10,
    borderRadius:25,
    backgroundColor:'#212121',
    paddingVertical:10,
    alignItems:'center',

  },
  buttonText:{
    color:'#ffffff',
    fontSize:17,


  }
});
