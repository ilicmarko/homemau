<template>
  <el-container>
    <el-header>
      <h1>Welcome to the Cats Kingdom</h1>
    </el-header>
    <el-main>
      <el-table :data="tableData">
        <el-table-column label="Name">
          <template slot-scope="scope">
            <router-link :to="{ name: 'cat', params: { slug: scope.row.slug } }">{{ scope.row.name }}</router-link>
          </template>
        </el-table-column>
        <el-table-column label="Birthday" width="180">
          <template slot-scope="scope">
            {{ new Date(scope.row.dateOfBirth) | dateFormat('MM/YYYY') }}
          </template>
        </el-table-column>
        <el-table-column prop="breed" label="Breed"/>
        <el-table-column prop="pedigree" label="Pedigree">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.pedigree" type="success">Yes</el-tag>
            <el-tag v-else type="warning">No</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'


export default {
  name: 'home',
  metaInfo() {
    return {
      title: this.meta.title,
      meta: [
        { name: 'description', content: this.meta.description },
        {
            property: 'og:title',
            content: this.meta.title,
            template: chunk => `${chunk} - HomeMau`,
            vmid: 'og:title'
        },
        { name: 'og:description', content: this.meta.description },
        { name: 'og:image', content: this.meta.image },
      ]
    }
  },
  data() {
    return {
      meta: {
        title: 'Home',
        description: 'This is a purrrrrrfect page to look at cats',
        image: `${process.env.BASE_URL}img/home.jpg`,
      },
      tableData: []
    }
  },
  mounted() {
    axios
      .get('http://localhost:3000/cats')
      .then(response => this.tableData = response.data.data)
  }
}
</script>