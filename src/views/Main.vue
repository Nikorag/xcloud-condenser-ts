<template>
    <GamesList ref="gamesList"></GamesList>
</template>
  
<script>
import GamesList from '../components/GamesList.vue';

export default {
    components : {
        GamesList
    },

    methods : {
        fetchGames() {
            this.$refs.gamesList.fetchGames();
        }
    }
}
</script>