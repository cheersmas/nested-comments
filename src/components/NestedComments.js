import { useState, useRef } from 'react';
import useOnScreen from '../hooks/useOnScreen';
import styled from 'styled-components';
import { comments } from '../comments';
import icon from '../icons/expand_icon.png';

const StyledComment = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-bottom: 24px;
  position: relative;
  & #expand-icon {
    height: 12px;
    width: 12px;
    padding-right: 12px;
  }
  & #author-dp {
    height: 24px;
  }
`;

const ToggleExpand = styled.div`
  position: absolute;
  height: 100%;
  width: 2px;
  background-color: lightgray;
  top: 10px;
  left: -10px;
  &:hover {
    background-color: blue;
    cursor: pointer;
  }
`;

const Comment = ({
  author,
  text,
  replies,
}) => {
  const [expanded, setExpanded] = useState(true);
  const sectionRef = useRef();
  const isVisible = useOnScreen(sectionRef);
  const toggleExpand = () => {
    setExpanded(!expanded);
    if (!isVisible) {
      handleScrollIntoView();
    }
  }
  const handleScrollIntoView = () => {
    sectionRef.current.scrollIntoView({
      behaviour: 'smooth'
    })
  }
  return (
    <StyledComment id={author.name}>
      {
        expanded 
        && <ToggleExpand onClick={toggleExpand}/>
      }
      <section id={author.name} ref={sectionRef}>
        {
          !expanded 
          && <img onClick={toggleExpand} src={icon} alt="expand-icon" id="expand-icon" />
        }
        <img id="author-dp" src={author.avatar} alt={`${author.name}'s profile pic'`} />
        <span>{author.name}</span>
      </section>
      {
        expanded 
        && <div id="author-text">{text}</div>
      }
      {
        replies 
        && expanded 
        && replies.map((item, index) =>
         <Comment key={index} author={item.author} text={item.text} replies={item.replies}/>
        )
      }
    </StyledComment>
  )
}

const NestedComments = () => {
  return (
    <div>
      <Comment author={comments.author} text={comments.text} replies={comments.replies} />
    </div>
  )
}

export default NestedComments;