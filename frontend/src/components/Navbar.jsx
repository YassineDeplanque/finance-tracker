import { Link, NavLink} from 'react-router-dom';

function Navbar() {
    return(
        <div>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/transactions'>Transactions</NavLink>
        </div>
    )
}

export default Navbar;