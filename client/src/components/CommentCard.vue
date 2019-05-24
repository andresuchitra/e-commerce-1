<template>
  <v-layout row pa-2 mt-2>
      <v-avatar class="mr-2">
        <img style="background-color: white;" :src="image" alt="comment.author.firstname">
      </v-avatar>
      <v-layout wrap column justify-center>
          <div class="subheading font-weight-bold">{{ comment.content }}</div>
          <div class="caption font-weight-thin mt-3" color="grey">posted by: {{ comment.author.firstname+' at '+createdAt }}</div>
      </v-layout>
  </v-layout>
</template>
<script>
import moment from 'moment'
export default {
  name: "CommentCard",
  props: ["comment"],
  computed: {
      image() {
          if(!this.comment.author.image) {
              this.comment.author.image = 'https://storage.googleapis.com/miniwp.andresuchitra.com/img/user.png'
          }

          return this.comment.author.image
      },
      createdAt() {
          return moment(new Date(this.comment.created_at)).format('MMM DD, YYYY');
      }
  }
};
</script>
