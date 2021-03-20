<template>
  <div class="card" v-if="task">
    <h2>{{ task.title }}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="task.status" /></p>
    <p>
      <strong>Дэдлайн</strong>: {{ new Date(task.date).toLocaleDateString() }}
    </p>
    <p><strong>Описание</strong>: {{ task.description }}</p>
    <div>
      <button class="btn" @click="changeTask('pending')">
        Взять в работу
      </button>
      <button class="btn primary" @click="changeTask('done')">
        Завершить
      </button>
      <button class="btn danger" @click="changeTask('cancelled')">
        Отменить
      </button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ id }}</strong> нет.
  </h3>
</template>

<script>
import AppStatus from "../components/AppStatus";

export default {
  props: ["id"],
  components: { AppStatus },
  data() {},
  methods: {
    changeTask(s) {
      this.task.status = s;
      this.$store.dispatch("changeTask", {
        task: this.task
      });
    }
    // ...mapActions(["changeTask"])
  },
  computed: {
    task() {
      return this.$store.getters.taskById(this.id);
    }
  },
  mounted() {
    console.log();
  }
};
</script>

<style scoped></style>
