<template>
  <v-app id="inspire">
    <SideBar />
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col v-for="card in cards" :key="card" cols="12">
            <v-card>
              <v-subheader>{{ card }}</v-subheader>

              <v-list two-line>
                <template v-for="(data, index) in messages">
                  <v-list-item :key="index">
                    <v-list-item-avatar color="grey darken-1">
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
  async created() {
    this.user_id = this.$route.query.user_id;
    const chatRef = firebase.firestore().collection("chats");
    const snapshot = await chatRef.get();
    console.log(snapshot);
    snapshot.forEach((doc) => {
      this.messages.push(doc.data());
    });
  },
  data: () => ({
    messages: [],
    body: "",
    user_id: "",
    cards: ["Today"],
    drawer: null,
    links: [
      ["mdi-inbox-arrow-down", "Inbox"],
      ["mdi-send", "Send"],
      ["mdi-delete", "Trash"],
      ["mdi-alert-octagon", "Spam"],
    ],
    // invalid: false,
  }),
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
      this.messages.unshift({ message: this.body });
      this.body = "";
    },
  },
};
</script>
<style>
.message {
  text-align: left;
}
</style>
