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
import { useRouter } from "vue-router";
import { userStore } from '@/stores/counter'
// import { useToast } from "primevue/usetoast";
// import Toast from "primevue/toast";
import axios from "axios";

const router = useRouter();
const userstore = userStore()
// const toast = useToast();
const items = [
  {
    label: "Patient Information",
    to: "/data/create/base/patient",
  },
  {
    label: "Questions",
    to: "/data/create/base/question",
  },
  // {
  //   label: "Comments",
  //   to: "/data/create/base/comment",
  // },
];
const formObject = reactive({});
// console.log("formObject", formObject);

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
  axios.post('patient/', submittingObject,{
        headers:{
            'Authorization' : "Token " + userstore.authToken   
        }
    }).then(response => {
    router.push({ path: '/data/create/base/patient' })
   }).catch(error => {
    console.log('error', error
    );
  })
  // toast.add({
  //   severity: "success",
  //   summary: "Order submitted",
  //   detail: "Dear, " + formObject.fullname + " your order completed.",
  // });
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
