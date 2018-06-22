import React from 'react';
import {Text, Image} from 'react-native';
import {Card, Avatar} from 'react-native-material-ui';

class FounderCard extends React.Component {

  render() {
    const {image, story} = this.props;

    return(
      <Card>
        <Avatar
          image={<Image source={image}/>}
        />
        <Text>
          {story}
        </Text>
      </Card>
    )
  }
}

export default FounderCard;
