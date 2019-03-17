<template>
  <div class="home">
      <h1>Welcome to the Cats Kingdom</h1>
      <el-table
                :data="tableData"
                height="250"
                style="width: 100%">
                  <el-table-column
                                    prop="date"
                                    label="Date"
                                    width="180">
                  </el-table-column>
                  <el-table-column>
                    <template slot-scope="scope">
                      <router-link :to="{ name: 'cat', params: { slug: scope.row.id } }">{{ scope.row.name }}</router-link>
                    </template>
                  </el-table-column>
                  <el-table-column
                                    prop="address"
                                    label="Address">
                  </el-table-column>
        </el-table>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data() {
    return {
      tableData: [{
        id: 1,
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, 
      {
        id: 2,
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }]
    }
  }
  //components: {
  //  HelloWorld
  //}
}
</script>
