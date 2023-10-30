<script setup lang="ts">
import { reactive } from "vue";
const state = reactive({ message: "", currentQuestion: 0, answer: "" });
let exams = [
  { question: "氫的元素符號是:", answer: "H", options: ["He", "T", "Ti", "H"] },
  { question: "氧的元素符號是:", answer: "O", options: ["Y", "O", "Yi", "I"] },
  {
    question: "氦的元素符號是:",
    answer: "He",
    options: ["Hi", "He", "H", "Ha"],
  },
];
function generateQuestion() {
  if (exams[state.currentQuestion].answer === state.answer) {
    state.message = "答案正確";
    state.answer = "";
    if (state.currentQuestion + 1 < exams.length) {
      state.currentQuestion++;
    }
  } else {
    state.message = "答案錯誤";
  }
}
</script>
<template>
  <div>
    {{ exams[state.currentQuestion].question }}
    <span v-for="option in exams[state.currentQuestion].options" v-bind:key="option">
      <input type="radio" v-model="state.answer" :value="option"/>
      {{ option }}
    </span>
    {{ state.message }}
    {{ state.answer }}
    <button @click="generateQuestion">下一題</button>
  </div>
</template>
