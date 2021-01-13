  <template>
    <el-table
	  class="table"
      :data="tableData"
      >

      <el-table-column
        prop="name"
        label="Name">
      </el-table-column>

	  <el-table-column
        prop="weight"
        label="Weight">
	  </el-table-column>

	  <el-table-column
        prop="birthday"
        label="Birthday">
      </el-table-column>

	  <el-table-column
        prop="varieties"
        label="Varieties">
      </el-table-column>

	  <el-table-column
        prop="color"
        label="Color">
      </el-table-column>

    </el-table>

  </template>


    <script>
    export default {
      data() {
        return {
          tableData: [{
            name: 'i7',
			weight: '11',
            birthday: '2020-02-29',
			varieties: '英短',
			color: '黑色'
          }, 
		  {
            name: 'i7',
			weight: '11',
            birthday: '2020-02-29',
			varieties: '英短',
			color: '黑色'
          },]
        }
      }
    }
  </script>


<style lang="less" scoped>
.el-table {
// 弹性盒子  display: -webkit-flex;  display: flex;  flex-direction: column;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  outline: none;
  background: transparent;
  border: none;
}


</style>

<style lang="less">
 .el-table::before {
	  height: 0;
}

.el-table th, .el-table tr {
  background: transparent;
  border: none;
  color: black;
  font-weight: bold;
  font-size: 15px;
}

</style>