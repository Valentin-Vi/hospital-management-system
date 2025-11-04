import { FaCircleUser } from "react-icons/fa6";
import { useNavigate } from 'react-router';
import { useAuth } from '@security';
import { useLocation } from 'react-router';
import buttons from './NavbarBottons';
import { Button } from "@components/ui/button";

export default function NavBar() {
  const { user } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  const handleNavButtonRedirect = (path: string) => {
    nav(path);
  }

  const validateAuthorization = (authorizedRoles: string[]) => {
    if(user?.type === undefined) return false;
    return authorizedRoles.includes(user.type);
  }

  const handleProfileRedirect = () => {
    nav('/profile');
  }

  const isCurrentRoute = (route: string) => {
    return loc.pathname === route;
  }

  const styleNavButton = (route: string) => {
    if(isCurrentRoute(route)) {
      return 'black';
    }
    return 'white';  
  }

  return (
    <div className="flex flex-row w-full h-8 justify-between items-center bg-black rounded-md pl-2 pr-2 pt-1 pb-1">
      <div className="flex flex-row gap-1">
        {
          buttons.map((button, index) => (
            validateAuthorization(button.allowedRoles) ? (
              <Button variant={styleNavButton(button.route)} shape='round' Icon={button.icon} displayText={button.title} key={index} onClick={() => handleNavButtonRedirect(button.route)} />
            ) : (null)
          ))
        }
      </div>
      <div>
        <Button variant="white" shape='round' Icon={FaCircleUser} displayText="Profile" onClick={() => nav('/profile')} />
      </div>
    </div>
  )

  return (
    <div className="w-full h-8 flex flex-row justify-between items-center overflow-hidden shadow-sm shadow-gray-400 bg-black rounded-md pl-2 pr-2 pt-1 pb-1">
      <div className='flex flex-row gap-1'>
        { buttons.map((btn, idx) => (
          user?.type ? btn.allowedRoles.includes(user.type) ?
            <Button className={`${loc.pathname === btn.route ? 'border-2 border-white bg-white text-black' : ''}`} key={idx} Icon={btn.icon} variant='white' displayText={btn.title} shape='round' onClick={() => nav(btn.route)} />
          : null : null
        ))}
      </div>
      <div>
        <Button className={`${loc.pathname === '/profile' ? 'border-2 border-white' : ''}`} Icon={FaCircleUser} variant="white" displayText="Profile" shape='round' onClick={handleProfileRedirect} />
      </div>
    </div>
  );
};
