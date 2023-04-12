<template>
  <div class="wrapper__form">
    <div class="wrapper__form_header">
      <h3 class="form_header_tittle">{{ tittleText }}</h3>
      <slot name="form"></slot>
    </div>
    <div class="wrapper__form_footer">
        <span>{{ footerText }}</span>
        <a :href="link" class="form_footer_link">{{ textLink }}</a>
    </div>
  </div>
</template>


<script setup lang="ts">
const props = defineProps({
  tittleText: {
    type: String,
    default: "",
  },
  footerText: {
    type: String,
    default: "",
  },
  link: {
    type: String,
    required: true,
  },
  textLink: {
    type: String,
  }
});
</script>


<style scoped>
.wrapper__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
}
.wrapper__form_header {
  box-sizing: border-box;
  padding: 30px 20px;
  width: 350px;
  border: 1px solid #e6e6e6;
}
.form_header_tittle {
  font-size: 34px;
  text-align: center;
  margin: 0 0 20px;
}
.wrapper__form_footer {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 350px;
  height: 60px;
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #fff;
  border: 1px solid #e6e6e6;
}
.form_footer_link {
  margin-left: 6px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  color: #0195f6;
}  
</style>
