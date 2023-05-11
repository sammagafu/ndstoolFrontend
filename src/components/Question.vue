<!-- <template>
  <div>
    <TopNavigationBar/>
    <div v-for="(question, index) in displayedQuestions" :key="index" class="m-4">
      <h3 class="text-xl font-semibold tracking-wide break-all">{{ (currentPage - 1) * itemsPerPage + index + 1 }}. {{ question.question }}</h3>
      <div class="bg-slate-200 hover:bg-cyan-600 m-2">
        <label :for="'true' + index">
          <input type="radio" :name="question.question" :id="'true' + index" value="true" v-model="question.userAnswer" />
          True
        </label>
      </div>
      <div class="bg-slate-200 hover:bg-cyan-600 m-2">
        <label :for="'false' + index">
          <input type="radio" :name="question.question" :id="'false' + index" value="false" v-model="question.userAnswer" />
          False
        </label>
      </div>
      <div class="bg-slate-200 hover:bg-cyan-600 m-2">
        <label :for="'dont-know' + index">
          <input type="radio" :name="question.question" :id="'dont-know' + index" value="dont-know" v-model="question.userAnswer" />
          Don't know
        </label>
      </div>
    </div>
    <div class="flex justify-center my-8">
      <button class="mx-2" @click="currentPage--" :disabled="currentPage === 1">Previous</button>
      <button class="mx-2" @click="currentPage++" :disabled="currentPage === pageCount">Next</button>
    </div>
  </div>
</template>

<script setup>
import TopNavigationBar from '/src/components/TopNavigationBar.vue';
import axios from 'axios';
import { onMounted, ref, computed } from 'vue';

const itemsPerPage = 5;

onMounted(() => {
  axios.get('https://opentdb.com/api.php?amount=20&type=boolean')
    .then(response => {
      const { data } = response;
      data.results.forEach(el => {
        el.userAnswer = '';
      });
      questions.value = data.results;
    })
});

const questions = ref([]);

const currentPage = ref(1);

const pageCount = computed(() => Math.ceil(questions.value.length / itemsPerPage));

const displayedQuestions = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return questions.value.slice(startIndex, endIndex);
});

</script> -->

<template>
  <div>
      <!-- <Toast /> -->

      <div class="card">
          <Steps :model="items" aria-label="Form Steps" />
      </div>

      <router-view v-slot="{Component}" :formData="formObject" @prevPage="prevPage($event)" @nextPage="nextPage($event)" @complete="complete">
          <keep-alive>
              <component :is="Component" />
          </keep-alive>
      </router-view>
  </div>
</template>

<script setup>

import { ref } from "vue";
import { useRouter } from "vue-router";
// import { useToast } from "primevue/usetoast";
// import Toast from 'primevue/toast';


const router = useRouter();
// const toast = useToast();
const items = ref([
  {
      label: 'Personal',
      to: "/"
  },
  {
      label: 'Seat',
      to: "/seat",
  },

]);
const formObject = ref({});

const prevPage = ({ pageIndex }) => {
      router.push(items[pageIndex - 1].to);
    };

    const nextPage = ({ pageIndex, formData }) => {
      for (const field in formData) {
        formObject[field] = formData[field];
      }
      router.push(items[pageIndex + 1].to);
    };

    const complete = () => {
      // toast.add({
      //   severity: 'success',
      //   summary: 'Order submitted',
      //   detail: `Dear, ${formObject.firstname} ${formObject.lastname} your order completed.`
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