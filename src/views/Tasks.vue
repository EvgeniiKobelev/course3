<template>
  <h1 v-if="alltasks.length === 0" class="text-white center">Задач пока нет</h1>
  <template v-else>
    <h3 class="text-white">Всего активных задач: {{ tasksCount }}</h3>
    <div class="card" v-for="task in alltasks" :key="task.id">
      <h2 class="card-title">
        {{ task.title }}
        <AppStatus :type="task.status" />
      </h2>
      <p>
        {{ task.description }}
        <br />
        <strong>
          <small>
            Выполнить до {{ new Date(task.date).toLocaleDateString() }}
          </small>
        </strong>
      </p>
      <button class="btn primary" @click="open(task.id)">Посмотреть</button>
    </div>
  </template>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppStatus from "../components/AppStatus";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(["uploadTasks"]),
    open(id) {
      this.$router.push(`/task/` + id);
    }
  },
  computed: {
    ...mapGetters(["alltasks", "tasksCount"])
  },
  mounted() {
    this.uploadTasks();
  },
  components: { AppStatus }
};
</script>
