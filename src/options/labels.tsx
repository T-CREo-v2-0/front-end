const labels = [
  {
    id: 1,
    title: "Text parameters",
    inputs: [
      {
        id: 1,
        title: "Spam detection",
        placeholder: "Spam",
        type: "number",
        min: 0,
        max: 1,
        name: "weightSpam",
        errormessage: "Please enter a number between 0 and 1",
      },
      {
        id: 2,
        title: "Bad words proportion to text",
        placeholder: "Bad words",
        type: "number",
        min: 0,
        max: 1,
        name: "weightBadWords",
        errormessage: "Please enter a number between 0 and 1",
      },
      {
        id: 3,
        title: "Misspelling detection",
        placeholder: "Misspelling",
        type: "number",
        min: 0,
        max: 1,
        name: "weightMisspelling",
        errormessage: "Please enter a number between 0 and 1",
      },
      {
        id: 4,
        title: "Semantic analysis",
        placeholder: "Semantic",
        type: "number",
        min: 0,
        max: 1,
        name: "weightSemantic",
        errormessage: "Please enter a number between 0 and 1",
      },
    ],
  },
  {
    id: 2,
    title: "Tweet parameters",
    inputs: [
      {
        id: 1,
        title: "Text credibility",
        placeholder: "Text",
        type: "number",
        min: 0,
        max: 1,
        name: "weightText",
        errormessage: "Please enter a number between 0 and 1",
      },
      {
        id: 2,
        title: "User credibility",
        placeholder: "User",
        type: "number",
        min: 0,
        max: 1,
        name: "weightUser",
        errormessage: "Please enter a number between 0 and 1",
      },
      {
        id: 3,
        title: "Social credibility",
        placeholder: "Social",
        type: "number",
        min: 0,
        max: 1,
        name: "weightSocial",
        errormessage: "Please enter a number between 0 and 1",
      },
      {
        id: 4,
        title: "Topic credibility",
        placeholder: "Topic",
        type: "number",
        min: 0,
        max: 1,
        name: "weightTopic",
        errormessage: "Please enter a number between 0 and 1",
      },
    ],
  },
  {
    id: 3,
    title: "Followers parameter",
    inputs: [
      {
        id: 1,
        title: "Max followers",
        placeholder: "Max followers",
        type: "number",
        min: 0,
        max: null,
        name: "maxFollowers",
        pattern: "[0-9]*",
        errormessage: "Please enter a number",
      },
    ],
  },
];

export { labels };
