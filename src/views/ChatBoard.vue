<template>
  <v-app id="inspire">
    <SideBar />
    <v-main>
      <h1>{{ room ? room.name : "" }}</h1>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col v-for="card in cards" :key="card" cols="12">
            <v-card>
              <v-subheader>{{ card }}</v-subheader>

              <v-list two-line>
                <template v-for="(data, index) in messages">
                  <v-list-item :key="index">
                    <v-list-item-avatar color="grey darken-1">
                      <v-img :src="data.photoURL"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-subtitle class="message">
                        {{ data.message }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider
                    v-if="n !== 6"
                    :key="`divider-${index}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-textarea
        class="mx-2"
        label="メッセージを入力する"
        rows="1"
        append-icon="mdi-comment"
        auto-grow
        v-model="body"
      ></v-textarea>
      <v-btn class="mr-4" type="submit" :disabled="invalid" @click="submit">
        submit
      </v-btn>
      <v-btn @click="clear"> clear </v-btn>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "@/firebase/firebase";
import SideBar from "@/components/layouts/SideBar";
export default {
  components: {
    SideBar,
  },
  data: () => ({
    messages: [],
    body: "",
    roomId: "",
    room: null,
    cards: ["Today"],
    drawer: null,
    links: [
      ["mdi-inbox-arrow-down", "Inbox"],
      ["mdi-send", "Send"],
      ["mdi-delete", "Trash"],
      ["mdi-alert-octagon", "Spam"],
    ],
    auth: null,
  }),
  async created() {
    this.roomId = this.$route.query.room_id;
    const roomRef = firebase.firestore().collection("rooms").doc(this.roomId);
    const roomDoc = await roomRef.get();
    if (!roomDoc.exists) {
      await this.$router.push("/");
    }
    this.room = roomDoc.data();
  },
  mounted() {
    this.auth = JSON.parse(sessionStorage.getItem("user"));
    const roomRef = firebase.firestore().collection("rooms").doc(this.roomId);
    roomRef
      .collection("messages")
      .orderBy("createdAt", "asc")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          this.messages.push(change.doc.data());
        });
      });
  },

  computed: {
    invalid() {
      if (!this.body) {
        return true;
      }
      return false;
    },
  },
  methods: {
    clear() {
      this.body = "";
    },
    submit() {
      const roomRef = firebase.firestore().collection("rooms").doc(this.roomId);
      roomRef
        .collection("messages")
        .add({
          message: this.body,
          name: this.auth.displayName,
          photoURL: this.auth.photoURL,
          createdAt: firebase.firestore.Timestamp.now(),
        })
        .then((result) => {
          console.log("success", result);
          this.body = "";
        })
        .catch((error) => {
          console.log("fail", error);
          alert("メッセージの送信に失敗しました。");
        });
    },
  },
};
</script>
<style>
.message {
  text-align: left;
}
</style>
