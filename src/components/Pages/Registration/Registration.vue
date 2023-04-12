<template>
  <div class="wrapper"> 

    <FormWrapper
    tittle-text="Registration"
    footer-text="Do you have an account?"
    link="#"
    text-link="Sign in"
    >
    <template #form>
      <Form
      @submit="onSubmit" 
      :validation-schema="schema"
      >
        <template #controls>
        <Control 
        name="email" 
        type="email" 
          placeholder="Your email address" 
        />
        <Control 
        name="password" 
        type="password" 
        placeholder="Your password"
        />
        <Control 
        name="country" 
        type="text" 
        placeholder="Your country" 
        />
        <SubmitBtn
        text="Submit"
        />
        </template>
      </Form>
    </template>
    </FormWrapper>
    
  </div>
</template>

<script setup lang="ts">
import { watchEffect} from 'vue'
import FormWrapper from '../../Form/FormWrapper.vue';
import Form from '../../Form/Form.vue';
import Control from '../../Form/Control.vue';
import SubmitBtn from '../../Form/SubmitBtn.vue';
import {geolocationAPI} from '../../../geolocationAPI/geolocationAPI.js'
import { serverAPI } from '../../../serverAPI/serverAPI.js';
import { Endpoints } from '../../../serverAPI/endpoints.js';
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
  country: Yup.string().required(),
});

const userGeolocation = geolocationAPI.userGeolocationCallback()

let UserCoords
watchEffect(() => {
    if (userGeolocation.value.lat !== 0) {
        UserCoords = userGeolocation.value
    }
})


const endpoints = new Endpoints()
const onSubmit = (values) => {
  values.markers = []
  serverAPI.post(endpoints.test, values)
  location.hash = '#'
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap');
  body {
    font-family: 'Open Sans', sans-serif;
    font-weight: normal;
    margin: 0px;
    background: #fafafa;
  }

  .wrapper {
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }

</style>
