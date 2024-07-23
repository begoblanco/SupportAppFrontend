<template>
  <div class="container mt-4">
    <h1>Welcome to SuperSupport!</h1>
    <div class="row mt-4">
      <!-- review card -->
      <div class="col-lg-3 mb-3">
        <div id="cardreview" class="card no-border">
          <div class="card-header bg-dark text-light text-light">
            <h5 id="reviewtitle" class="card-title">Reviews</h5>
          </div>
          <div class="card-body" style="max-height: 700px; overflow-y: auto;">
            <div v-for="comment in comments" :key="comment.id" class="card mb-3">
              <div id="reviews" class="card-body no-border">
                <h6 class="card-subtitle mb-2 text-muted">{{ comment.author }}</h6>
                <p class="card-text">{{ comment.content }}</p>
              </div>
            </div>
          </div>          
        </div>
      </div>

      <!-- cat card -->
      <div class="col-lg-8 mb-3">
        <div id="card1" class="card mb-3 no-border">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="./images/animal_chara_computer_neko.png" class="img-fluid rounded-start" alt="gato" />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h3 class="card-title">Need help?</h3>
                <p class="card-text">
                  Welcome to the best support app in the world! Our army of kittens is here to help you anytime!
                </p>
              </div>
            </div>
          </div>
        </div>

         <!-- cat card 3 -->
         <div id="card3" class="card mb-3 no-border">
              <div class="card-body text-center" >
                <img
                  src="./images/akubi_cat.png"
                  class="img-fluid"
                  alt="cat"
                  style="max-height: 165px;"
                />
              </div>
            </div>

        <!-- cat card 2 -->
        <div id="card2" class="card mb-3 no-border">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="./images/shigoto_zaitaku_cat_woman.png" class="img-fluid rounded-start" alt="cat" />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h3 class="card-title">About Us</h3>
                <p class="card-text">
                  tydbnatydbfawybndsadhvsasdfvuayfbsndafcsiuyyatcvsdsauyfcvausycfvvuaysfvaysdf..,ljdfh,,,56oeojtieoo
                </p>
                <p class="card-text">
                  Sorry, seems like a cat fell asleep on our keyboard!!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';

const comments = ref([
  { id: 1, author: 'Miku', content: 'Great service! I love everything about this app.' },
  { id: 2, author: 'IAmNotACat', content: 'Meow Meow! Meow... meow meow!!!' },
  { id: 3, author: 'Markiplier', content: 'The kittens fixed my issue in no time. Highly recommended!' },
  { id: 4, author: 'Anon', content: 'I hate minions' },
  { id: 5, author: 'GamerGirlRawr', content: 'Best support app in the world' },
  { id: 6, author: 'CatLover', content: 'Cats. I like cats. Cats are the best.' },
  { id: 7, author: 'SonicFan', content: 'I can´t believe I have lived without this app. Crazy stuff bro' },
  { id: 8, author: 'xxKawaiiAngelxx', content: 'uwu' },
  { id: 7, author: 'MinecraftProPlayer420', content: 'nanana tremendo' }



]);
</script>

<style lang="scss" scoped>

h1{
  text-align: center;
  color: #f6e9e9;
 }

#card1, #card2, #card3, #cardreview{
  background-color: #635d5d;
  border-radius: 10px;
  color: #f6e9e9;
}

#reviews{
  background-color: #f6e9e9;
  border-radius: 10px;
}

#reviewtitle{
  color: #f6e9e9;
}

.no-border{
  border: none;
  box-shadow: none;
}
</style>
