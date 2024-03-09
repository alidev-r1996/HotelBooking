const Loading = () => {
    return ( 
        <div
          className={` grid gap-4  grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] shadow p-4  bg-white m-4  transition-all duration-500`}
        >
          Loading...
        </div>
     );
}
 
export default Loading;