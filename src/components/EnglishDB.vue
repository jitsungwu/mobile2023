<script setup lang="ts">
import { reactive, watch, inject } from 'vue'
import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import app from '@/components/settings/FirebaseConfig.vue'

const state = reactive({
  choice: 1,
  answer: [''],
  message: [''],
  exams: [{ question: '', answer: '' }],
  correctCount :0,
  incorrectCount :0,
})

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)
const examCollection = collection(db, 'English')
generateQuestions()

const account = inject('account', { name: '未登入', email: '', id: '' })

let units = [
  { title: '單元一', value: 1 },
  { title: '單元二', value: 2 }
]
//點選select時，會改變state.choice，利用watch，當state.choice改變時，重新讀取題目
watch(() => state.choice, generateQuestions)
async function generateQuestions() {
  console.log(state.choice)
  state.exams = []
  const queryExam = query(examCollection, where('unit', '==', state.choice))
  const querySnapshot = await getDocs(queryExam)
  querySnapshot.forEach((doc) => {
    state.exams.push({ question: doc.data().question, answer: doc.data().answer })
  })
}

async function checkAnswers() {
  state.message = [] // clear previous messages
  state.correctCount = 0
  state.incorrectCount = 0
  for (let i in state.exams) {
    if (state.answer[i] !== state.exams[i].answer) {
      state.message[i] = '不正確'
      state.incorrectCount++
    } else {
      state.message[i] = '正確'
      state.correctCount++
    }
  }
  await addDoc(collection(db,"user/"+account.id+"/record"),
    {
      subject: '英文',
      unit: state.choice,
      correctCount: state.correctCount,
      incorrectCount: state.incorrectCount,
      date: new Date()
    }
  );
}
</script>
<template>
  <v-container>
    {{ account.name }}
    <v-select label="請選擇" v-model="state.choice" :items="units"> </v-select>
    <v-card v-for="(exam, index) in state.exams" :key="index">
      <v-text-field
        v-model="state.answer[index]"
        :label="exam.question"
        :messages="state.message[index]"
      ></v-text-field>
    </v-card>
    <v-alert color="info" icon="$info" title="檢查結果">
      共答對{{ state.correctCount }}題 / 答錯{{ state.incorrectCount  }}題
    </v-alert>
    <v-btn color="primary" @click="checkAnswers">檢查答案</v-btn>
  </v-container>
</template>
