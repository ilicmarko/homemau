<template>
  <el-container class="content">
    <div v-if="catData">
      <el-row>
        <el-col :span="8" class="image_container" :class="{ pedigree: catData.pedigree }">
          <img :src="catImage" :alt="catData.name" class="image"/>
        </el-col>
        <el-col :span="12">
          <el-header>
            <h1>{{ catData.name }}</h1>
            <em>{{ new Date(catData.dateOfBirth) | dateFormat('MM/YYYY') }}, {{ catData.breed }}</em>
          </el-header>
          <p class="description" v-html="catData.description"></p>
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
import { HTTP } from '../api/'

export default {
  name: 'CatComponent',
  metaInfo() {
    return {
      title: this.meta.title,
      meta: [
        { name: 'description', content: this.meta.description },
        {
            property: 'og:title',
            content: this.meta.title,
            template: chunk => `${chunk} | ${process.env.VUE_APP_TITLE}`,
            vmid: 'og:title'
        },
        { name: 'og:description', content: this.meta.description },
        { name: 'og:image', content: this.meta.image },
        { name: 'twitter:card', content: 'summary'},
        { name: 'twitter:title', content: `${this.meta.title} | ${process.env.VUE_APP_TITLE}`},
        { name: 'twitter:description', content: this.meta.description},
        { name: 'twitter:image', content: this.meta.image },
      ]
    }
  },
  data() {
    return {
      meta: {
        title: 'Cat',
        description: 'This is a purrrrrrfect page to look at cats',
        image: `${process.env.BASE_URL}img/home.jpg`,
      },
      catData: null
    }
  },
  computed: {
    catImage() {
      return `${process.env.BASE_URL}img/cats/${this.catData.image}`
    },
  },
  mounted() {
    HTTP
      .get(`cats/${this.$route.params.slug}`)
      .then(response => {
        this.catData = response.data
        this.meta.title = this.catData.name
        this.meta.description = `${this.catData.description.substr(0, 120)}...`
        this.meta.image = this.catImage
      })
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


