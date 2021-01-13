
slogan1() {  // 定义函数，从接口获取数据
    axios
    .get("/user/slogan/", this.slogan1)  // 接口地址为/user/slogan/
    .then((Response) => {
    //   console.log(Response.data.data);
        this.slogan = Response.data.data
    });
},