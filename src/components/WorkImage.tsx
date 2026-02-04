import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        // OPTIMIZATION: Removed async fetch. State toggle is instant.
        onMouseEnter={() => props.video && setIsVideo(true)}
        onMouseLeave={() => setIsVideo(false)}
        target="_blank"
        data-cursor={"disable"}
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        <img src={props.image} alt={props.alt} />
        
        {/* OPTIMIZATION: Use native video element for browser-level caching and streaming */}
        {isVideo && props.video && (
          <video 
            // Ensure your videos are in the 'public' folder for this path to work in production
            src={`/assets/${props.video}`} 
            autoPlay 
            muted 
            playsInline 
            loop 
            className="work-video"
            // 'metadata' loads just enough to start playing immediately
            preload="metadata" 
          />
        )}
      </a>
    </div>
  );
};

export default WorkImage;