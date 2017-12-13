import React from 'react';
import { getHighestRatingTagName, getRelatedTag } from 'common/helpers';
import {
  Message,
  Card,
  Icon,
  Label,
  Comment,
  Divider,
  Button,
} from 'semantic-ui-react';
import JobDescriptionCard from 'components/JobDescriptionCard/JobDescriptionCard';
import IconWithDescription from 'components/IconWithDescription/IconWithDescription';
import styles from './UserComment.css';

const ContactMe = ({ company, email, fullname, phone, position }) => {
  return (
    <Card fluid>
      <Card.Content className={styles.contactMeCardContentContainer}>
        <Card.Header style={{ textTransform: 'capitalize' }}>
          {fullname}
        </Card.Header>
        <Card.Meta>{`${position}, ${company}`}</Card.Meta>
        <Card.Description>
          Hi, please find my contact as below:
        </Card.Description>
        <IconWithDescription description={email} icon="mail" />
        <IconWithDescription description={phone} icon="phone" />
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button as="a" href={`tel:${phone}`} color="blue">
            Call me
          </Button>
          <Button.Or />
          <Button as="a" href={`mailto:${email}`} basic color="blue">
            Email me
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

const DropMessage = ({ msg }) => {
  return <Message>{msg}</Message>;
};

export default ({ comments, topicTags, parentContext }) => {
  return (
    <Comment.Group size="small">
      {comments.map(
        (
          {
            postType,
            username,
            date,
            message,
            totalHired,
            headline,
            phone,
            email,
            tags,
            job,
            contact,
          },
          i
        ) => {
          const { tag, rating } = getHighestRatingTagName(
            getRelatedTag(...tags, topicTags),
            topicTags
          );

          const userLike = parentContext.state.likes[username];
          const iconName =
            userLike && userLike.liked ? 'thumbs up' : 'thumbs outline up';
          const newRating = userLike && userLike.liked ? rating + 1 : rating;
          return (
            <Comment key={'comment-i' + i}>
              <Comment.Avatar as="a" src={`/${username}.jpg`} />
              <Comment.Content>
                <Comment.Author as="a">{username}</Comment.Author>
                <Comment.Metadata>
                  <span>{date}</span>
                </Comment.Metadata>
              </Comment.Content>
              {tag && (
                <Label>
                  {tag}
                  <Label.Detail>{newRating}</Label.Detail>
                </Label>
              )}
              <Label>
                <Icon name="user" />
                {totalHired} Hired
              </Label>
              <Icon
                name={iconName}
                onClick={() => {
                  let obj = {};
                  if (userLike && userLike.liked) {
                    obj[username] = { liked: false };
                    parentContext.state.likes = Object.assign(
                      parentContext.state.likes,
                      obj
                    );
                  } else {
                    obj[username] = { liked: true };
                    parentContext.state.likes = Object.assign(
                      parentContext.state.likes,
                      obj
                    );
                  }
                  console.log(parentContext.state.likes);
                  parentContext.setState({ ...parentContext.state });
                }}
              />
              {postType === 'contact-me' && <ContactMe {...contact} />}
              {postType === 'drop-message' && <DropMessage msg={message} />}
              {postType === 'post-jd' && <JobDescriptionCard {...job} />}
              <Divider hidden />
            </Comment>
          );
        }
      )}
    </Comment.Group>
  );
};
