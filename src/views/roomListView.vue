<template>
  <v-app id="inspire">
    <SideBar />
    <v-app-bar app shrink-on-scroll>
      <v-toolbar-title>ルーム一覧</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col v-for="room in rooms" :key="room.id" cols="4">
            <router-link :to="{ path: '/chat', query: { room_id: room.id } }">
              <v-avatar size="128" color="grey lighten-2">
                <img :src="room.thumnailUrl" alt="" v-if="room.thumnailUrl" />
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                  v-if="!room.thumnailUrl"
                />{{ room.id }}
              </v-avatar>
              <!-- <v-avatar color="grey lighten-2" size="128"></v-avatar> -->
            </router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "@/components/layouts/SideBar";
import firebase from "@/firebase/firebase";
export default {
  components: {
    SideBar,
  },
  data: () => ({
    rooms: [],
  }),
  mounted() {
    this.getRooms();
  },
  methods: {
    async getRooms() {
      this.rooms = [];
      const roomRef = firebase.firestore().collection("rooms");
      const snapshot = await roomRef.get();
      snapshot.docs.map((doc) => {
        this.rooms.push(doc.data());
      });
    },
  },
};
</script>
