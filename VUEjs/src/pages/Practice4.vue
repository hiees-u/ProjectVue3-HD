<script lang="ts" setup>
import { ref } from "vue";
import { Login } from "../utils/model";
import InputTextAndLabel from "../components/InputTextAndLabel.vue";
import { useAuthStore } from "../stores/storeAuth";

const reqLogin = ref<Login>(Login());

const authStore = useAuthStore();

let res = ref<boolean | null>(null);
const login = async () => {
  res.value = await authStore.login(reqLogin.value.uName, reqLogin.value.uPass);
  console.log(res.value);
};
</script>

<template>
  <h1>Practice 4: Vue router with permission check</h1>

  <div class="container">
    <InputTextAndLabel
      v-model:Value="reqLogin.uName"
      Placeholder="Enter user name"
      Label="User Name"
    />
    <InputTextAndLabel
      :Password="true"
      v-model:Value="reqLogin.uPass"
      Placeholder="Enter password"
      Label="Password"
    />
    <p v-if="res !== null">
      <span class="sucess" v-if="res">Login Sucess...!</span>
      <span class="error" v-else>Login error...!</span>
    </p>
    <button @click.prevent="login">LOGIN</button>
    <div class="done">
      <p>
        Practice 4: Vue router with permission check
        <i class="fa-solid fa-check-double"></i>
      </p>
    </div>
  </div>
</template>

<style scoped lang="sass">
.sucess
  color: green
.error
  color: red
.done
  margin-top: 50px
i
  color: green
  margin-left: 10px
div
  display: flex
.container
  display: flex
  flex-direction: column
  align-items: center
</style>
