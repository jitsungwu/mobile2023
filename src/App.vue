<script setup lang="ts">
// import '@mdi/font/css/materialdesignicons.css'
import English from './components/EnglishDB.vue'
import ChemistryInput from './components/ChemistryInput.vue'
import ChemistryRadio from './components/ChemistryRadio.vue'
import { reactive, ref } from 'vue'
let drawer = ref(false)
let choice = reactive({ title: '英文', value: 'English' })
let items = [
  { title: '英文', value: 'English' },
  { title: '化學', value: 'ChemistryInput' },
  { title: '化學單選', value: 'ChemistryRadio' }
]
// import { ref } from "vue";
// let choice = ref(0);
// let items=[
//   {title:'英文', value:0},
//   {title:'化學', value:1},
//   {title:'化學單選', value:2}]

// let items=['英文','化學','化學單選']
</script>

<template>
  <v-app class="rounded rounded-md">
    <v-app-bar>
      <v-icon icon="plus"></v-icon>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Application bar</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer floating permanent v-model="drawer">
      <v-list>
        <v-list-item
          v-for="item in items"
          :title="item.title"
          :key="item.value"
          :active="item.value === choice.value"
          @click="choice.value = item.value"
        >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex flex-column align-start justify-start mb-6" style="min-height: 300px">
      <!-- <v-select label="請選擇" v-model="choice.value" :items="items" item-title="title" item-value="value">
      </v-select> -->
      <!-- <v-container> -->
      <Suspense>
        <English v-if="choice.value === 'English'" />
        <ChemistryInput v-else-if="choice.value === 'ChemistryInput'" />
        <ChemistryRadio v-else />
      </Suspense>
      <!-- </v-container> -->
    </v-main>
  </v-app>
</template>
