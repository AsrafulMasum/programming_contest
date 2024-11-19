const Loading = () => {
  return (
    <div className="min-h-[70vh] flex justify-center items-center">
      <div className="flex items-center gap-2">
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    </div>
  );
};

export default Loading;
