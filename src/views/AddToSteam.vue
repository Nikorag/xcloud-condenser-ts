<template>
    <div class="add_to_steam">
        <div class="hero_banner">
            <img class="hero" v-bind:src="hero"/>
            <img class="logo" v-bind:src="logo"/>
            <div class="actions">
                <button class="add_to_steam_button clickable-item"><VaIcon name="add" style="font-size: 32px; height: 24px;"/>Add To Steam</button>
                <div class="game_details">
                    <span class="developer_name">{{ game.developerName }}</span>
                    <span class="publisher_name">{{ game.publisherName }}</span>
                </div>
            </div>
        </div>
        <div class="content">
            <img class="portrait" v-bind:src="portrait"/>
            <img class="landscape" v-bind:src="landscape"/>
        </div>
    </div>
</template>

<script>
    import { getGameId, getHero, getLogo, getPortrait, getLandscape } from '../services/SGDBApi.js';

    export default {
        data() {
            return {
                "game" : {},
                "hero" : "",
                "logo" : "",
                "portrait" : "",
                "landscape" : ""
            }
        },
        mounted() {
            this.game = JSON.parse(this.$route.query.game);
            getGameId(this.game.name).then((gameId) => {
                getHero(gameId).then((hero) => {
                this.hero = hero;
                })
                getLogo(gameId).then((logo) => {
                    this.logo = logo;
                })
                getPortrait(gameId).then((portrait) => {
                    this.portrait = portrait;
                })
                getLandscape(gameId).then((landscape) => {
                    this.landscape = landscape;
                })
            })
        }
    }
</script>

<style>
    .hero_banner {
        width: 100%;
        height: 260px;
        position: relative; /* Add this line */
    }
    body {
        background-color: rgb(48,47,52);
    }
    .hero {
        width: 100%;
        position: absolute;
    }
    .logo {
        position: relative;
        width: 30%;
        left: 20px;
        top: 20px;
    }
    .actions {
        position: absolute; /* Change this line */
        width: 100%;
        height: 70px;
        bottom: 0; /* Add this line */
        background: rgba(0,0,0,0.5);
    }
    .add_to_steam_button {
        display: inline-block;
        margin-top: 10px;
        margin-left: 41px;
        height: 50px;
        width: 200px;
        color: white;
        background: rgb(62,192,63);
        background: linear-gradient(90deg, rgba(62,192,63,1) 0%, rgba(32,158,83,1) 100%);
        border: 0px;
        font-size: 25px;
    }
    .game_details {
        float: right;
        display: inline-block;
        height: 70px;
        line-height: 70px;
    }
    .game_details span {
        margin: 0px 20px;
    }
    .content {
        width: 100%;
    }
    .portrait {
        width: 130px;
        margin: 30px;
        display: inline-block;
    }
    .landscape {
        height: 130px;
        margin: 30px;
        display: inline-block;
    }
</style>