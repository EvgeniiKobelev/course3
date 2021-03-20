<template>
  <span :class="['badge', className]">{{ text }}</span>
</template>
<script>
import { ref } from "vue";
export default {
  props: ["type"],
  setup(props) {
    const classesType = {
      active: "primary",
      cancelled: "danger",
      done: "primary",
      pending: "warning"
    };

    const textType = {
      active: "Активен",
      cancelled: "Отменен",
      done: "Завершен",
      pending: "Выполняется"
    };

    const className = ref(classesType[props.type]);
    const text = ref(textType[props.type]);
    return {
      className,
      text
    };
  }
};
</script>
