<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />ddssss
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { homeget } from "@/api/index.js";
let env = process.env.NODE_ENV;

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  created() {
    console.log("bb");
    console.log(env);

    homeget().then(res => {
      console.log(res);
      console.log("aaa");
    });
  }
};
</script>
