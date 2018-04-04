import React, { Component } from 'react';
import { Grid, Button, Segment, Sidebar, Menu, Header, Label  } from 'semantic-ui-react';
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { get, cloneDeep } from "lodash";

import data from '../../mocks/list';
import CardComponent from '../../components/CardComponent';

class ProductListContainer extends Component {
  state = { visible: false,
            newData:  cloneDeep(data)
          }
  
  toggleVisibility = () => this.setState({ visible: !this.state.visible })
  handleOnClick = (monster, isRemove=false, isClean=false) => {this.props.mutate({ variables: { monster, isRemove:isRemove, isClean} }); this.setState({ visible: true });};
  updateQuantity = (key, quantity, isRemove) => {
    const list=  cloneDeep(this.state.newData);
    if(isRemove){
      list[key].quantity--;
    }
    else {
      quantity ? list.quantity++ : Object.assign(list[key], { quantity: 1 });
    }
    this.setState(
      {newData: list}
    );
  }
  reloadData = () => {
    this.setState({ newData:  cloneDeep(data), visible: false});
    this.props.mutate({ variables: { monster:{}, isRemove:true, isClean:true} });
  }
  handleItemsBlock = (blocks) => blocks.map(item =>
        <CardComponent key={item.id}
          { ...item}
          list
          updateQuantity={this.updateQuantity}
          onClickEvent = {this.handleOnClick}
          toggleVisibility= {this.toggleVisibility}
        />         
  );
  handleSelectedItemsBlock = (blocks) => blocks.map(item =>
 
    <CardComponent key={item.monster.id}
      { ...item.monster}
      bascket
      updateQuantity={this.updateQuantity}
      onClickEvent = {this.handleOnClick}
      toggleVisibility= {this.toggleVisibility}
    />    
       
  );

  render(){
    const myBascket = get(this.props, 'data.monsterList', []);
    const { visible } = this.state
    return (
      <div>   
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='scale down' width='thin' visible={visible} icon='labeled' vertical>
            <h2>{myBascket.length >0 ? `Total Price: ${this.props.data.totalPrice}` : "Add Products"}</h2>
            {myBascket.length>0 && (<Button circular  color='red' icon='refresh' onClick={()=>this.reloadData()} />)}
            {this.handleSelectedItemsBlock(myBascket)}
          </Sidebar>
          
          <Sidebar.Pusher>
          <Button id="toggel" as='div' labelPosition='right'  onClick={()=>this.toggleVisibility()}>
            <Button  icon= {visible ? "chevron left" : "chevron right"}/>
            <Label as='a' basic color='red' pointing='left'>{visible ? "Hide Basket" : "Show Bascket"}</Label>
          </Button>
          
            <Segment basic>
              <Header as='h3'>All Monsters</Header>
              <Grid columns={3}>
                <Grid.Row>
                  {this.handleItemsBlock(this.state.newData)}
                </Grid.Row>
              </Grid>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
    </div>
    );
  }
}


const addToList = gql`
  mutation addMonster($monster: Object!, $isRemove: Boolean!, $isClean: Boolean!) {
    addMonster(monsterToAdd: $monster, isRemove: $isRemove, isClean: $isClean) @client
  }
`;

const queryList = gql`
  query GetMonsters {
    monsterList @client {
      monster{
        id,
        title,
        price,
        image,
        content,
        quantity,
        stock
      }
    }
    totalPrice @client
  }
`;




export default compose(graphql(addToList), graphql(queryList))(ProductListContainer);