class APIFunctionality{
    constructor(query,queryStr){
        this.query=query,
        this.queryStr=queryStr
    }
    // method-- serach
    search(){
       const keyword = this.queryStr.keyword
            ? {
                  name: {
                      $regex: this.queryStr.keyword,
                      $options: "i"
                  }
              }
            : {};
            // console.log(keyword);
            this.query=this.query.find({...keyword});
            return this;
        }

        // filter
        filter(){
            const queryCopy={...this.queryStr};
            // console.log(queryCopy);
            const removeFields=["keyword","page","limit"];
            removeFields.forEach(key=>delete queryCopy[key])
            // console.log(queryCopy);
            this.query=this.query.find(queryCopy);
            return this;
        }

        pagination(resultPerPage){
            // console.log(resultPerPage);
            const currentPage=Number(this.queryStr.page ||1)
            // console.log(typeof currentPage);

            const skip= resultPerPage*(currentPage-1);
            // eg:-- cp=3 rp=10  10*(3-1)=>10*2==20
            this.query=this.query.limit(resultPerPage).skip(skip);
            return this
            
            
        }
}

export default APIFunctionality