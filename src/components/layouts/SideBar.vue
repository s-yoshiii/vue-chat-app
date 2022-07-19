<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-sheet color="grey lighten-4" class="pa-4">
      <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>
      <div class="username">{{ auth && auth.displayName }}</div>
    </v-sheet>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="[icon, text, to] in links" :key="icon" link :to="to">
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import firebase from "@/firebase/firebase";
export default {
  mounted() {
    this.auth = JSON.parse(sessionStorage.getItem("user"));
  },
  data: () => ({
    drawer: null,
    links: [
      ["mdi-inbox-arrow-do7wn", "Inbox", "/"],
      ["mdi-send", "Send", "/about"],
      ["mdi-delete", "Trash", "/about"],
      ["mdi-alert-octagon", "Spam", "/about"],
    ],
  }),
  methods: {
    logout() {
      console.log("logout");
      firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.message = "ログアウトに成功しました";
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style lang="scss">
nav {
  a {
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.grey.darken-1 {
  background-color: #757575 !important;
  border-color: #757575 !important;
}
.v-list-item {
  font-weight: bold;
  color: #2c3e50;
  text-align: left;
}
.v-application .pa-4 {
  padding: 16px !important;
}
.username {
  padding-top: 10px;
}
</style>
