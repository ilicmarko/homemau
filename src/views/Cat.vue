<template>
  <el-container class="content">
    <div v-if="catData">
      <el-row>
        <el-col :span="8" class="image_container" :class="{ pedigree: catData.pedigree }">
          <img :src="catData.image" :alt="catData.name" class="image"/>
        </el-col>
        <el-col :span="12">
          <el-header>
            <h1>{{ catData.name }}</h1>
            <em>{{ new Date(catData.dateOfBirth) | dateFormat('MM/YYYY') }}, {{ catData.breed }}</em>
          </el-header>        
          <p class="description">{{ catData.description }}</p>
        </el-col>
      </el-row>
    </div>
    <div v-else>
      <el-header>
        <h1>Cat loading...</h1>
      </el-header>
    </div>
  </el-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CatComponent',
  data() {
    return {
      catData: null
    }
  },
  mounted() {
    axios
      .get(`http://localhost:3000/cats/${this.$route.params.slug}`)
      .then(response => this.catData = response.data)
  }    
}
</script>

<style lang="scss" scoped>
  .content {
    margin: 30px;
  }

  .image_container {
    position: relative;
    line-height: 0;
    margin: 30px;

    border-radius: 10px;
    overflow: hidden;
  }

  .image {
    max-width: 100%;
  }

  .description {
    margin: 20px;
  }

  .pedigree::after { 
    position: absolute;
    top: 0;
    left: 0;
    
    height: 100%;
    width: 100%;
   
    content: "";
    background-image: linear-gradient(135deg, gold, transparent);
    opacity: 0.7;
    transition: opacity .3s ease-in-out;
  }

  .pedigree:hover::after {
    opacity: 0;
  }
</style>


