import './button.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fab, fas)


export default function Button() {
    return (<button className='button' >
                <FontAwesomeIcon icon={["fas", "cart-shopping"]} />
            </button>)
}
