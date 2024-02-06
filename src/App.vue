<template>
  <VaNavbar color="primary">
    <template #left>
      <VaNavbarItem class="navbar-item-slot">
        <VaIcon name="arrow_back" v-if="!isMain()" @click="goBack()"/>
      </VaNavbarItem>
    </template>
    <template #right>
      <VaNavbarItem class="navbar-item-slot clickable-item" @click="fetchGames()" v-if="isMain()">
        Fetch Games
      </VaNavbarItem>
      <VaNavbarItem class="navbar-item-slot clickable-item" @click="addToSteam()" v-if="isMain()">
        Add To Steam
      </VaNavbarItem>
      <VaNavbarItem class="navbar-item-slot clickable-item" @click="openSettings()" v-if="isMain()">
        Settings
      </VaNavbarItem>
    </template>
    <template #center>
      <VaNavbarItem class="navbar-item-slot">
        XCloud Condenser
      </VaNavbarItem>
    </template>
  </VaNavbar>
  <router-view ref="routerView" :key="$route.fullPath" style="margin-top: 50px;"/>
</template>

<script>
  import GamesList from './components/GamesList.vue';
  
  export default {
      data() {
        return {
          "selection" : {}
        }
      },
      name: "Xcloud Condenser",
      methods: {
        openSettings() {
          this.$router.push('/settings');
          window.scrollTo(0, 0);
        },

        goBack() {
          this.$router.go(-1);
          window.scrollTo(0, 0);
        },

        isMain() {
          return this.$route.path == "/"
        },

        addToSteam() {
          if (this.selection != undefined){
            let game = JSON.stringify(this.selection);
            this.$router.push({name: 'Add To Steam', query:{game}});
          }
          window.scrollTo(0, 0);
        },

        fetchGames() {
          this.emitter.emit("fetchGames");
        }
      },
      mounted() {
        this.emitter.on("gameSelected", (game) => {
          this.selection = game;
        })
      }
  }
</script>

<style>
  .va-navbar {
    position: fixed !important;
    top: 0 !important;
    width: 100% !important;
    z-index: 1000 !important; /* Ensure it's above other content */
  }
</style>