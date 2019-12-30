<template>
    <div id="app" v-cloak>
        <router-view/>
    </div>
</template>

<style lang="scss">
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html, body, .container, #app {
        height: 100%;
    }

    [v-cloak] {
        display: none;

    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }

    .w-100 {
        width: 100%;
    }

    .h-100 {
        height: 100%;
    }

    .t-l {
        text-align: left;
    }

    .t-r {
        text-align: right;
    }

    .t-c {
        text-align: center;
    }


</style>
