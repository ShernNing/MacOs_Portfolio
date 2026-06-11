import Terminal from "./Terminal";
import Safari from "./Safari";
import Finder from "./Finder";
import Text from "./Text";
import Image from "./Image";
import Video from "./Video";
import Contact from "./Contact";
import Photos from "./Photos";

// Resume is intentionally not exported here: App lazy-loads it so the
// heavy react-pdf dependency stays out of the main bundle.
export { Terminal, Safari, Finder, Text, Image, Video, Contact, Photos };
