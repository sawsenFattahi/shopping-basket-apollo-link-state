import gql from 'graphql-tag';

import client from './apollo';

export default {
  Mutation: {
    addMonster: (_, { monsterToAdd, isRemove, isClean }, { cache }) => {
      const query = gql`
        query GetMonsters {
          monsterList @client {
            monster{
              id,
              title,
              stock,
              price,
              image,
              content,
              quantity
            }
          }
          totalPrice @client 
        }
      `;

      const currentMonsters = client.readQuery({ query });
 
      let index = -1;
        currentMonsters.monsterList.map((item, key )=> {
          if(item.monster.id === monsterToAdd.id){
            isRemove ? currentMonsters.monsterList[key].monster.quantity -- : currentMonsters.monsterList[key].monster.quantity ++;
            index = key;
          }
          return true;
        }
      );

      const updatedCurrentMonsters = currentMonsters.monsterList.filter(item => item.monster.quantity >0);
      let data;
      if(isClean){
        data = {
          monsterList: [],
          totalPrice: 0,
        };
      }
      else if(index<0){
        const updatedMonster = Object.assign({},monsterToAdd, { quantity: 1 });
        const newMonster = {
        id: updatedMonster.id,
        monster: updatedMonster,
        generated: false,
        __typename: 'monsterItem',
      };

      data = {
          monsterList: currentMonsters.monsterList.concat(newMonster),
          totalPrice: currentMonsters.totalPrice + monsterToAdd.price,
          
        };        
      }

      else{
        data = {
          monsterList: updatedCurrentMonsters,
          totalPrice: currentMonsters.totalPrice + monsterToAdd.price,
        };
      }
      
      cache.writeData({ data });;
    },
  },
};