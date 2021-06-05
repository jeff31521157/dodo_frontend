<template>
  <div>
    <h1>Redeem Prize</h1>
    <p>Use tickets to buy tokens</p>
    <redeemPrize v-on:redeemPrizeDoDo="redeemPrizeDoDo"/>
    <p>--------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
    <h1>Token</h1>
    <p>The number of token that you own:</p>
    {{dodobalanceof}}
    <p>--------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
    <h1>Token Info</h1>
    <p>The is your token info </p>
    {{dodotokenId_result}}
  </div>
</template>

<script>
import dodoInstance from '@/lib/dodoInstance';
import web3 from '@/lib/web3';
import redeemPrize from "@/components/redeemPrize";
export default {
  components: {
    redeemPrize,
  },
  data: () => ({
    currentAccount:"",
    dodoticketNum:"",
    dodobalanceof:"",
    dodotokenId_result:[]
  }),
  created() {
    this.catchAccounts().then((result) => {
      this.callBalanceOf();
      this.TokenInfo();
    })    
  },
  methods: {
    async catchAccounts(){
      const tx = await web3.eth.getAccounts();
      this.currentAccount = tx[0];
    },
    async redeemPrizeDoDo(text) {
       this.dodoticketNum = await text;
       dodoInstance.methods
        .redeemPrize(this.dodoticketNum)
        .send({ from: this.currentAccount })
        .then((result) => {
          console.log(result);          
      });
    },

    async callBalanceOf() {
       dodoInstance.methods
        .balanceOf(this.currentAccount)
        .call()
        .then((amount) => {
          this.dodobalanceof = amount;
      });
    },
    async TokenInfo() {
       dodoInstance.methods
        .balanceOf(this.currentAccount)
        .call()
        .then((amount) => {
          for(var i = 0 ; i<amount ; i++){
            dodoInstance.methods
              .tokenOfOwnerByIndex(this.currentAccount,i)
              .call()
              .then((tokenId) => {
                dodoInstance.methods
                  .tokenURI(tokenId)
                  .call()
                  .then((tokenId_result) => {
                    console.log(tokenId_result);
                    this.dodotokenId_result.push(tokenId_result)
                });
            });
          }
          
      });
    },

  },
  head: {
    title: 'Honeycomb',
  },
};
</script>

<style>
</style>
