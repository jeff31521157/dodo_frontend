<template>
  <form @submit.prevent="onSubmit">
    Ticket張數:  <input type="text" v-model="newSellingTickets" placeholder="amount tickets to sell....."><br>
    Ticket價格(Ether):  <input type="text" v-model="newPrice" placeholder="ticket price....."><br>
    <input type="submit" value="確認">
  </form>
</template>

<script>
export default {
  name: "updateSellingInfo",
  data() {
    return {
      newSellingTickets: "",
      newPrice:""
    };
  },
  methods: {
    onSubmit() {
      this.$emit("updateSellingInfoDoDo", this.newSellingTickets, this.newPrice);
      this.text = "";
      
    }
  }
};
</script>

<style>
</style>
