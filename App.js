import { StatusBarn } from "expo-status-bar";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Task } from "./app/components/Task";

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };
  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's task</Text>

        <View style={styles.items}>
          {/* This is where the tasks will go! */}
          {taskItems.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
              <Task key={index} text={item} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Write a task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          onChangeText={(text) => setTask(text)}
          placeholder={"Write a task"}
          style={styles.input}
          value={task}
        />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: { fontSize: 24, fontWeight: "bold" },
  items: {
    marginTop: 30,
  },

  writeTaskWrapper: {
    alignItems: "center",
    bottom: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    width: "100%",
  },
  input: {
    backgroundColor: "#FFF",
    borderColor: "#C0C0C0",
    borderRadius: 60,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingStart: 20,
    paddingVertical: 15,
    width: 250,
  },
  addWrapper: {
    alignItems: "center",
    backgroundColor: "#FFF",
    borderColor: "#C0C0C0",
    borderRadius: 60,
    borderWidth: 1,
    height: 60,
    justifyContent: "center",
    width: 60,
  },
  addText: {},
});
