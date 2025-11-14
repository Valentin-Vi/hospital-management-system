import { useEffect, useRef, useState } from "react";
import { FaArrowCircleDown } from "react-icons/fa";
import { Button } from "./button";

export type DropdownMenuProps = {
  currentValue: string;
  setCurrentValue: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
}

export const DropdownMenu = ({
  currentValue, setCurrentValue, options
}: DropdownMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  
  const handleSelect = (option: string) => {
    setCurrentValue(option)
    setOpen(false)
  }

  return (
    <div className="relative">
      <div className="w-36">
        <Button className='w-full' Icon={FaArrowCircleDown} variant={ open ? 'white' : 'skeleton'} onClick={() => setOpen(p => !p)} shape='chip' displayText={currentValue} disabled={false}/>
      </div>
      <div
        className={`
          absolute right-0 w-full rounded-md bg-white text-gray-800 shadow-lg
          transition-all duration-150 origin-top
          ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
      >
        { options.map((option, idx) => (
          <Button className='w-full' variant="black" onClick={() => handleSelect(option)} shape='chip' displayText={option} disabled={false} key={idx}/>
        ))}
      </div>
    </div>
  )
}

// export const DropdownMenu = () => {
//   const [open, setOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);

//   // close on outside click
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   return (
//     <div className="relative" ref={menuRef}>
//       <button
//         onClick={() => setOpen((p) => !p)}
//         className="hover:text-gray-300 flex items-center gap-1"
//       >
//         Profile ▾
//       </button>

//       {/* container */}
//       <div
//         className={`
//           absolute right-0 mt-2 w-48 rounded-md bg-white text-gray-800 shadow-lg
//           transition-all duration-150 origin-top
//           ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
//         `}
//       >
//         <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
//           My Account
//         </button>
//         <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
//           Settings
//         </button>
//         <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }
