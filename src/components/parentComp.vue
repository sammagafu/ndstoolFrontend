<template>
  <TopNavigationBar></TopNavigationBar>
  <div>
    <Toast />

    <div class="card">
      <Steps :model="items" aria-label="Form Steps" />
    </div>

    <router-view
      v-slot="{ Component }"
      :formData="formObject"
      @prevPage="prevPage($event)"
      @nextPage="nextPage($event)"
      @complete="complete"
    >
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
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import axios from "axios";

const router = useRouter();
const toast = useToast();
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
  console.log('dataQuestions :>> ', dataQuestions);
let submittingObject={
  ...formObject,
  patientQuestion:dataQuestions.formData.patientQuestion.map(el=>({
    question:el.id,
    answers:el.userAnswer
  }))
}

console.log('submittingObject :>> ', submittingObject);

axios.post('patient/',submittingObject,).then(response =>{ }).catch(error =>{
})


  toast.add({
    severity: "success",
    summary: "Order submitted",
    detail: "Dear, " + formObject.fullname + " your order completed.",
  });
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
