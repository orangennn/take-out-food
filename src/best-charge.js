 // var loadAllItems=require('../src/items.js');
 // var loadPromotions=require('../src/promotions.js');

//判断菜品在items中的下标
// function load_items(item_id){
//   let all_items=loadAllItems();
//   for(let item of all_items){
//     if(item.id==item_id) return item;
//   }
// }

//规范菜品格式(id,number,name,price)
function normalize_items(selectedItems){
  let normal_items=[];
  for(let item of selectedItems){
      let normal_item={};
      normal_item.id=item.split('x')[0].trim();
      normal_item.number=parseInt(item.split('x')[1]);
      for(let item of loadAllItems()){
        if(item.id==normal_item.id){
          normal_item.name=item.name;
          normal_item.price=item.price*normal_item.number;
          break;
        }
      }
      normal_items.push(normal_item);
  }
  return normal_items;
}
//优惠方式2计算 (type,itemName,subprice,total_price)
function promotion_2(normal_items){
  let promotion2={};
  let load_promotions=loadPromotions();
  promotion2.type=load_promotions[1].type;
  promotion2.itemNames=[];
  promotion2.subprice=0;
  for(let item of normal_items ){
    for(let promotion_item of load_promotions[1].items){
      if(item.id==promotion_item){
        promotion2.itemNames.push(item.name);
        promotion2.subprice+=item.price*0.5;
      }
    }
  }
  return promotion2;
}
//优惠方式选取和计价
function select_promotion(normal_items,promotion2){
  let total_price=0;
  let load_promotions=loadPromotions();
  for(let item of normal_items){
    total_price+=item.price;
  }
  let promotion={};
  if(promotion2.subprice>6){
    promotion=promotion2;
    promotion.total_price=total_price-promotion2.subprice;
  }else if(total_price>=30){
    promotion.type=load_promotions[0].type;
    promotion.subprice=6;
    promotion.total_price=total_price-6;
  }else{
    promotion.type=NaN;
    promotion.total_price=total_price;
  }
  return promotion;
}
//打印结果
function print_result(normal_items,promotion){
  //打印明细
  let str_result='============= 订餐明细 =============\n';
  for(let item of normal_items){
    str_result+=`${item.name} x ${item.number} = ${item.price}元\n`;
  }
  str_result+='-----------------------------------\n';
  //打印优惠
  if(promotion.type){
    str_result+=`使用优惠:\n${promotion.type}`;
    if(promotion.itemNames){
      str_result+='(';
      for(let name of promotion.itemNames){
        str_result+=`${name}，`;
      }
    str_result=str_result.substring(0,str_result.length-1);
    str_result+=')';
    }
    str_result+=`，省${promotion.subprice}元\n`;
    str_result+='-----------------------------------\n';
  }
  //打印总计
  str_result+=`总计：${promotion.total_price}元\n`;
  str_result+='==================================='
  return str_result;
}
function bestCharge(selectedItems){
    let normal_items=normalize_items(selectedItems);
    let promotion2=promotion_2(normal_items);
    let promotion=select_promotion(normal_items,promotion2);
    return print_result(normal_items,promotion);
}
// function bestCharge(selectedItems) {
//   let str_result='';
//   let str_items='============= 订餐明细 ============='+'\n';
//   let str_promotion='-----------------------------------'+'\n'+'使用优惠:'+'\n';
//   let str_summary='-----------------------------------'+'\n'+'总计：';
//   let total_price=0;
//   let promotion=0;
//   let str_promotion1='满30减6元，省6元'+'\n';
//   let str_promotion2='指定菜品半价('
//   let load_promotion=loadPromotions();
//   for(let item of selectedItems){
//     let item_price=0;
//     item=item.split('x');//菜品编号和数量
//     //订餐明细
//     let load_item=load_items(item[0].trim());
//     let item_number= parseInt(item[1]);
//     item_price=load_item.price * item_number;
//     str_items=str_items+load_item.name+' '+'x'+' '+item_number
//                 +' = '+item_price+'元'+'\n';
//     //总计
//     total_price+=item_price;
//     //优惠
//     if(load_item.id==load_promotion[1].items[0] || load_item.id==load_promotion[1].items[1]){
//       promotion+=item_price*0.5;
//       str_promotion2+=load_item.name+'，'
//     }
//   }
//   if(promotion>6){
//     str_promotion=str_promotion+str_promotion2.substring(0,str_promotion2.length-1)+')，省'+promotion+'元'+'\n';
//     total_price-=promotion;
//   }else if(total_price>=30) {
//     str_promotion+=str_promotion1;
//     total_price-=6;
//   }else{
//     str_promotion='';
//   }
//   str_summary=str_summary+total_price+'元'+'\n'+'===================================';
//   str_result=str_items+str_promotion+str_summary;
//   //
//   return str_result;
// }

// module.exports =bestCharge;
