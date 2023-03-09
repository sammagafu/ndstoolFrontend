
<template>

    <div class="dark:bg-gray-800">
        <div class="container lg:mx-auto py-6 mx-2">
            <div class=" space-x-3">
                <div class="basis-2/5">
                    <h1 class="py-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Register Patient
                    </h1>
                    <form class="space-y-4 md:space-y-6" @submit.prevent="loginUser">
                        <div>
                            <label for="Fullname"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Patient Full
                                Name</label>
                            <input type="text" name="text" id="Fullname"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Juma Shabani Mchungu" required="" v-model="fullname">
                        </div>
                        <div>
                            <label for="Facility"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Facility
                                Name</label>
                            <input type="text" name="text" id="Facility"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Bugando Medical Center" required="" v-model="facility">
                        </div>
                        <div>
                            <label for="region"
                                class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Patient's
                                Region</label>
                            <select id="region" v-model="region"
                                class="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                            <label for="start" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of
                                Birth</label>
                            <input type="date" id="start" name="trip-start"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                v-model="dateofbirth">
                        </div>

                        <div>
                            <label for="height"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Patient's Height
                                in(cm)</label>
                            <input type="number" name="text" id="height"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="9" required="" v-model="height">
                        </div>

                        <div>
                            <label for="weight"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Patient's Weight
                                in(kg)</label>
                            <input type="number" name="text" id="weight"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="5" required="" v-model="weight">
                        </div>

                        <button type="submit"
                            class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Record
                            Patient Data</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import TopNavigationBar from '/src/components/TopNavigationBar.vue';
import { ref } from 'vue';

// variables
const fullname = ref('')
const facility = ref('')
const region = ref('')
const dateofbirth = ref('')
const height = ref(1)
const weight = ref(1)
</script>