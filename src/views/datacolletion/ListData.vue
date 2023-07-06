<template>
    <TopNavigationBar></TopNavigationBar>
    <div class="container mx-auto">
        <div class="py-3">
        <h3 class="text-2xl py-3">My Recorded Patinets</h3>

<DataTable :value="tableData" tableStyle="min-width: 50rem">
    <Column field="patient" header="Patient" sortable style="width: 25%"></Column>
    <Column field="region" header="Region" sortable style="width: 25%"></Column>
    <Column field="weight" header="Weight" sortable style="width: 25%"></Column>
    <Column field="height" header="Height" sortable style="width: 25%"></Column>
    <Column field="phonenumber" header="Phone Number" sortable style="width: 25%"></Column>
</DataTable>

    </div>
    </div>
</template>
<script setup>
import { onMounted,ref } from "vue";
import TopNavigationBar from "../../components/TopNavigationBar.vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import axios from "axios";
import { useRouter, useRoute } from 'vue-router'
import { userStore } from '@/stores/counter'
import apiService from '@/services/apiService';

const userstore = userStore()
const tableData = ref([])
const router = useRouter()
const route = useRoute()


onMounted(() => {
    apiService
    .get("patient")
    .then((response) => {
        tableData.value = response.data.map(row=>{
            return {
                patient:row.full_name,
                region:row.region,
                weight:row.weight,
                height:row.height,
                phonenumber:row.phonenumber
            }
        })
    // console.log('response :>> ', response);
    }).catch((error=>{
        // console.log(error.response.status)
        if (error.response.status === 401) {
            // route.push({name:'login'})
            userstore.isAuthenticated == false  
        }
    }));
});

</script>