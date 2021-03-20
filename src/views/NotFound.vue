<template>
  <div class="card">
    <h1>Задачи с id = {{ notFound }} не существует</h1>
  </div>
</template>
<script>
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    return {
      notFound: route.params.pathMatch[0]
    };
  }
};
</script>
