<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
export default {
  created() {
    this.$http.get("/user").then(res => {
      console.log(res);
    });
    console.log(this.$http);
  }
};
</script>