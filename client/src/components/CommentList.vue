<template>
<v-layout column pa-2>
    <h3>Add Comment</h3>
    <form @submit.prevent="$emit('addcomment', newComment)" >
        <v-textarea background-color="grey darken-2" v-model="newComment"></v-textarea>
        <v-btn type="submit" color="blue">Submit</v-btn>
    </form>
    <div v-if="!comments" class="subheading">There is no comment yet</div>
    <CommentCard v-for="comment in comments" :key="comment._id" :comment="comment"></CommentCard>
</v-layout>
</template>
<script>
import CommentCard from '@/components/CommentCard.vue'

export default {
    name: 'CommentList',
    components: {
        CommentCard,
    },
    props: ['comments'],
    data() {
        return {
            newComment: '',
        }
    },
    methods: {
    }
}
</script>
