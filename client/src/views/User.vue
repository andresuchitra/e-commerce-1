<template>
  <v-container fluid fill-height>
    <v-layout column align-start>
      <v-tabs dark slider-color="yellow" class="mb-5">
        <v-tab ripple to="/user/profile">User Profile</v-tab>
        <v-tab ripple to="/user/transactions">Transactions</v-tab>
      </v-tabs>
      <router-view class="full-width"/>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState } from 'vuex';

export default {
  props: ['user', 'selected'],
  mounted() {
    if (!this.$props.user && !this.isLogin) {
      this.$router.push('/login');
    }
  },
  computed: {
    ...mapState(['isLogin']),
  },
};
</script>
<style scoped>
.full-width {
    width: 100%;
}
</style>


