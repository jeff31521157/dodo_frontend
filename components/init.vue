<template>
  <form @submit.prevent="onSubmit">
    <input type="text" v-model="name" placeholder="name...">
    <input type="text" v-model="symbol" placeholder="symbol...">
    <input type="text" v-model="baseUri" placeholder="baseUri...">
    <input type="text" v-model="owner" placeholder="owner...">
    <input type="submit" value="確認">
  </form>
</template>

<script>
export default {
  name: "init",
  data() {
    return {
      name: "",
      symbol:"",
      baseUri:"",
      owner:"",
    };
  },
  methods: {
    onSubmit() {
      this.$emit("initDoDo", this.name, this.symbol, this.baseUri, this.owner);
      this.text = "";
      
    }
  }
};
</script>

<style>
</style>
