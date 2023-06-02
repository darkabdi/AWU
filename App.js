import React,{useState} from 'react';
import { StyleSheet, SafeAreaView, View,Text, TextInput,TouchableOpacity,FlatList, Alert,TouchableWithoutFeedback,Keyboard} from 'react-native';
import { MaterialIcons,Ionicons } from '@expo/vector-icons'; 
const COLORS = {primary:'coral', white:'#fff'}


const App = () => {
  const[textInput,setTextInput]=useState('');
  const[todos, setTOdos]= useState([
    {id:1, task:'First',completed:false},
    {id:2, task:'Second',completed:false},
  ]);
  const[progresstodos, setProgresstodos]= useState([]);
  const[completetodos, setCompletetodos]= useState([]);

  
  const ListItem =({todo}) =>{
   return (
   <View style={styles.listItem}>
     <View style={{flex:1}}>
       <Text 
          style={{
            fontWeight:'bold',
            fontSize:15,
            color:COLORS.primary,
            }}>
            {todo.task}
         </Text>
       </View>      
       <TouchableOpacity style={[styles.actionIcon]} onPress={()=>markTodoProgress(todo.id)}>
       <MaterialIcons name="done" size={24} color={COLORS.white} />
       </TouchableOpacity>
       <TouchableOpacity
        style={[styles.actionIcon,{backgroundColor:'blue'}]}        
        onPress={() => deleteTodo(todo.id)}>
       <MaterialIcons name="delete" size={24} color={COLORS.white} />
       </TouchableOpacity>
    </View>
   );
};


const ListItem1 =({todo}) =>{ 
 
  return (
  <View style={styles.listItem}>
    <View style={{flex:1}}>
      <Text 
         style={{
           fontWeight:'bold',
           fontSize:15,
           color:COLORS.primary
           }}>
           {todo.task}     
        </Text>
      </View>
      <TouchableOpacity
       style={[styles.actionIcon,{backgroundColor:'blue'}]}       
       onPress={() => moveToComplete(todo.id)}>
      <MaterialIcons name="delete" size={24} color={COLORS.white} />
      </TouchableOpacity>
   </View>
  );
};

const ListItem2 =({todo}) =>{ 
 
  return (
  <View style={styles.listItem}>
    <View style={{flex:1}}>
    <Text 
         style={{
           fontWeight:'bold',
           fontSize:15,
           color:COLORS.primary,          
           }}>
           {todo.task}     
        </Text>
      </View>     
   </View>
  );
};



const addTodo =() =>{
  if(textInput ==''){
    Alert.alert('Error','Please write a task');
  } else {
const newTodo={
 
  id:Math.random(),
  task:textInput,
  completed:false,
};

setTOdos([...todos,newTodo]);
setTextInput('');
  }
};


const markTodoProgress=(todoId) =>{
const doneTodo = todos.filter(item => item.id == todoId);
const newTodo={
  id:doneTodo[0].id,
  task:doneTodo[0].task,
  completed:true,
};

setProgresstodos([...progresstodos, newTodo]);
const notcompletedTodos =todos.filter(item => item.id != todoId);
setTOdos(notcompletedTodos);
};

const deleteTodo = todoId =>{
  const newTodos = todos.filter(item => item.id != todoId);
  setTOdos(newTodos);
};
const moveToComplete = todoId =>{
  const doneTodo = progresstodos.filter(item => item.id == todoId);
 
const newTodo={
  id:doneTodo[0].id,
  task:doneTodo[0].task,
  completed:true,
};


setCompletetodos([...completetodos, newTodo]);
const progresstodo =progresstodos.filter(item => item.id != todoId);
setProgresstodos(progresstodo);
};


  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
    <SafeAreaView style={{flex:1, backgroundColor:COLORS.white}}>
      <View style={styles.header}>
      <Text style={styles.tittle}>My Todo list </Text>
      </View>
      <FlatList 
      contentContainerStyle={{padding:20, paddingBottom:100}}
      data={todos}
       renderItem={({item}) => <ListItem todo={item}/>}
       />
      <Text style={{fontWeight: 'bold',fontSize:20,color:COLORS.primary,textAlign:'center'}}>
        In Progress
      </Text>
      <FlatList 
     contentContainerStyle={{padding:20, paddingBottom:100}}
     data={progresstodos}
      renderItem={({item}) => <ListItem1 todo={item}/>}
      />
     <Text style={{fontWeight: 'bold',fontSize:20,color:COLORS.primary,textAlign:'center'}}>
        Completed List
      </Text>
     <FlatList 
      contentContainerStyle={{padding:20, paddingBottom:100}}
      data={completetodos}
       renderItem={({item}) => <ListItem2 todo={item}/>}
       />
      <View style={styles.footer}>
      <View style={styles.inputContainer}>
      <TextInput placeholder="Add TODO"
      value={textInput}
      onChangeText={(text) =>setTextInput(text)}/>
      </View>
      <TouchableOpacity onPress={addTodo}>
        <View style={styles.iconContainer}>
        <Ionicons name="add" color={COLORS.white} size={30}/>
        </View>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
  listItem:{
    padding:20,
    backgroundColor:COLORS.white,
    flexDirection:'row',
    elevation:12,
    borderRadius:7,
    marginVertical:10,
  },
  actionIcon:{
    height:25,
    width:25,
    backgroundColor:'green',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:5,
    borderRadius:3,
  },
  header:{
    height:80,
    paddingTop:38,
    backgroundColor:'coral'
},
tittle:{
    textAlign:'center',
    color:'#fff',
    fontSize:20,
    fontWeight:'bold',
},
  footer:{
    position:'absolute',
    bottom:0,
    backgroundColor:COLORS.white,
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
  },
  inputContainer:{
    backgroundColor: COLORS.white,
    elevation:40,
    flex:1,
    height:50,
    marginVertical:20,
    marginRight:20,
    borderRadius:30,
    paddingHorizontal:20,
  },
  iconContainer:{
    height:50,
    width:50,
    backgroundColor: COLORS.primary,
    elevation:40,
    alignItems:'center',
    borderRadius:25,
    justifyContent:'center',
  },
});

export default App;