<template>
  <div class="wrapper"> 

    <FormWrapper
    tittle-text="Wellcom"
    footer-text="Don't have an account yet?"
    link="#registration"
    text-link="Sign up"
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
import { ref, useAttrs } from 'vue';
import FormWrapper from '../../Form/FormWrapper.vue';
import Form from '../../Form/Form.vue';
import Control from '../../Form/Control.vue';
import SubmitBtn from '../../Form/SubmitBtn.vue';
import {serverAPI} from '../../../serverAPI/serverAPI.js';
import {Endpoints} from '../../../serverAPI/endpoints.js';
import {storageAPI} from '../../../storageAPI/storageAPI.js'
import {storageNames} from '../../../storageAPI/storageNames.js'
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});

const endpoints = new Endpoints()

const onSubmit = async (values) => {
  const user = endpoints.userByEmailAndLogin(values.email, values.password)
  const response = await serverAPI.get(user)

  if (values.email === response[0].email && values.password === response[0].password) {
    const userId = response[0].objectId
    storageAPI.set(storageNames.userId, userId)
    location.hash = '#main'
  }
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
