<template>
  <TopNavigationBar></TopNavigationBar>
  <div>
    <!-- <Toast /> -->

    <div class="card">
      <Steps :model="items" aria-label="Form Steps" />
    </div>

    <router-view v-slot="{ Component }" :formData="formObject" @prevPage="prevPage($event)" @nextPage="nextPage($event)"
      @complete="complete">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup>

import TopNavigationBar from "./TopNavigationBar.vue";
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter()


import { userStore } from '@/stores/counter'
// import Toast from "primevue/toast";
// import axios from "axios";
import apiService from '@/services/apiService';

const items = [
  {
    label: "Patient Information",
    to: "/data/create/base/patient",
  },
  {
    label: "Questions",
    to: "/data/create/base/question",
  },
];
const formObject = reactive({});

const nextPage = (event) => {
  for (let field in event.formData) {
    formObject[field] = event.formData[field];
  }

  router.push(items[event.pageIndex + 1].to);
};
const prevPage = (event) => {
  router.push(items[event.pageIndex - 1].to);
};
const complete = (dataQuestions) => {
  if (!dataQuestions) return

  let submittingObject = {
  ...formObject,
  patientQuestion: dataQuestions.formData.questions.flatMap((el) =>
    el.questions
    .filter((quest) => quest.userAnswer !== "")
    .map((quest) => ({
      question: quest.id,
      answers: quest.userAnswer,
    }))
  ),
  patientComment: dataQuestions.formData.questions
  .flatMap((co) => {
        if (co.comment !== "") {
          return {
            commentCategory: co.id,
            comment: co.comment,
          };
        }
        return [];
      }),
};
  console.log("submittingObject", submittingObject);
  apiService.post('patient/', submittingObject,{
    }).then(response => {
    
   }).catch(error => {
    console.log('error', error
    );
  })
  router.push({name:'home'});
};
</script>

<style scoped>
::v-deep(b) {
  display: block;
}

::v-deep(.p-card-body) {
  padding: 2rem;
}
</style>
