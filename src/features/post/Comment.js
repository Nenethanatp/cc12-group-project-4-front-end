function Comment() {
  return (
    <div className="flex flex-col gap-2">
      <hr />
      <div className="flex gap-3 ">
        <div className="">
          <img
            src="https://www.cheatsheet.com/wp-content/uploads/2022/01/Demon-Slayer-Rengoku-1.jpg"
            alt=""
            className="rounded-full w-[40px] h-[40px]  object-cover"
          ></img>
        </div>
        <div className="flex flex-col">
          <div className="text-md">Fname Lname</div>
          <div className="text-xs">18:00 18/10/2565</div>
        </div>
      </div>
      <div>ท่วมหนักแบบ300%</div>
    </div>
  );
}

export default Comment;
