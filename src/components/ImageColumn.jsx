import React, { useState } from "react";

const DragDrop = () => {
  const [tasks, setTasks] = useState([
    { name: "Task 1", category: "wip", type: "text", content: "Task 1 content" },
    { name: "Task 2", category: "wip", type: "image", content: "https://picsum.photos/200" },
    { name: "Task 3", category: "wip", type: "text", content: "Task 3 content" },
    { name: "Task 4", category: "wip", type: "image", content: "https://picsum.photos/200" },
  ]);
  

  const onDragStart = (event, taskName) => {
    event.dataTransfer.setData("taskName", taskName);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const resetTasks = () => {
    let updatedTasks = tasks.map((task) => {
      task.category = "wip";
      return task;
    });
    setTasks(updatedTasks);
  };

  const onDrop = (event, category) => {
    let taskName = event.dataTransfer.getData("taskName");

    let updatedTasks = tasks.map((task) => {
      if (task.name === taskName) {
        task.category = category;
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  let tasksByCategory = {
    wip: [],
    complete: [],
  };

  tasks.forEach((task) => {
    tasksByCategory[task.category].push(
      <div
        key={task.name}
        onDragStart={(event) => onDragStart(event, task.name)}
        draggable
        className="draggable"
      >
        {task.type === "text" ? (
          task.content
        ) : (
          <img src={task.content} alt={task.name} />
        )}
      </div>
    );
  });

  return (
    <div className="drag-container grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-1">
      <div className="wip">
        <h2>Work In Progress</h2>
        {tasksByCategory.wip}
      </div>

      <div
        className="droppable"
        onDragOver={(event) => onDragOver(event)}
        onDrop={(event) => onDrop(event, "complete")}
      >
        <h2>Completed</h2>
        {tasksByCategory.complete}
        <button onClick={resetTasks}>Reset</button>
      </div>
    </div>
  );
};

export default DragDrop;

// import React from "react";

// function ImageColumn() {

//   const data = [
//     { type: 'text', value: 'First item' },
//     { type: 'text', value: 'Second item' },
//     { type: 'image', value: 'https://picsum.photos/200' },
//     { type: 'text', value: 'Fourth item' }
//   ];

//   const List = () => {
//     return (
//       <ul>
//         {data.map((item, index) => (
//           <li key={index}>
//             {item.type === 'text' && <p>{item.value}</p>}
//             {item.type === 'image' && <img src={item.value} alt="" />}
//           </li>
//         ))}
//       </ul>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-1">
//       <div className="left-div ">
//         <h1 className="text-yellow-200">
//           <List />
//         </h1>
//       </div>
//       <div className="right-div">
//         <h1>Image Column right</h1>
//       </div>
//     </div>
//   );
// }

// export default ImageColumn;
