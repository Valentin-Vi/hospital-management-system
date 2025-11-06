import { FaCircleUser } from "react-icons/fa6";
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '@security';
import buttons, { type NavbarButtonsType } from './NavbarBottons';
import { Button } from "@components/ui/button";
import { useEffect, useRef, useState } from "react";
import { IoMdExit } from "react-icons/io";


export default function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleNavButtonRedirect = (path: string) => {
    nav(path);
  };

  const validateAuthorization = (authorizedRoles: string[]) => {
    if (user?.type === undefined) return false;
    return authorizedRoles.includes(user.type);
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  
  const getStyledButton = (button: NavbarButtonsType, index: number): React.ReactNode => {
    const isCurrentRoute = (route: string) => {
      return loc.pathname === route;
    };

    if (isCurrentRoute(button.route)) {
      return <Button className='hover:cursor-not-allowed' variant="black_no_hover_effect" shape="square" disabled={false} Icon={button.icon} displayText={button.title} key={index} onClick={() => handleNavButtonRedirect(button.route)} />;
    }
    return <Button variant="white" shape="round" Icon={button.icon} disabled={false} displayText={button.title} key={index} onClick={() => handleNavButtonRedirect(button.route)} />;
  };

  // close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-row w-full h-8 px-4 py-2 justify-between bg-black rounded-md">
      <div className="flex flex-row gap-1 items-center">
        {buttons.map((button, index) =>
          validateAuthorization(button.allowedRoles) ? (
            getStyledButton(button, index)
          ) : null
        )}
      </div>
      
      <div
        className={`
           shadow-md shadow-gray-700
          transition-all duration-150 origin-top
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
      > 
        
      </div>

      <div className="flex flex-row items-center" ref={dropdownRef}>
        <div className={`
          transition-all duration-200 origin-right
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}
        `}>
          { isOpen &&
            <Button Icon={IoMdExit} disabled={false} displayText="Logout" variant="ghost" shape="chip" onClick={() => null}/>
          }
        </div>
        <div className="w-4">
          <Button variant="white" shape="round" disabled={false} Icon={FaCircleUser} displayText="Profile" onClick={handleProfileClick} />
        </div>
      </div>
    </div>
  );
}
