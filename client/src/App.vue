<template>
  <v-app dark>
    <v-navigation-drawer fixed temporary v-model="drawer" app class="navDrawer">
      <v-list class="pa-1" v-if="isLogin">
        <v-list-tile to="/user" avatar tag="div">
          <v-list-tile-avatar>
            <img :src="userPic">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{user.firstname + ' ' + user.lastname}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider light></v-divider>
        <v-list-tile to="/">
          <!-- Home -->
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- Public Products Page -->
        <v-list-tile v-if="!isLogin" to="/products">
          <v-list-tile-action>
            <v-icon>assignment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Explore Products</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- Products -->
        <v-list-group prepend-icon="assignment" v-if="isLogin" value="true">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Products</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <v-list-tile v-if="$store.state.user" class="ml-4" to="/products">
            <v-list-tile-action>
              <v-icon>assignment</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Products List</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-if="$store.state.user && $store.state.user.role ==='admin'"
            class="ml-4"
            to="/addproduct"
          >
            <v-list-tile-action>
              <v-icon>add</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Add Product</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile
          v-if="$store.state.user && $store.state.user.role ==='admin'"
          to="/transactions"
        >
          <v-list-tile-action>
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>All Transactions</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- Products -->
        <v-list-tile to="/cart" v-if="isLogin">
          <v-list-tile-action>
            <v-icon>shopping_cart</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Cart</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app dense class="topNav">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <a href="/" class="navtitle">BUKUBERKAH | &nbsp;</a>
      </v-toolbar-title>
      <span class="text-truncate">Pusat Buku Islam</span>
      <v-spacer/>
      <v-text-field
        class="mr-2"
        placeholder="Cari Buku"
        prepend-inner-icon="search"
        clear-icon="close"
        clearable
        solo
        v-model="searchKey"
        @change="search"
      ></v-text-field>
      <v-toolbar-items v-if="!isLogin">
        <v-btn flat to="/register">Register</v-btn>
        <v-btn light to="/login" color="yellow">Login</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else>
        <v-btn flat to="/user" class="navtitle">
          <v-avatar>
            <img :src="userPic" :alt="user.firstname">
          </v-avatar>
          &nbsp;{{userDisplayName}}
        </v-btn>
        <v-btn to="/cart" v-if="itemsInCart > 0">
          <v-badge right overlap class="black--text" color="red">
            <template v-slot:badge>
              <span>{{ itemsInCart }}</span>
            </template>
            <v-icon color="grey lighten-1">shopping_cart</v-icon>
          </v-badge>
        </v-btn>
        <v-btn color="yellow" light @click="signOut">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content class="viewport">
      <router-view :user="user"/>
      
    </v-content>
    <v-footer height="auto">
      <v-card flat class="text-xs-center screenwidth">
        <v-card-text
          class="white--text pt-3"
        >
          BukuBerkah adalah situs e-commerce yang menyajikan buku-buku Islam Pilihan. Beragam topik tersedia di website ini, mulai dari Aqidah, Tafsir, hingga berbagai macam pilihan mushaf Al-Quran <br/>
          Mari meningkatkan ilmu keislaman Anda dengan membaca buku-buku Islam
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="white--text">
          <strong>&copy;2019 — Andre Suchitra</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import api from "./api/backend.js";
import { mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {
      drawer: false,
      searchKey: ""
    };
  },
  computed: {
    itemsInCart() {
      if (this.isLogin) {
        if (this.cart && this.cart.items.length > 0) {
          return this.cart.items.length;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    },
    userPic() {
      if (this.user && this.user.image) {
        return this.user.image;
      } else {
        return require("./assets/logo.png");
      }
    },
    userDisplayName() {
      if (this.user.firstname) {
        return this.user.firstname;
      } else if (this.user.lastname) {
        return this.user.lastname;
      } else {
        return "default_user";
      }
    },
    ...mapState(["isLogin", "user", "cart"])
  },
  mounted() {
    const token = localStorage.getItem("ecomm_token");
    if (token) {
      this.getUserData();
      this.$store.dispatch("getCurrentCart");
    }

    if (window.gapi) {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({ client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID });
      });
    }
  },
  methods: {
    search(evt) {
      this.$store.dispatch("searchProducts", evt);
    },
    getUserData() {
      api
        .get("/auth/user/", {
          headers: { Authorization: localStorage.getItem("ecomm_token") }
        })
        .then(({ data }) => {
          this.$store.commit("setIsLogin", true);
          this.$store.commit("setUser", data);
          this.$store.dispatch("getCurrentCart");
        })
        .catch(({ response }) => {
          swal.fire("Error", response.data, "error");
        });
    },
    processSignOut() {
      localStorage.removeItem("ecomm_token");
      this.$store.commit("setIsLogin", false);
      this.$store.commit("setUser", null);
      this.$router.push("/");
      swal.fire("Success", "Bye!", "success");
    },
    signOut() {
      var auth2;
      const self = this;

      if (gapi) {
        auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function() {
          self.processSignOut();
        })
        .catch(e => {
          swal.fire("Error", e, "error")
        });
      }
    },
  },
};
</script>

<style scoped>
.newanchor {
  color: #fff000;
}
.navtitle {
  color: white;
}
.navtitle:link {
  text-decoration: none;
}
.navtitle:visited {
  text-decoration: none;
}

.navSearch {
  font-size: 1em;
}

.topNav {
  z-index: 8;
}
.navDrawer {
  z-index: 10;
}

.viewport {
  min-height: 100vh;
}
.screenwidth {
  width: 100%;
  min-width: 100%;
}

</style>
