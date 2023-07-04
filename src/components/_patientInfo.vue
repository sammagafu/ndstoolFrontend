<template>
  <Card>
    <template v-slot:content>
      <div class="container lg:mx-auto">
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
                  >Patient Initals</label
                >
                <input
                  type="text"
                  name="text"
                  id="fullname"
                  :class="{
                    'p-error': validationErrors.fullname && submitted,
                  }"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Parent Initals Eg 'SMF' "
                  v-model="fullname"
                />
                <small v-show="validationErrors.fullname && submitted" class="p-error"
                  >Enter Parent intials.</small
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
                <small v-show="validationErrors.facility && submitted" class="p-error"
                  >facility is required.</small
                >
              </div>
              <div>
                <label
                  for="sex"
                  class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                  >Sex</label
                >
                <select
                  class="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  v-model="sex"
                >
                  <option disabled value>Choose Patient Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <small v-show="validationErrors.sex && submitted" class="p-error"
                  >sex is required.</small
                >
              </div>

              <div>
                <label
                  for="premature"
                  class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                  >Is a child Premature ?</label
                >
                <select
                  class="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  v-model="premature"
                >
                  <option disabled value>Choose Patient Gender</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <small v-show="validationErrors.sex && submitted" class="p-error"
                  >sex is required.</small
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
                  @input="pickedDate"
                />
                <small v-show="validationErrors.dateofbirth && submitted" class="p-error"
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
                <small v-show="validationErrors.height && submitted" class="p-error"
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
                <small v-show="validationErrors.weight && submitted" class="p-error"
                  >weight is required.</small
                >
              </div>

              <div>
                <label
                  for="phone"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Parent phone number</label
                >
                <input
                  type="text"
                  name="text"
                  id="phone"
                  :class="{
                    'p-invalid': validationErrors.phone && submitted,
                  }"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0712xxxxx"
                  v-model="phone"
                />
                <small v-show="validationErrors.phone && submitted" class="p-error"
                  >phone is required.</small
                >
              </div>

              <div>
                <label
                  for="agegroup"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Growth Age Group</label
                >
                <input
                  type="text"
                  name="text"
                  id="agegroup"
                  :class="{
                    'p-invalid': validationErrors.phone && submitted,
                  }"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Age group in months"
                  v-model="age"
                />
                <small v-show="validationErrors.age && submitted" class="p-error"
                  >Growth Age Group is required.</small
                >
              </div>

              <div>
                <label
                  for="address"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your address</label
                >
                <textarea
                  id="address"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Address goes here..."
                  v-model="address"
                ></textarea>
                <small v-show="validationErrors.address && submitted" class="p-error"
                  >address is required.</small
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
import { userStore } from '../stores/counter'

const emit = defineEmits(["next-page"]);
const store = userStore()

// variables
const fullname = ref("");
const facility = ref("");
const region = ref("");
const dateofbirth = ref("");
const height = ref("");
const weight = ref("");
const phone = ref("");
const address = ref("");
const sex = ref("");
const ageGroup = ref("");
const age = ref("");
const premature = ref("");

const submitted = ref(false);
const validationErrors = ref({});

const pickedDate = () => {
  const currentDate = new Date();
  const inputDate = new Date(dateofbirth.value);
  const timeDiff = currentDate.getTime() - inputDate.getTime();
  const monthsDiff = timeDiff / (1000 * 60 * 60 * 24 * 30);
  ageGroup.value = Math.floor(monthsDiff);
  store.detectedAge = ageGroup
};

function nextPage() {
  submitted.value = true;
  if (validateForm()) {
    emit("next-page", {
      formData: {
        full_name: fullname.value,
        facility: facility.value,
        region: region.value,
        dateofbirth: dateofbirth.value,
        height: height.value,
        weight: weight.value,
        phone: phone.value,
        address: address.value,
        sex: sex.value,
      },
      pageIndex: 0,
      ageroup: ageGroup,
    });
  }
}

function validateForm() {
  if (!fullname.value.trim()) validationErrors.value["fullname"] = true;
  else delete validationErrors.value["fullname"];

  if (!facility.value.trim()) validationErrors.value["facility"] = true;
  else delete validationErrors.value["facility"];

  if (!facility.value.trim()) validationErrors.value["region"] = true;
  else delete validationErrors.value["region"];

  if (!dateofbirth.value.trim()) validationErrors.value["dateofbirth"] = true;
  else delete validationErrors.value["dateofbirth"];

  if (!height.value) validationErrors.value["height"] = true;
  else delete validationErrors.value["height"];

  if (!age.value) validationErrors.value["age"] = true;
  else delete validationErrors.value["age"];

  if (!weight.value) validationErrors.value["weight"] = true;
  else delete validationErrors.value["weight"];

  if (!phone.value) validationErrors.value["phone"] = true;
  else delete validationErrors.value["phone"];

  if (!address.value) validationErrors.value["address"] = true;
  else delete validationErrors.value["address"];

  if (!sex.value) validationErrors.value["sex"] = true;
  else delete validationErrors.value["sex"];

  return !Object.keys(validationErrors.value).length;
}
</script>
