const sleep=(TimeRanges)=>{
    return new Promise(res=>{
        setTimeout(() => {
            res()
        }, TimeRanges);
    })
}
const Init=async ()=>{
    let ID=document.getElementById('tag')?document.getElementById('tag').value:''
    if(!ID){
        alert('广告ID不能为空')
        return
    }
    if(ID.includes(',')){
        ID=ID.split(',')
        for(let i=0;i<ID.length;i++){
            pintrk('load', ID[i], {em: '<user_email_address>'});
            pintrk('page');
            await sleep(2000)
        }
    }else{
        pintrk('load', ID, {em: '<user_email_address>'});
        pintrk('page');
        alert('加载完成')
    }
}
const Start=async()=>{
    let checkout=document.querySelector('[name="checkout"]').checked
    let addtocart=document.querySelector('[name="addtocart"]').checked
    let pagevisit=document.querySelector('[name="pagevisit"]').checked
    let signup=document.querySelector('[name="signup"]').checked
    let search=document.querySelector('[name="search"]').checked
    let init=document.querySelector('[name="init"]').checked
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const num=document.getElementById("num")
    const Oncheckout=()=>{
        function generateRandomString() {
            var chars = 'abcdefghijklmnopqrstuvwxyz';
            var result = '';
            for (var i = 0; i < 6; i++) {
                var randomIndex = Math.floor(Math.random() * chars.length);
                result += chars.charAt(randomIndex);
            }
            return result;
        }
        pintrk('track', 'checkout', {
            value: getRandomInt(100, 1000),
            order_quantity: 1,
            currency: 'USD',
            order_id: 'X-'+getRandomInt(10000, 900000),
            property: 'Athleta',
            search_query: 'boots',
            line_items: [
                {
                    product_name: 'Barker '+generateRandomString(),
                    product_id: getRandomInt(100, 2000),
                    product_category: 'Shoes',
                    product_variant_id: '1414-Red',
                    product_variant: ['Red','Yellow','Blue','Green'][getRandomInt(0, 3)],
                    product_price: getRandomInt(50, 200),
                    product_quantity: 1,
                    product_brand: 'Barker'
                }
            ]
        });
    }

    const Onaddtocart=()=>{
        pintrk('track', 'addtocart', {
            value: getRandomInt(100, 1000),
            order_quantity: 1,
            currency: 'USD',
            order_id: 'X-'+getRandomInt(10000, 900000),
            line_items: [
                {
                    product_id: getRandomInt(100, 2000),
                    product_price:getRandomInt(50, 200)
                }
            ]
        });
    }
    for(let i=0;i<100;i++){
        if(init){
            pintrk('page');
            await sleep((getRandomInt(5, 10)+'00')*1)
        }
        if(search){
            pintrk('track', 'search', {
                search_query: ['boots','clothing','implement','quilt','Kitchenware'][getRandomInt(0, 4)]
            });
            await sleep((getRandomInt(5, 10)+'00')*1)
        }
        if(pagevisit){
            pintrk('track', 'pagevisit', {
                property: 'Athleta'
            });
            await sleep((getRandomInt(5, 10)+'00')*1)
        }
        if(signup){
            pintrk('track', 'signup', {
                lead_type: 'Newsletter'
            });
            await sleep((getRandomInt(5, 10)+'00')*1)
        }
        if(addtocart){
            Onaddtocart()
            await sleep((getRandomInt(5, 10)+'00')*1)
        }
        if(checkout){
            Oncheckout()
            await sleep((getRandomInt(5, 10)+'00')*1)
        }
        num.innerText=`${i}/100次`
        await sleep((getRandomInt(5, 10)+'000')*1)
    }
    alert('执行完成')
}