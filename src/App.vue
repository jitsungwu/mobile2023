<script setup lang="ts">
import { provide, reactive, readonly, ref } from 'vue'
import app from '@/components/settings/FirebaseConfig.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, getFirestore } from 'firebase/firestore';

let drawer = ref(false)
let items = [
  { title: '登入', to: '/account' },
  { title: '圖片', to: '/a' },
  { title: '英文', to: '/english' },
  { title: '化學', to: '/chemistry' },
  { title: '化學單選', to: '/chemistry-radio' }
]

const account = reactive({
  name: '未登入',
  email: '',
  id: ''
})
const auth = getAuth(app)
const db = getFirestore(app)
const unsub = onAuthStateChanged(auth, async (user)=>{
  if (user) {
    account.name='已登入'
    account.email = user.email?user.email:''
    account.id = user.uid
    console.log(user);
    const userDoc = await getDoc(doc(db, "user", user.uid));

    if (userDoc.exists()) {
      account.name = userDoc.data().name? userDoc.data().name:''
    }
    else{
      account.name = '未登入'
    }
  }
  else{
    account.name='未登入'
    account.email = ''
  }
  return () => {
    unsub();
  }}
);
// provide(/* key */ 'account', /* value */ account)
provide(/* key */ 'account', /* value */ readonly(account))

</script>

<template>
  <v-app class="rounded rounded-md">
    <v-app-bar>
      <v-icon icon="plus"></v-icon>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>產品管理{{ account.email }}</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer floating permanent v-model="drawer">
      <v-list>
        <v-list-item v-for="item in items" :title="item.title" :key="item.title" :to="item.to">
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
