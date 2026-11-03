export const mernCurriculum = [
  {
    id: "html",
    title: "HTML: build the page structure",
    summary: "Give content meaning with headings, links, lists, and forms.",
    videoSearch:
      "https://www.youtube.com/results?search_query=freeCodeCamp+HTML+full+course+beginner",
    documentation: [
      {
        label: "MDN: HTML basics",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content",
      },
    ],
    lessons: [
      {
        title: "Your first HTML document",
        time: "15 min",
        notes:
          "HTML is the structure and meaning of a web page. Elements use tags: an opening tag, content, and usually a closing tag. Nest elements to show which content belongs together.",
        example: `<h1>My first page</h1>
<p>I am learning to build for the web.</p>`,
        practice:
          "In the practice area, add a page heading and a paragraph introducing yourself.",
      },
      {
        title: "Headings, links, and lists",
        time: "20 min",
        notes:
          "Use headings in a meaningful order, links for navigation, and lists for related items. Link text should explain where the link goes; avoid vague text like “click here.”",
        example: `<h2>Topics I will learn</h2>
<ul>
  <li>HTML</li>
  <li>CSS</li>
</ul>
<a href="https://developer.mozilla.org/">Visit MDN</a>`,
        practice:
          "Create a heading, a three-item learning list, and a link with descriptive text.",
      },
      {
        title: "Semantic pages and forms",
        time: "25 min",
        notes:
          "Semantic elements describe their purpose. Use header, nav, main, and footer to organize a page. Connect each form label to its input with matching for and id values.",
        example: `<label for="learner-name">Your name</label>
<input id="learner-name" name="name" required>
<button type="submit">Join the class</button>`,
        practice:
          "Make a small signup form with a labeled name field and a submit button.",
      },
    ],
  },
  {
    id: "css",
    title: "CSS: style and lay out pages",
    summary:
      "Use selectors, the box model, Flexbox, Grid, and responsive rules.",
    videoSearch:
      "https://www.youtube.com/results?search_query=freeCodeCamp+CSS+full+course+beginner",
    documentation: [
      {
        label: "MDN: CSS first steps",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics",
      },
      {
        label: "MDN: responsive design",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design",
      },
    ],
    lessons: [
      {
        title: "Selectors and readable styles",
        time: "20 min",
        notes:
          "CSS rules select HTML elements and assign declarations. A class can be reused; an id should identify one unique element. Keep styles grouped by purpose so they remain easy to change.",
        example: `.welcome {
  color: #635bff;
  font-size: 2rem;
}`,
        practice:
          "Give a heading a class named welcome, then change its color and size in the CSS editor.",
      },
      {
        title: "The box model",
        time: "20 min",
        notes:
          "Every element is a box: content, padding, border, and margin. Setting box-sizing to border-box makes declared widths include padding and border, which is easier to reason about.",
        example: `* {
  box-sizing: border-box;
}

.card {
  padding: 1rem;
  border: 1px solid #e4e7ec;
  margin: 1rem 0;
}`,
        practice:
          "Style a card with padding, a border, and some space around it.",
      },
      {
        title: "Flexbox, Grid, and mobile layouts",
        time: "30 min",
        notes:
          "Flexbox arranges items along one main axis. Grid is useful for rows and columns. A media query can adapt a layout on smaller screens instead of forcing a fixed desktop width.",
        example: `.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}`,
        practice:
          "Create two cards that sit side by side when there is room and stack on a narrow screen.",
      },
    ],
  },
  {
    id: "javascript",
    title: "JavaScript: make pages interactive",
    summary:
      "Learn values, functions, arrays, events, and asynchronous requests.",
    videoSearch:
      "https://www.youtube.com/results?search_query=freeCodeCamp+JavaScript+full+course+beginner",
    documentation: [
      {
        label: "MDN: JavaScript first steps",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting",
      },
      {
        label: "MDN: JavaScript guide",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
      },
    ],
    lessons: [
      {
        title: "Values, variables, and decisions",
        time: "25 min",
        notes:
          "JavaScript stores values such as text, numbers, and true/false. Use const when a variable will not be reassigned and let when it will. if/else chooses what to do based on a condition.",
        example: `const learner = "Sam";
let lessonsDone = 1;

if (lessonsDone > 0) {
  console.log(learner + " has started learning.");
}`,
        practice:
          "Create a learner name and a lessons-done number. Print a friendly message when at least one lesson is done.",
      },
      {
        title: "Functions and arrays",
        time: "25 min",
        notes:
          "A function packages a task so you can reuse it. An array holds an ordered list. Array methods such as map and filter help transform or select items without manually repeating the same work.",
        example: `const topics = ["HTML", "CSS", "JavaScript"];

function describeTopic(topic) {
  return "I am learning " + topic;
}

console.log(topics.map(describeTopic));`,
        practice:
          "Add three topics to an array and write a function that creates a sentence for each topic.",
      },
      {
        title: "DOM events and asynchronous work",
        time: "30 min",
        notes:
          "The browser DOM represents the page as objects JavaScript can update. Event listeners respond to actions such as clicks. Promises and async/await help handle work that finishes later, such as a network request.",
        example: `document.querySelector("#hello").addEventListener("click", () => {
  document.querySelector("#message").textContent = "Nice work!";
});`,
        practice:
          "Add a button and a message to the preview. Clicking the button should update the message.",
      },
    ],
  },
  {
    id: "bootstrap",
    title: "Bootstrap: build responsive interfaces faster",
    summary:
      "Use the grid and utility classes, then customize components thoughtfully.",
    videoSearch:
      "https://www.youtube.com/results?search_query=freeCodeCamp+Bootstrap+5+tutorial+beginner",
    documentation: [
      {
        label: "Bootstrap: introduction",
        url: "https://getbootstrap.com/docs/5.3/getting-started/introduction/",
      },
      {
        label: "Bootstrap: grid system",
        url: "https://getbootstrap.com/docs/5.3/layout/grid/",
      },
    ],
    lessons: [
      {
        title: "Include Bootstrap in a page",
        time: "15 min",
        notes:
          "Bootstrap is a CSS component and utility framework. Its official quick start explains the stylesheet and optional JavaScript bundle. In a real app, choose a pinned version and follow the current official setup instructions.",
        example: `<div class="container">
  <h1 class="text-primary">Hello, Bootstrap</h1>
  <button class="btn btn-primary">Start</button>
</div>`,
        practice:
          "Use the preview to practice ordinary CSS first, then compare the official Bootstrap example and class names.",
      },
      {
        title: "Responsive containers and grid",
        time: "20 min",
        notes:
          "Bootstrap's grid uses containers, rows, and columns. Breakpoint classes let a column use different widths on small and large screens. Prefer layouts that wrap naturally instead of hard-coding page widths.",
        example: `<div class="container">
  <div class="row">
    <div class="col-md-6">First card</div>
    <div class="col-md-6">Second card</div>
  </div>
</div>`,
        practice:
          "Build two responsive learning cards. Check how the layout changes when you resize the preview.",
      },
      {
        title: "Utilities and accessible components",
        time: "20 min",
        notes:
          "Utility classes handle common spacing, display, and color needs. Use them consistently, but do not sacrifice readable markup. For interactive components, check keyboard access, labels, and the official component documentation.",
        example: `<div class="p-3 border rounded">
  <h2 class="h4">Lesson one</h2>
  <p class="mb-0">A small step forward.</p>
</div>`,
        practice:
          "Make a simple lesson card and give its button a clear label and visible focus style.",
      },
    ],
  },
  {
    id: "node",
    title: "Node.js: run JavaScript on the server",
    summary:
      "Explore the runtime, npm packages, modules, and a small HTTP server.",
    videoSearch:
      "https://www.youtube.com/results?search_query=freeCodeCamp+Node.js+full+course+beginner",
    documentation: [
      {
        label: "Node.js: introduction",
        url: "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs",
      },
      {
        label: "Node.js: getting started",
        url: "https://nodejs.org/en/learn/getting-started",
      },
    ],
    lessons: [
      {
        title: "What Node.js does",
        time: "20 min",
        notes:
          "Node.js runs JavaScript outside the browser. It gives a program access to server-side capabilities such as the file system and networking. A runtime is not a new language: you still write JavaScript.",
        example: `console.log("This JavaScript runs with Node.js.");
console.log(process.version);`,
        practice:
          "In the browser playground, try a small JavaScript function. Then save it as app.js and run it locally with node app.js.",
      },
      {
        title: "Modules and npm",
        time: "25 min",
        notes:
          "Modules split code into reusable files. npm manages project packages and scripts. In this project, package.json uses ES modules, so files share code with import and export.",
        example: `export function greet(name) {
  return "Hello, " + name;
}`,
        practice:
          "Write a small utility function, then describe which values it accepts and returns.",
      },
      {
        title: "A first HTTP server",
        time: "30 min",
        notes:
          "A server listens on a port, receives requests, and sends responses. Node's built-in HTTP module can do this directly; frameworks such as Express add convenient routing and middleware.",
        example: `import { createServer } from "node:http";

const server = createServer((request, response) => {
  response.end("Hello from Node");
});

server.listen(3000);`,
        practice:
          "Read the Node.js documentation example and identify the request, response, and listening port.",
      },
    ],
  },
  {
    id: "express",
    title: "Express.js: create a web API",
    summary:
      "Add routes, JSON handling, middleware, and clear error responses.",
    videoSearch:
      "https://www.youtube.com/results?search_query=freeCodeCamp+Express.js+REST+API+tutorial",
    documentation: [
      {
        label: "Express: Hello world",
        url: "https://expressjs.com/en/starter/hello-world.html",
      },
      {
        label: "Express: routing",
        url: "https://expressjs.com/en/guide/routing.html",
      },
      {
        label: "Express: middleware",
        url: "https://expressjs.com/en/guide/using-middleware.html",
      },
    ],
    lessons: [
      {
        title: "Routes and request methods",
        time: "25 min",
        notes:
          "A route combines an HTTP method and a path. GET reads data, POST creates or submits data, PUT updates, and DELETE removes. A handler decides what response the API sends.",
        example: `app.get("/api/hello", (request, response) => {
  response.json({ message: "Hello, learner!" });
});`,
        practice:
          "Sketch a GET route for a list of topics and the JSON shape it should return.",
      },
      {
        title: "JSON and middleware",
        time: "25 min",
        notes:
          "Middleware runs during the request/response path. JSON parsing middleware makes a JSON request body available to route handlers. Validate incoming values before using them.",
        example: `app.use(express.json());

app.post("/api/topics", (request, response) => {
  response.status(201).json({ topic: request.body.name });
});`,
        practice:
          "Plan a POST request body for adding a lesson. List which fields should be checked before saving.",
      },
      {
        title: "Errors and API design",
        time: "25 min",
        notes:
          "Use status codes to explain the outcome: 200 for success, 201 for creation, 400 for invalid input, 401 for missing authentication, 403 for denied access, and 404 for a missing resource. Keep error responses useful without exposing secrets.",
        example: `if (!request.body.name) {
  return response.status(400).json({
    message: "A topic name is required."
  });
}`,
        practice:
          "Design error responses for a missing lesson and an invalid quiz answer.",
      },
    ],
  },
  {
    id: "react",
    title: "React: build interactive user interfaces",
    summary: "Compose components and use props, state, events, and effects.",
    videoSearch:
      "https://www.youtube.com/results?search_query=freeCodeCamp+React+full+course+beginner",
    documentation: [
      {
        label: "React: Learn",
        url: "https://react.dev/learn",
      },
      {
        label: "React: your first component",
        url: "https://react.dev/learn/your-first-component",
      },
    ],
    lessons: [
      {
        title: "Components and JSX",
        time: "25 min",
        notes:
          "A React component is a JavaScript function that returns UI. JSX looks like HTML but is JavaScript syntax. Small components make an interface easier to reuse and understand.",
        example: `function Welcome() {
  return <h1>Welcome to LearnHub</h1>;
}`,
        practice:
          "Describe a reusable LessonCard component and the title and duration values it needs.",
      },
      {
        title: "Props, state, and events",
        time: "30 min",
        notes:
          "Props pass information into a component. State is information that can change over time; updating state asks React to render the UI again. Event handlers respond to user actions.",
        example: `function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Lessons: {count}
    </button>
  );
}`,
        practice:
          "Build a button in the HTML/JavaScript practice area that increments a visible counter.",
      },
      {
        title: "Effects and fetching data",
        time: "30 min",
        notes:
          "Use an effect to synchronize a component with an external system, such as a network request. Include the values the effect uses in its dependency list, handle failures, and clean up work when the component unmounts.",
        example: `useEffect(() => {
  let active = true;

  loadLessons().then((items) => {
    if (active) setLessons(items);
  });

  return () => {
    active = false;
  };
}, []);`,
        practice:
          "Write down the loading, success, and error states a course list should display while data loads.",
      },
    ],
  },
  {
    id: "mongodb",
    title: "MongoDB: store application data",
    summary:
      "Understand documents, collections, CRUD, and how Node connects to data.",
    videoSearch:
      "https://www.youtube.com/results?search_query=freeCodeCamp+MongoDB+full+course+beginner",
    documentation: [
      {
        label: "MongoDB: getting started tutorial",
        url: "https://www.mongodb.com/docs/manual/tutorial/getting-started/",
      },
      {
        label: "MongoDB: documents",
        url: "https://www.mongodb.com/docs/manual/core/document/",
      },
      {
        label: "Mongoose: getting started",
        url: "https://mongoosejs.com/docs/",
      },
    ],
    lessons: [
      {
        title: "Documents and collections",
        time: "20 min",
        notes:
          "MongoDB stores records as BSON documents grouped into collections. Documents feel similar to JavaScript objects and can contain nested values. Choose fields that match how the application reads and updates its data.",
        example: `{
  "title": "HTML basics",
  "level": "Beginner",
  "published": true
}`,
        practice:
          "Design a course document with a title, category, and an array of lesson titles.",
      },
      {
        title: "Create, read, update, and delete",
        time: "25 min",
        notes:
          "CRUD means create, read, update, and delete. Use the smallest query that expresses the task, validate user input, and only return fields the caller is allowed to see.",
        example: `db.courses.find(
  { published: true },
  { title: 1, category: 1 }
)`,
        practice:
          "Write in plain language a query for published beginner courses in the Technology category.",
      },
      {
        title: "Connect MongoDB to a MERN app",
        time: "30 min",
        notes:
          "A MERN app uses MongoDB, Express, React, and Node.js. The server connects to MongoDB with a private connection URI stored in server environment settings; never put the URI in browser code. Mongoose adds schemas and model methods for Node.",
        example: `const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true }
});`,
        practice:
          "Trace the data flow: React form → Express route → Mongoose model → MongoDB document → JSON response.",
      },
    ],
  },
];
