export default function Story({ img, username }) {
  return (
    <div>
      <img
        src={img}
        alt={username}
        className="h-14 w-14 rounded-full p-[1.5px] border-red-400 border-[2.5px] object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
      />
      <p className="text-xs w-16 pt-[4.5px] truncate text-center cursor-pointer">
        {username}
      </p>
    </div>
  );
}
