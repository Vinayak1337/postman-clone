import RequestNav from './RequestNav';
import { CreateNewRequest } from './RequestNavComponents';

function Navbar() {
  return (
    <nav className="w-full overflow-hidden absolute z-10 top-7">
      <div className="flex w-full overflow-x-scroll hide-scrollbar">
        <RequestNav />
        <CreateNewRequest />
      </div>
    </nav>
  );
}

export default Navbar;
