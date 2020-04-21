import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
  faBold,
  faUnderline,
  faItalic,
  faHeading,
  faQuoteLeft,
  faCode,
  faListUl,
  faListOl,
  faImage
  
} from "@fortawesome/free-solid-svg-icons";

const inlineTypes = [
  {
    label: "bold",
    style: "BOLD",
    icon: <FontAwesomeIcon icon={faBold} />,
  },
  {
    label: "italic",
    style: "ITALIC",
    icon: <FontAwesomeIcon icon={faItalic} />,
  },
  {
    label: "Underline",
    style: "UNDERLINE",
    icon: <FontAwesomeIcon icon={faUnderline} />,
  },
];

const blockTypes = [
  {
    label: "H1",
    style: "header-one",
    icon: <FontAwesomeIcon icon={faHeading} />,
  },
  {
    label: "Blockquote",
    style: "blockquote",
    icon: <FontAwesomeIcon icon={faQuoteLeft} />,
  },
  {
    label: "Code block",
    style: "code-block",
    icon: <FontAwesomeIcon icon={faCode} />,
  },
  {
    label: "UL",
    style: "unordered-list-item",
    icon: <FontAwesomeIcon icon={faListUl} />,
  },
  {
    label: "OL",
    style: "ordered-list-item",
    icon: <FontAwesomeIcon icon={faListOl} />,
  },
  {
    label: "Image",
    style: "atomic",
    icon: <FontAwesomeIcon icon={faImage} />,
  }
];



export { inlineTypes, blockTypes };
