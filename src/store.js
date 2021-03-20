import { createStore } from "vuex";
import axios from "axios";
const url = "https://course3-vuejs-default-rtdb.firebaseio.com/tasks.json";
export const store = createStore({
  state() {
    return {
      tasks: []
    };
  },
  mutations: {
    uploadTasks(state, tasks) {
      state.tasks = tasks;
    },
    createTask(state, task) {
      state.tasks.push(task);
    },
    changeTask(state, task) {
      const idx = state.tasks.findIndex(t => t.id === task.task.id);
      state.tasks[idx] = task.task;
    }
  },
  actions: {
    async uploadTasks({ commit }) {
      const { data } = await axios.get(url);
      const tasks = Object.keys(data).map(key => {
        return {
          id: key,
          ...data[key]
        };
      });
      commit("uploadTasks", tasks);
    },
    async createTask({ commit }, task) {
      if (task.date < new Date()) {
        task.status = "cancelled";
      }
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: task.id,
          title: task.title,
          date: task.date,
          description: task.description,
          status: task.status
        })
      });
      commit("createTask", task);
    },
    changeTask({ commit }, task) {
      commit("changeTask", task);
    }
  },
  getters: {
    alltasks(state) {
      return state.tasks;
    },
    tasksCount(state) {
      return state.tasks.filter(t => t.status === "active").length;
    },
    taskById(_, getters) {
      return id => getters.alltasks.find(t => t.id === id);
    }
  }
});
