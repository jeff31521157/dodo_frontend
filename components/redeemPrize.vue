<template>
  <form @submit.prevent="onSubmit">
    <input type="text" v-model="ticketNum" placeholder="The number of token that you want to buy....">
    <input type="submit" value="確認">
  </form>
</template>

<script>
export default {
  name: "redeemPrize",
  data() {
    return {
      ticketNum: ""      
    };
  },
  methods: {
    onSubmit() {
      this.$emit("redeemPrizeDoDo", this.ticketNum);
      this.text = "";
      
    }
  }
};
</script>

<style>
</style>
