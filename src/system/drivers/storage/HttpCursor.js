
namespace `system.drivers.storage` (
    class HttpCursor extends Array{
        constructor (items, query, IRequestStorage){
            super();
            
            if(IRequestStorage){
                this.query=query;
                this.items = items;
                this.IRequestStorage=IRequestStorage;
            }
        }

        clear(){
            this.splice(0, this.length);
        }

        fill(res){
            if(res&&res.length){
                for(var i=0; i<=res.length-1;i++){
                    this[i] = res[i];
                }
            }
        }

        all(){
            return this;
        }

        sort(attrb, order){
            this.IRequestStorage.sort(this, attrb, order);
        }


        pagenumber(){
            return Math.round(this.query.skip / this.query.limit)+1;
        }

        totalpages(){
            return Math.round(this.total / this.query.limit)
        }

        async next(cb){
            return new Promise((resolve,reject) =>{
                if(this.pagenumber() >= this.totalpages()){
                    resolve(this);
                    return;
                }
                this.query.skip += this.query.limit;
                this.IRequestStorage.find((result, error)=>{
                    cb?cb(this, error) :
                    resolve(this, error);
                },this.query,this)
            })
        }

        async previous(cb){
            this.query.skip -= this.query.limit;
            this.query.skip = this.query.skip<=0?0:this.query.skip;
            return new Promise((resolve,reject) =>{
                this.IRequestStorage.find((result, error)=>{
                    cb?cb(result, error):resolve(result, error);
                },this.query,this)
            })
        }
    }
);
 