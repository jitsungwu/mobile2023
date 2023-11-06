<script setup lang="ts">
import { provide, reactive, ref } from 'vue'
let drawer = ref(false)
let items = [
  { title: '英文', to: '/english' },
  { title: '化學', to: '/chemistry' },
  { title: '化學單選', to: '/chemistry-radio' }
]
const account = reactive({
  name: '吳濟聰',
  email: 'benwu@im.fju.edu.tw'})
provide(/* key */ 'account', /* value */ account)
</script>

<template>
  <v-app class="rounded rounded-md">
    <v-app-bar>
      <v-icon icon="plus"></v-icon>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Application bar {{ account.name }}</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer floating permanent v-model="drawer">
      <v-list>
        <v-list-item
          v-for="item in items"
          :title="item.title"
          :key="item.title"
          :to="item.to"
        >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex flex-column align-start justify-start mb-6" style="min-height: 300px">
      <Suspense>
        <RouterView />
      </Suspense>
    </v-main>
  </v-app>
</template>
