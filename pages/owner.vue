<template>
  <div>
    <h1>Init</h1>
    <p>This for owner to init the DoDo smart contract</p>
    <init v-on:initDoDo="initDoDo"/>
    <p>--------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
    <h1>Batch Mint</h1>
    <p>This for owner to batch mint the NFT for DoDo smart contract</p>
    <batchMint v-on:batchMintDoDo="batchMintDoDo"/>
    {{dodoNFT_amount}}
    {{dodoNFT_metadata}}
    <p>--------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
    <h1>updateSellingInfo</h1>
    <p>This for owner to updateSellingInfo for the NFT</p>
    <updateSellingInfo v-on:updateSellingInfoDoDo="updateSellingInfoDoDo"/>
    <p>--------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
    <h1>ReedeemPrize authority</h1>
    <button v-on:click="enableRedeem">Enable</button> <br></br>
    <button v-on:click="disableRedeem">Disable</button>
    <p>--------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
    <h1>Withdraw Ether from smart contract</h1>
    <button v-on:click="WithdrawEther">Withdraw Money</button>
  </div>
</template>

<script>
import dodoInstance from '@/lib/dodoInstance';
import web3 from '@/lib/web3';
import init from "@/components/init";
import batchMint from "@/components/batchMint";
import updateSellingInfo from "@/components/updateSellingInfo";
export default {
  components: {
    init,
    batchMint,
    updateSellingInfo
  },
  data: () => ({
    currentAccount:"",
    dodoName:"",
    dodoSymbol:"",
    dodoBaseUri:"",
    dodoOwner:"",
    dodoNFT_amount:"",
    dodoNFT_metadata:"",
    dodonewSellingTickets:"",
    dodonewPrice:"",
  }),
  created() {
    this.catchAccounts();
  },
  methods: {
    async catchAccounts(){
      const tx = await web3.eth.getAccounts();
      this.currentAccount = tx[0];
    },
    async initDoDo(text1, text2, text3, text4) {
       this.dodoName = await text1;
       this.dodoSymbol = await text2;
       this.dodoBaseUri = await text3;
       this.dodoOwner = await text4;
       dodoInstance.methods
        .init(this.dodoName, this.dodoSymbol, this.dodoBaseUri, this.dodoOwner)
        .send({ from: this.currentAccount })
        .then((result) => {
          console.log(result);
          
      });
    },

    async batchMintDoDo(text1, text2) {
       this.dodoNFT_amount = await text1;
       this.dodoNFT_metadata = await text2;
       console.log(this.dodoNFT_amount);
       console.log(this.dodoNFT_metadata);
       //[10,11], ["aa","bb"]
       await dodoInstance.methods
        .batchMint(this.dodoNFT_amount,this.dodoNFT_metadata)
        .send({ from: this.currentAccount })
        .then((result) => {
          console.log(result);
          
      });
    },

    async updateSellingInfoDoDo(text1, text2) {
       this.dodonewSellingTickets = await text1;
       this.dodonewPrice = await web3.utils.toWei(text2, 'ether');

       dodoInstance.methods
        .updateSellingInfo(this.dodonewSellingTickets, this.dodonewPrice)
        .send({ from: this.currentAccount })
        .then((result) => {
          console.log(result);
          
      });
    },
    async enableRedeem(){
      dodoInstance.methods
        .enableRedeemPrize()
        .send({ from: this.currentAccount })
        .then((result) => {
          console.log(result);          
      });
    },

    async disableRedeem(){
      dodoInstance.methods
        .disableRedeemPrize()
        .send({ from: this.currentAccount })
        .then((result) => {
          console.log(result);          
      });
    },
    
    async WithdrawEther(){
      dodoInstance.methods
        .withdraw()
        .send({ from: this.currentAccount })
        .then((result) => {
          console.log(result);          
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
