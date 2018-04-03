 var loadAllItems=require('../src/items.js');
 var loadPromotions=require('../src/promotions.js');

function load_items(item_id){
  let all_items=loadAllItems();
  for(let item of all_items){
    if(item.id==item_id) return item;
  }
}
function bestCharge(selectedItems) {
  let str_result='';
  let str_items='============= 订餐明细 ============='+'\n';
  let str_promotion='-----------------------------------'+'\n'+'使用优惠:'+'\n';
  let str_summary='-----------------------------------'+'\n'+'总计：';
  let total_price=0;
  let promotion=0;
  let str_promotion1='满30减6元，省6元'+'\n';
  let str_promotion2='指定菜品半价('
  let load_promotion=loadPromotions();
  for(let item of selectedItems){
    let item_price=0;
    item=item.split('x');//菜品编号和数量
    //订餐明细
    let load_item=load_items(item[0].trim());
    let item_number= parseInt(item[1]);
    item_price=load_item.price * item_number;
    str_items=str_items+load_item.name+' '+'x'+' '+item_number
                +' = '+item_price+'元'+'\n';
    //总计
    total_price+=item_price;
    //优惠
    if(load_item.id==load_promotion[1].items[0] || load_item.id==load_promotion[1].items[1]){
      promotion+=item_price*0.5;
      str_promotion2+=load_item.name+'，'
    }
  }
  if(promotion>6){
    str_promotion=str_promotion+str_promotion2.substring(0,str_promotion2.length-1)+')，省'+promotion+'元'+'\n';
    total_price-=promotion;
  }else if(total_price>=30) {
    str_promotion+=str_promotion1;
    total_price-=6;
  }else{
    str_promotion='';
  }
  str_summary=str_summary+total_price+'元'+'\n'+'===================================';
  str_result=str_items+str_promotion+str_summary;
  //
  return str_result;
}

module.exports =bestCharge;
