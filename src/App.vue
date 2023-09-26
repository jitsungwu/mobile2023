<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import TheClick from './components/TheClick.vue';
</script>

<template>
  <div>
    <h1>Hello</h1>
    <HelloWorld msg="hi"/>
    <TheClick :init="0" :count="0" />
  </div>
</template>