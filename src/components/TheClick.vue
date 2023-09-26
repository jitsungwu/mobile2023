<script setup lang="ts">
import { reactive } from "vue";
const props = defineProps(["init", "count"]);
const emit = defineEmits(["clicked"]);
const state = reactive({ count: props.init });
function increment() {
  state.count++;
  emit("clicked");
  alert(state.count);
}
</script>
<template>
  <div>
    {{ state.count }}
    <button @click="increment">點一下</button>
  </div>
</template>
