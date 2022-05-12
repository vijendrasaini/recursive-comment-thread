// import { Comments } from "./Components/Comments";

import { Comments } from "./Components/Comments";


const App = () => {
  return (
    <div>
      <h1>Hello Vijendra</h1>
      <Comments
        commentsUrl="http://localhost:7000/comments"
        currentUserId="1"
      />
    </div>
  );
};

export default App;
