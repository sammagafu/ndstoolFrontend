<template>
  <Card>
    <template v-slot:content>
        <div class="container lg:mx-auto  ">
          <div class="space-x-3">
            <div class="basis-2/5">
              <h1
                class="py-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
              >
                Register Patient
              </h1>
              <form class="space-y-4 md:space-y-6" @submit.prevent="loginUser">
                <div>
                  <label
                    for="fullname"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Patient Full Name</label
                  >
                  <input                  
                    type="text"
                    name="text"
                    id="fullname"
                    :class="{
                      'p-error': validationErrors.fullname && submitted,
                    }"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Fullname"                
                    v-model="fullname"
                  />
                  <small
                    v-show="validationErrors.fullname && submitted"
                    class="p-error"
                    >fullname is required.</small
                  >
                </div>
                <div>
                  <label
                    for="facility"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >facility Name</label
                  >
                  <input
                    type="text"
                    name="text"
                    id="facility"
                    :class="{
                      'p-invalid': validationErrors.facility && submitted,
                    }"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your facility"        
                    v-model="facility"
                  />
                  <small
                    v-show="validationErrors.facility && submitted"
                    class="p-error"
                    >facility is required.</small
                  >
                </div>
                <div>
                  <label
                    for="region"
                    class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                    >Patient's Region</label
                  >
                  <select
                    id="region"
                    v-model="region"
                    class="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option disabled value>Choose patient region</option>
                    <option value="Arusha">Arusha</option>
                    <option value="Dar es Salaam">Dar es Salaam</option>
                    <option value="Dodoma">Dodoma</option>
                    <option value="Geita">Geita</option>
                    <option value="Iringa">Iringa</option>
                    <option value="Kagera">Kagera</option>
                    <option value="Katavi">Katavi</option>
                    <option value="Kigoma">Kigoma</option>
                    <option value="Kilimanjaro">Kilimanjaro</option>
                    <option value="Lindi">Lindi</option>
                    <option value="Manyara">Manyara</option>
                    <option value="Mara">Mara</option>
                    <option value="Mbeya">Mbeya</option>
                    <option value="Mjini Magharibi">Mjini Magharibi</option>
                    <option value="Morogoro">Morogoro</option>
                    <option value="Mtwara">Mtwara</option>
                    <option value="Mwanza">Mwanza</option>
                    <option value="Njombe">Njombe</option>
                    <option value="Pemba North">Pemba North</option>
                    <option value="Pemba South">Pemba South</option>
                    <option value="Pwani">Pwani</option>
                    <option value="Rukwa">Rukwa</option>
                    <option value="Ruvuma">Ruvuma</option>
                    <option value="Shinyanga">Shinyanga</option>
                    <option value="Simiyu">Simiyu</option>
                    <option value="Singida">Singida</option>
                    <option value="Songwe">Songwe</option>
                    <option value="Tabora">Tabora</option>
                    <option value="Tanga">Tanga</option>
                    <option value="Unguja North">Unguja North</option>
                    <option value="Unguja South">Unguja South</option>
                  </select>
                </div>

                <div>
                  <label
                    for="dateofbirth"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Date of Birth</label
                  >
                  <input
                    type="date"
                    id="dateofbirth"
                    name="trip-start"
                    :class="{
                      'p-invalid': validationErrors.dateofbirth && submitted,
                    }"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    v-model="dateofbirth"
                  />
                  <small
                    v-show="validationErrors.dateofbirth && submitted"
                    class="p-error"
                    >dateofbirth is required.</small
                  >
                </div>

                <div>
                  <label
                    for="height"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Patient's Height in(cm)</label
                  >
                  <input
                    type="number"
                    name="text"
                    id="height"
                    :class="{
                      'p-invalid': validationErrors.height && submitted,
                    }"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Height"
                    
                    v-model="height"
                  />
                  <small
                    v-show="validationErrors.height && submitted"
                    class="p-error"
                    >height is required.</small
                  >
                </div>

                <div>
                  <label
                    for="weight"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Patient's Weight in(kg)</label
                  >
                  <input
                    type="number"
                    name="text"
                    id="weight"
                    :class="{
                      'p-invalid': validationErrors.weight && submitted,
                    }"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Weight in(kg)"
                
                    v-model="weight"
                  />
                  <small
                    v-show="validationErrors.weight && submitted"
                    class="p-error"
                    >weight is required.</small
                  >
                </div>
              </form>
            </div>
          </div>
        </div>

    </template>
    <template v-slot:footer>
      <div class="grid grid-nogutter justify-center">
        <i></i>
        <Button
          label="Next"
          @click="nextPage"
          icon="pi pi-angle-right"
          iconPos="right"
          class="p-button-info"
        />
      </div>
    </template>
  </Card>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["next-page"]);

// variables
const fullname = ref("");
const facility = ref("");
const region = ref("");
const dateofbirth = ref("");
const height = ref('');
const weight = ref('');

const submitted = ref(false);
const validationErrors = ref({});

function nextPage() {
  submitted.value = true;
  if (validateForm()) {
    emit("next-page", {
      formData: {
        fullname: fullname.value,
        facility: facility.value,
        dateofbirth: dateofbirth.value,
        height: height.value,
        weight: weight.value,
      },
      pageIndex: 0,
    });
  }
}

function validateForm() {
  if (!fullname.value.trim()) validationErrors.value["fullname"] = true;
  else delete validationErrors.value["fullname"];

  if (!facility.value.trim()) validationErrors.value["facility"] = true;
  else delete validationErrors.value["facility"];

  if (!dateofbirth.value.trim()) validationErrors.value["dateofbirth"] = true;
  else delete validationErrors.value["dateofbirth"];

  if (!height.value) validationErrors.value["height"] = true;
  else delete validationErrors.value["height"];

  if (!weight.value) validationErrors.value["weight"] = true;
  else delete validationErrors.value["weight"];

  return !Object.keys(validationErrors.value).length;
}
</script>
