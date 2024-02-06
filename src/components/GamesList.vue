<template>
    <VaDataTable :items="items" selectable selectMode="single"  @selectionChange="selectedGame($event)"/>
</template>

<script>
    import gamepassApiClient from '../services/GamepassApi.js';
    
    export default {
        data() {
            const items = [];

            return {
                items,
                "market" : "GB",
                "selectedGames" : [],
                "xccData" : {}
            };
        },
        methods : {
            getGames() {

                this.items = [];
                window.ipcRenderer.send("saveXCCData", []);
                gamepassApiClient.get(`/api/catalog.gamepass.com/sigls/v2?id=f6f1f99f-9b49-4ccd-b3bf-4d9767a77f5e&language=en-us&market=${this.market}`).then((response) => {
                    let gamepassGames = response.data;
                    gamepassGames.shift();
                    gamepassGames.forEach(element => {
                        this.getGameDetails(element.id);
                    }); 
                });
            },

            getGameDetails(gameId) {
                gamepassApiClient.get(`/api/displaycatalog.mp.microsoft.com/v7.0/products?bigIds=${gameId}&market=${this.market}&languages=en-us&MS-CV=DGU1mcuYo0WMMp`).then((response) => {
                    let product = response.data.Products[0];
                    let item = {
                        id : product.ProductId,
                        name : product.LocalizedProperties[0].ProductTitle,
                        developerName : product.LocalizedProperties[0].DeveloperName,
                        publisherName : product.LocalizedProperties[0].PublisherName,
                    }
                    this.items.push(item);
                    this.xccData.items = this.items;
                    window.ipcRenderer.send("saveXCCData", JSON.parse(JSON.stringify(this.xccData)));
                });
            },

            selectedGame({currentSelectedItems}){
                this.emitter.emit("gameSelected", currentSelectedItems[0]);
            }
        },
        mounted() {
            window.ipcRenderer.on("returnXCCData", (event, xccData) => {
                console.log("RECEIVED");
                this.xccData = xccData;
                this.items = xccData.items;
            });

            window.ipcRenderer.send("getXCCData");
            //this.items = getAll("games");
            this.emitter.on("fetchGames", () => {
                this.getGames();
            })
        }
    }
</script>