import { FaCircleUser } from "react-icons/fa6";
import { useNavigate } from 'react-router';
import useAuth from '../security/AuthProvider';
import { useLocation } from 'react-router';
import buttons from './NavbarBottons';

export default function NavBar() {
    const { user } = useAuth();
    const nav = useNavigate();
    const loc = useLocation();

    function handleProfileRedirect() {
        user.type !== 'VISITOR' ? nav('/profile') : nav('/login');
    }

    return (
        <div
            className="w-[100%] h-[28px] pl-2 pr-2 flex flex-row justify-between items-center overflow-hidden shadow-sm shadow-gray-400 bg-blue-600 rounded-md"
        >
            <div
                className='flex flex-row'
            >
                {
                    buttons.map((btn, idx) => (
                        btn.allowedRoles.includes(user.type) ?
                        
                            <button
                                type="button"
                                key={idx}
                                onClick={() => nav(btn.route)}
                                className={`text-xs flex-row flex rounded-[50%] ml-1 m3-1 h-5 w-5 items-center justify-center ${loc.pathname === btn.route ? 'text-blue-950 bg-white' : 'text-white hover:bg-white hover:text-blue-950'}`}
                                // className={`text-xs flex-row flex rounded-[50%] hover:bg-white ml-1 m3-1 h-5 w-5 hover:shadow-sm hover:text-black items-center justify-center ${loc.pathname === btn.route ? 'text-white' : 'text-slate-400'}`}
                            >                            
                                {btn.icon}
                            </button>
                        : null
                    ))
                }
            </div>
            <div>
                <button
                    type="button"
                    key="profile"
                    onClick={handleProfileRedirect}
                    className={`text-xs rounded-[50%] ml-1 mr-1 flex-row flex items-center justify-center ${loc.pathname === '/profile' ? 'text-blue-950 bg-white' : 'text-white hover:bg-white hover:text-blue-950'}`}
                >
                    <div
                        className="m-1"
                    >
                        <FaCircleUser />
                    </div>
                </button>
            </div>
        </div>
    );
};
