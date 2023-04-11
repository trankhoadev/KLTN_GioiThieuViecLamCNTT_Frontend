<template>
  <div>
    <q-item style="max-width: 420px" v-for="msg in messages" :key="msg.id" clickable v-ripple>
      <q-item-section avatar>
        <q-avatar>
          <img :src="msg.avatar">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ msg.name }}</q-item-label>
        <q-item-label caption lines="1">{{ msg.msg }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        {{ msg.time }}
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: "MessagesComponent",
  setup() {
    return {
      messages: [
        {
          id: 5,
          name: 'Tran Anh Khoa',
          msg: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati, consequatur incidunt amet minima voluptatum est commodi quae architecto alias voluptates aliquid illo sunt magnam! Rem harum eum perferendis aspernatur totam?',
          avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=400&v=4',
          time: '10:42 PM'
        }, {
          id: 6,
          name: 'Yonnonnn',
          msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
            '            weekend. Do you want to grab brunch?',
          avatar: 'https://cdn.quasar.dev/img/avatar6.jpg',
          time: '11:17 AM'
        }, {
          id: 1,
          name: 'Tran Anh Khoa',
          msg: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati, consequatur incidunt amet minima voluptatum est commodi quae architecto alias voluptates aliquid illo sunt magnam! Rem harum eum perferendis aspernatur totam?',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          time: '5:17 AM'
        }, {
          id: 2,
          name: '言堂',
          msg: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati, consequatur incidunt amet minima voluptatum est commodi quae architecto alias voluptates aliquid illo sunt magnam! Rem harum eum perferendis aspernatur totam?',
          avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
          time: '5:17 AM'
        }, {
          id: 3,
          name: 'Yonnon',
          msg: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati, consequatur incidunt amet minima voluptatum est commodi quae architecto alias voluptates aliquid illo sunt magnam! Rem harum eum perferendis aspernatur totam?',
          avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg',
          time: '5:17 AM'
        }
      ],
    }
  }
})
</script>

<style scoped></style>
