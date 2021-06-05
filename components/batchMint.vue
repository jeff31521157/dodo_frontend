<template>
  <form @submit.prevent="onSubmit">
    鑄造NFT數量:  <input type="text" v-model="NFT_amount" placeholder="[0,1....]"><br>
    鑄造NFT的metadata:  <input type="text" v-model="NFT_metadata" placeholder="NFT"><br>
    <input type="submit" value="確認">
  </form>
</template>

<script>
export default {
  name: "batchMint",
  data() {
    return {
      NFT_amount: "",
      NFT_metadata:""
    };
  },
  methods: {
    onSubmit() {
      this.$emit("batchMintDoDo", this.NFT_amount, this.NFT_metadata);
      this.text = "";
      
    }
  }
};
</script>

<style>
</style>
