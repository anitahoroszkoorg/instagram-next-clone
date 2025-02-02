import {
  InstaStoriesContainer,
  Instastory,
  AddHighlight,
  InstastoryImg,
  Label,
} from "./styled";

interface Story {
  src: string;
  label: string;
}

interface StoriesProps {
  stories?: Story[];
  isProfileOwner: boolean;
}

export const Stories = ({ stories = [], isProfileOwner }: StoriesProps) => {
  return (
    <InstaStoriesContainer>
      {isProfileOwner && (
        <Instastory>
          <AddHighlight>+</AddHighlight>
          <Label>Add</Label>
        </Instastory>
      )}
      {stories.length > 0 &&
        stories.map((story, index) => (
          <Instastory key={index}>
            <InstastoryImg src={story.src} alt="Instastory" />
            <Label>{story.label}</Label>
          </Instastory>
        ))}
    </InstaStoriesContainer>
  );
};
