import React from 'react';
import { Card, Image, Button, Label, List, Grid } from 'semantic-ui-react';


const CardComponent = ({onClickEvent, updateQuantity, toggleVisibility, ...props})=> {
  const handleClickPlus = () =>{
    onClickEvent(props);
    updateQuantity(props.id-1, props.quantity, false);
  }
  const handleClickMinus = ()=>{
    onClickEvent(props, true);  
    updateQuantity(props.id-1, props.quantity, true);
  }
  return (
  <Grid.Column>
    <Card>
      <Card.Meta>
      {props.list && (<Label as='a' color={(props.stock<1 || props.stock===props.quantity) ? 'red' : 'green'} ribbon>{(props.stock<1 || props.stock===props.quantity) ? 'Out of stock' :'In stock'}</Label>)}
        </Card.Meta>
      <Image src={props.image} />
      <Card.Content>
        <Card.Header>
          <h2>{props.title}</h2>
        </Card.Header>
        
        <Card.Description>
          <h3>Price: {props.price}</h3>
          {props.list && (<p>{props.content}</p>)}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <List horizontal>
            <Button color='olive' onClick = {handleClickPlus} disabled={(props.stock<1 || props.stock===props.quantity) ? true : false}>+</Button>
            <Label circular color='teal'>{props.quantity || 0 }</Label>
            <Button color='olive' onClick = {handleClickMinus} disabled={props.quantity ? false : true}>-</Button>
        </List>
      </Card.Content>
      {props.bascket && (<Card.Content extra>
        <Label basic color='red' pointing>Total:{props.quantity * props.price}</Label>
      </Card.Content>
      )}
    </Card>
  </Grid.Column>
  )};

export default CardComponent;