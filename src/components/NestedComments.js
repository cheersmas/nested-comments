import { useState, useRef, useEffect } from 'react';
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

function useOnScreen(ref) {

  const [isIntersecting, setIntersecting] = useState(false)

  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting)
  )

  useEffect(() => {
    observer.observe(ref.current)
    return () => { observer.disconnect() }
  }, [])

  return isIntersecting
}

const Comment = ({
  author,
  text,
  replies,
}) => {
  const [expanded, setExpanded] = useState(true);
  const commentRef = useRef();
  const sectionRef = useRef();
  const isVisible = useOnScreen(sectionRef);
  const toggleExpand = () => {
    setExpanded(!expanded);
    if (!isVisible) {
      handleScrollIntoView();
    }
  }
  const handleScrollIntoView = () => {
    commentRef.current.scrollIntoView({
      behaviour: 'smooth'
    })
  }
  return (
    <StyledComment id={author.name} ref={commentRef}>
      {expanded && <ToggleExpand onClick={toggleExpand}/>}
      <section id={author.name} ref={sectionRef}>
        {!expanded && <img onClick={toggleExpand} src={icon} alt="expand-icon" id="expand-icon" />}
        <img id="author-dp" src={author.avatar} alt={`${author.name}'s profile pic'`} />
        <span>{author.name}</span>
      </section>
      {expanded && <div>{text}</div>}
      {
        replies && expanded && replies.map((item) => <Comment author={item.author} text={item.text} replies={item.replies}/>)
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