<template>
  <div class="main_app">
    <br>

    <p><strong> Current URL :  </strong> {{currentUrl}}</p>
    <br> <br>
    
    <p> <strong> Last top 5 : </strong></p>
    
    <p v-for="(item, index) in history" :key="index">

      {{item}}
      <v-divider inset></v-divider>
    </p>


    <v-btn to="/other"> sync </v-btn>
    <v-btn @click="callFunc"> func1 </v-btn>
    <router-view></router-view>

    
  </div>
</template>