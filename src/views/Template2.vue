<template>
    <div>
        <div class="dh">
            <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
            >
                <el-form-item label="">
                    <el-input
                        v-model="formInline.name"
                        placeholder="输入宠物名可以查删改"
                    ></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="delSubmit"
                        >删除</el-button
                    >
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="upSubmit">修改</el-button>
                </el-form-item>

                <!-- 新增数据按钮 -->
                <el-button type="text" @click="dialog = true">新增</el-button>
            </el-form>

            <el-drawer
                title="宠 物 信 息 表"
                :before-close="handleClose"
                :visible.sync="dialog"
                custom-class="demo-drawer"
                ref="drawer"
            >
                <div class="demo-drawer__content">
                    <el-form :model="petsform">
                        <el-form-item
                            label="宠物名字"
                            :label-width="formLabelWidth"
                        >
                            <el-input
                                v-model="petsform.name"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>

                        <el-form-item
                            label="体重"
                            :label-width="formLabelWidth"
                        >
                            <el-input
                                v-model="petsform.weight"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>
                    </el-form>

                    <el-form :model="form">
                        <el-form-item
                            label="出生日期"
                            :label-width="formLabelWidth"
                        >
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="petsform.birthday"
                                value-format="yyyy-MM-dd"
                                style="width: 100%"
                            ></el-date-picker>
                        </el-form-item>

                        <el-form-item
                            label="品种"
                            :label-width="formLabelWidth"
                        >
                            <el-input
                                v-model="petsform.varieties"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>

                        <el-form-item
                            label="颜色"
                            :label-width="formLabelWidth"
                        >
                            <el-input
                                v-model="petsform.color"
                                autocomplete="off"
                            ></el-input>
                        </el-form-item>
                    </el-form>

                    <div class="demo-drawer__footer">
                        <el-button @click="cancelForm">取 消</el-button>
                        <el-button
                            type="primary"
                            @click="submit"
                            :loading="loading"
                            >{{ loading ? "提交中 ..." : "提 交" }}</el-button
                        >
                    </div>
                </div>
            </el-drawer>
        </div>

        <el-table class="table" :data="tableData">
            <el-table-column prop="name" label="Name"> </el-table-column>

            <el-table-column prop="weight" label="Weight"> </el-table-column>

            <el-table-column prop="birthday" label="Birthday">
            </el-table-column>

            <el-table-column prop="varieties" label="Varieties">
            </el-table-column>

            <el-table-column prop="color" label="Color"> </el-table-column>
        </el-table>
        <div class="pagination">
            <!-- 分页功能 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                layout="total, sizes, prev, pager, next, jumper"
            >
            </el-pagination>
        </div>
    </div>
</template>


<script>
export default {
    // 设置头部标题都可以用 document.title，这个是通用的，我也可以这样设置，如下
    page() {
        document.title = "个人中心";
    },

    data() {
        return {
            // 分页
            currentPage: 1,

            formInline: {
                name: "",
            },

            // 宠物表单
            petsform: {
                name: "",
                weight: "",
                birthday: "",
                varieties: "",
                color: "",
            },

            tableData: [],
            dialog: false,
            loading: false,
            gridData: [],
            form: {
                name: "",
                delivery: false,
                type: [],
                resource: "",
                desc: "",
            },
            formLabelWidth: "80px",
            timer: null,
        };
    },
    created() {
        this.getdata();
    },

    methods: {
        //分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            var self = this;
            // console.log(`${val}`);
            const res = this.$http
                .get("/pets/", { params: { page: `${val}` } })
                .catch((e) => {
                    return { data: { code: "404" } };
                })
                .then(function (Response) {
                    // console.log(Response)
                    if (Response.status == 200) {
                        var res = Response.data.results;

                        for (var a = 0; a < res.length; a += 1) {
                            //typeof 类型(参数)
                            res[a]["weight"] = res[a]["weight"] + " / KG";
                        }
                        self.tableData = res;
                    }
                    if (Response.data.code == 404) {
                        self.$message({ message: "页码不存在", type: "error" });
                    }
                });
        },

        open1() {
            this.$message({
                message: "数据已创建",
                type: "success",
            });
        },

        // 查询
        onSubmit() {
            
            const res = this.$http
                .get("/pets/" + this.formInline.name) // 请求userdata/{参数}接口  this.formInline:{usernmae}

                .then((res) => {
                    // 数据显示到盒子
                    var res1 = res.data;
                    res.tableData = res1;
                    this.tableData = [res1];
                    console.log(self.tableData);

                    // 数据不存在弹框
                    if (res.data.code == 404)
                        this.$message({
                            message: this.formInline.name + ": 不存在",
                            type: "error",
                        });
                    
                })
                .catch((e) => {
                    return { data: { code: "404" } };
                })
        },

        delSubmit() {
            const res = this.$http
                .delete("/pets/" + this.formInline.name)
                .catch((e) => {
                    return { data: { code: "404" } };
                })
                .then((res) => {
                    //   console.log(res.request.status)

                    if (res.data.code == 404)
                        this.$message({
                            message: this.formInline.name + ": 不存在",
                            type: "error",
                        });

                    if (res.request.status == 204)
                        this.$message({
                            message: this.formInline.name + ": 已被删除",
                            type: "success",
                        });
                });
            window.location.reload();
        },

        upSubmit() {
            const { data: res } = this.$http
                .put("/pets/" + this.formInline.name) // 请求userdata/{参数}接口  this.formInline:{usernmae}
                .then(() => {
                    alert("敬请期待！");
                });
        },

        submit() {
            const { data: res } = this.$http
                .post("/pets/", this.petsform)
                .then(() => {
                    this.$refs.drawer.closeDrawer();
                    this.getdata();
                    this.$message({
                        message: "数据已创建",
                        type: "success",
                    });
                });
        },

        handleClose(done) {
            this.dialog = false;
            this.loading = false;
        },

        cancelForm() {
            this.loading = false;
            this.dialog = false;
            clearTimeout(this.timer);
        },

        getdata() {
            var self = this;
            this.$http.get("/pets/").then(function (Response) {
                var res = Response.data.results;

                for (var a = 0; a < res.length; a += 1) {
                    //typeof 类型(参数)
                    res[a]["weight"] = res[a]["weight"] + " / KG";
                }
                self.tableData = res;
            });
        },
    },
};
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

.el-input {
    padding-left: 50px;
}

.pagination {
    text-align: end;
}
</style>

<style lang="less">
.el-drawer__header {
    font-size: 28px;
    color: #000;
    font-weight: bold;
}

.el-input .el-input__inner {
    color: black;
    width: 100%;
}

.el-form-item__label {
    color: black;
    font-weight: bold;
}

.el-table::before {
    height: 0;
}

.el-table th,
.el-table tr {
    background: transparent;
    border: none;
    color: black;
    font-weight: bold;
    font-size: 15px;
}

.el-button--text,
.el-button--text.is-disabled,
.el-button--text.is-disabled:focus,
.el-button--text.is-disabled:hover,
.el-button--text:active {
    border-color: blue;
    width: 100px;
    font-size: 15px;
    font-weight: bold;
}

.el-button--primary {
    background: 0 0;
    width: 100px;
    color: #409eff;
}
</style>