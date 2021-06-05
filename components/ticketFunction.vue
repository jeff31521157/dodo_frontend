<template>
  <form @submit.prevent="onSubmit">
    <input type="text" v-model="buy_num_Tickets" placeholder="ether to buy.....">
    <input type="submit" value="確認">
  </form>
</template>

<script>
export default {
  name: "ticketFunction",
  data() {
    return {
      buy_num_Tickets: "",
    };
  },
  methods: {
    onSubmit() {
      this.$emit("ticketFunctionDoDo", this.buy_num_Tickets);
      this.text = "";
      
    }
  }
};
</script>

<style>
</style>
