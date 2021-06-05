<template>
  <div>
    <h1>Buy Ticket</h1>
    <p>Use Ether to buy ticket</p>
    <ticketFunction v-on:ticketFunctionDoDo="ticketFunctionDoDo"/>
    <p>--------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
    <h1>Own Tickets</h1>
    <p>The number of ticket that you own:</p>
    {{ dodoUserOwnTickets }}
    <p>--------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
    <h1>Tickets Total Supply</h1>
    <p>The number of tickets that minted at the beginning</p>
    {{ dodo_total_amount }}
    <p>--------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
    <h1>Current Selling Tickets</h1>
    <p>The number of ticket that available to buy:</p>
    {{ dodo_CUR_SELLING_TICKETS_ }}
    <p>--------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
    <h1>Current Tickets Price</h1>
    <p>This the current tickets price(uint:Ether):</p>
    {{ dodo_CUR_PRCIE_ }}
  </div>
</template>

<script>
import dodoInstance from '@/lib/dodoInstance';
import web3 from '@/lib/web3';
import ticketFunction from "@/components/ticketFunction";
export default {
  components: {
    ticketFunction
  },
  data: () => ({
    currentAccount:"",
    dodo_CUR_SELLING_TICKETS_:"",
    dodo_CUR_PRCIE_:"",
    dodoUserOwnTickets:"",
    dodo_total_amount:"",
    dodo_buy_num_Tickets:""
  }),
  created() {
    this.catchAccounts().then((result) => {
      this.TicketsInfo();
    })
  },
  methods: {
    async catchAccounts(){
      const tx = await web3.eth.getAccounts();
      this.currentAccount = tx[0];
    },
    async TicketsInfo() {

       dodoInstance.methods
        ._CUR_SELLING_TICKETS_()
        .call()
        .then((amount) => {
          console.log(amount);
          this.dodo_CUR_SELLING_TICKETS_ = amount;
      });
      dodoInstance.methods
        ._CUR_PRCIE_()
        .call()
        .then((price) => {
          console.log(price);
          this.dodo_CUR_PRCIE_ = web3.utils.fromWei(price, 'ether');
          
      });
      dodoInstance.methods
        .totalSupply()
        .call()
        .then((total_amount) => {
          console.log(total_amount);
          this.dodo_total_amount = total_amount;
      });
      dodoInstance.methods
        .getTickets(this.currentAccount)
        .call()
        .then((ticket_amount) => {
          console.log(ticket_amount);
          this.dodoUserOwnTickets = ticket_amount;
      });
    },
    async ticketFunctionDoDo(text) {
      this.dodo_buy_num_Tickets = await text;
      dodoInstance.methods
        .buyTicket()
        .send({ from: this.currentAccount ,value: web3.utils.toWei(this.dodo_buy_num_Tickets, 'ether'), })
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
